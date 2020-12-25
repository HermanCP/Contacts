import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    SafeAreaView,
    FlatList,
    Dimensions,
    Animated
} from 'react-native'
import { connect } from 'react-redux';
import {GetListContacts} from '../redux/actions/contactAction'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
import Service from '../service'
import Loader from '../loading/LoaderInScreen'
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get("window");

Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId, componentId }, { ...props }) => {
        console.log(buttonId)
        if (buttonId === 'Main.Contact.Component') {
            Navigation.dismissModal(componentId)
        }
    });

const ActionContact = ({ componentId, ...props }) => {
    const { mode } = props
    const [isbuttonenable, setIsbuttonenable] = useState(true)
    const [firstName, setFirsname] = useState(null)
    const [lastName, setLasname] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [email, setEmail] = useState(null)
    const [validateEmail, setvalidateEmail] = useState(false)
    const [validateEmailError, setValidateEmailError] = useState(false)
    const [validatePhone, setvalidatePhone] = useState(false)
    const [isfocused, setisFocused] = useState(false)
    const [foto, setFoto] = useState(null)
    const [fileSend, setFileSend] = useState(null)
    const [loadingImage, setLoadingImage] = useState(false)
    const [loadingHttp, setLoadingHttp] = useState(false)

    const onChangeFirstName = (val) => {
        if (val === '') {
            setIsbuttonenable(true)
        }
        setFirsname(val)
        if (firstName !== null && lastName !== null && fileSend !== null && validateEmail === true && validatePhone === true) return setIsbuttonenable(false)
    }
    const onChangeLastName = (val) => {
        console.log(val)
        if (val === '') {
            console.log('masuk gak')
            setIsbuttonenable(true)
        }
        setLasname(val)
        if (firstName !== null && lastName !== null && fileSend !== null && validateEmail === true && validatePhone === true) return setIsbuttonenable(false)
    }
    const onChangeMobile = (val) => {
        if (val === '') {
            setIsbuttonenable(true)
        }
        if (val.length < 7) {
            setMobile('')
            setvalidatePhone(false)
            setIsbuttonenable(true)
        } else {
            setMobile(val)
            setvalidatePhone(true)
        }
        if (firstName !== null && lastName !== null && fileSend !== null && validateEmail === true && validatePhone === true) return setIsbuttonenable(false)
    }
    const onChangeEmail = (val) => {
        if (val === '') {
            setIsbuttonenable(true)
        }
        setEmail(val)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            setvalidateEmail(false)
            setIsbuttonenable(true)
        } else {
            setvalidateEmail(true)
            setValidateEmailError(false)
        }
        if (firstName !== null && lastName !== null && fileSend !== null && validateEmail === true && validatePhone === true) return setIsbuttonenable(false)
    }
    const handleBlur = (event, { ...props }) => {
        // console.log('cek email', )
        if (email !== null) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === false) {
                setvalidateEmail(false)
                setIsbuttonenable(true)
                setValidateEmailError(true)
            } else {
                setvalidateEmail(true)
                setValidateEmailError(false)
                if (firstName !== null && lastName !== null && validateEmail === false && validatePhone === true) return setIsbuttonenable(false)
            }
        }

        setisFocused(false)

        if (props.onBlur) {
            props.onBlur(event);

        }
    }
    const choosePicture = () => {
        setLoadingImage(true)
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            setLoadingImage(false)

            const realPath = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri;
            setFoto(realPath)
            setFileSend(response)

            console.log('file send', fileSend)


        });
    }
    const AddContact = () => {
        setLoadingHttp(true)
        let data = {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            files: fileSend,
            email: email
        }
        console.log(data)
        Service.AddContact(data)
            .then(response => {
                console.log('response', response);
                const res = JSON.parse(response.data)
                setLoadingHttp(false)
                if (res.status === true) {
                    props.dispatch(GetListContacts())
                    Toast.showWithGravity('Berhasil tambah data', Toast.LONG, Toast.TOP)
                    Navigation.dismissModal(componentId)
                } else if (res.status == false) {
                    Toast.showWithGravity('Terjadi kesalahan pada server, mohon tunggu beberapa saat', Toast.LONG, Toast.TOP)
                } else {
                }

            })
            .catch(e => {
                Toast.showWithGravity('Server sedang padat, mohon tunggu beberapa saat lagi', Toast.LONG, Toast.TOP)
                setLoadingHttp(false)
                console.log(e);
            });
    }
    console.log(foto)
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{ alignItems: 'center', padding: 30 }}>
                    <TouchableOpacity activeOpacity={.7} onPress={() => choosePicture()} style={styles.header}>

                        {
                            foto !== null ?
                                <Image source={{ uri: foto }} style={{ height: 100, width: 100, borderRadius: 100 }} />
                                :
                                <>
                                    {
                                        loadingImage ?
                                            <Loader loading={loadingImage} />
                                            :
                                            <>
                                                <Image source={require('../images/profile.png')} style={{ height: 50, width: 50 }} />
                                                <View style={{ position: 'absolute', right: 10, top: '73%', backgroundColor: colors.greyBorder, padding: 5, borderRadius: 100 }}>
                                                    <Image source={require('../images/add-photo.png')} style={{ height: 20, width: 20 }} />
                                                </View>
                                            </>
                                    }
                                </>
                        }

                    </TouchableOpacity>

                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>First Name</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: Edo'
                        autoCapitalize="none"
                        clearButtonMode="always"
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        onChangeText={val => onChangeFirstName(val)}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>Last Name</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: dudung'
                        autoCapitalize="none"
                        clearButtonMode="always"
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        onChangeText={val => onChangeLastName(val)}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>Mobile</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex : 0813288xxxxx'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'phone-pad'}
                        clearButtonMode="always"
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        onChangeText={val => onChangeMobile(val)}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>Email</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: Email@gmail.com'
                        autoCapitalize="none"
                        clearButtonMode="always"
                        autoCorrect={false}
                        // /onBlur={handleBlur}
                        underlineColorAndroid={colors.greyBorder}
                        onChangeText={val => onChangeEmail(val)}
                    />
                    {
                        validateEmailError ?
                            <Text style={{ color: 'red', fontSize: 10, fontWeight: '600', marginHorizontal: 5 }}>Format email yang benar: nama@email.com</Text>
                            : null
                    }
                </View>
            </View>
            <View style={{ flex: .15, margin: 10 }}>
                <TouchableOpacity activeOpacity={0.5}

                    disabled={isbuttonenable ? true : false}
                    style={[styles.Button, { backgroundColor: isbuttonenable ? colors.grey : colors.green, borderRadius: 15, marginVertical: 10 }]}
                    onPress={() => AddContact()}
                >
                    {
                        loadingHttp ?
                            <Loader loading={loadingHttp} />
                            :
                            <Text style={[styles.buttonText, { color: 'white' }]}>Simpan</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    isLoading: state.contact.isLoading,
    contact: state.contact.ListContacts,
    error: state.contact.error,
})


export default connect(mapStateToProps, null)(ActionContact)