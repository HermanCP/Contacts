import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    Image,
    Dimensions,
} from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GetListContacts } from '../redux/actions/contactAction'
import { GetDetailContacts } from '../redux/actions/detailaction'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
import Service from '../service'
import Loader from '../loading/LoaderInScreen'
import LoaderModal from '../loading/LoaderModal'
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get("window");

Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId, componentId }, { ...props }) => {
        if (buttonId === 'Main.Contact.Component') {
            Navigation.dismissModal(componentId)
        }
    });

const ActionContact = ({ componentId, ...props }) => {
    const { mode, id } = props
    const [isbuttonenable, setIsbuttonenable] = useState(false)
    const [firstName, setFirsname] = useState(null)
    const [validateFirstName, setValidateFirstname] = useState(false)
    const [lastName, setLasname] = useState(null)
    const [validateLastName, setValidateLastName] = useState(false)
    const [mobile, setMobile] = useState(null)
    const [email, setEmail] = useState(null)
    const [validateEmail, setvalidateEmail] = useState(false)
    const [validateEmailError, setValidateEmailError] = useState(false)
    const [validatePhone, setvalidatePhone] = useState(false)
    const [foto, setFoto] = useState(null)
    const [validateFoto, setValidateFoto] = useState(false)
    const [fileSend, setFileSend] = useState(null)
    const [loadingImage, setLoadingImage] = useState(false)
    const [loadingHttp, setLoadingHttp] = useState(false)
    const [loadingModal, setLoadingModal] = useState(true)

    useEffect(() => {
        if (mode === 'edit') {
            async function Detail() {
                await getDetail();
            }
            Detail();
        } else {
            setLoadingModal(false)
        }
    }, [])

    const getDetail = async () => {
        Service.GetContacts(id)
            .then(response => {
                setTimeout(() => {
                    setLoadingModal(false)
                    setvalidateEmail(true)
                }, 1000);

                if (response.status === 200) {
                    setFirsname(response.data.data.firstName)
                    setLasname(response.data.data.lastName)
                    setMobile(response.data.data.mobile)
                    setEmail(response.data.data.email)
                    setFoto(response.data.data.avatar)

                } else if (response.status === 201) {
                    setLoadingHttp(false)
                }

            })
            .catch(e => {
                setLoadingHttp(false)
                console.log(e);
            });
    }

    const onChangeFirstName = (val) => {
        if (val === '') {
            setFirsname(val)
            setValidateFirstname(true)
        } else {
            setFirsname(val)
            setValidateFirstname(false)
        }
    }
    const onChangeLastName = (val) => {
        if (val === '') {
            setLasname(val)
            setValidateLastName(true)
        } else {
            setLasname(val)
            setValidateLastName(false)
        }

    }
    const onChangeMobile = (val) => {
        if (val === '') {
            setMobile(val)
        } else {
            if (val.length < 7) {
                setMobile(val)
                setvalidatePhone(false)
            } else {
                setMobile(val)
                setvalidatePhone(false)
            }
        }
    }
    const onChangeEmail = (val) => {
        if (val === '') {
            setEmail(val)
        } else {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(val) === false) {
                setEmail(val)
                setvalidateEmail(false)
                setValidateEmailError(true)
            } else {
                setEmail(val)
                setvalidateEmail(true)
                setValidateEmailError(false)
            }
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
            setValidateFoto(false)

        });
    }
    const AddContact = () => {
        if (!foto) {
            setValidateFoto(true)
            return;
        }

        if (!firstName || !firstName.trim()) {
            setValidateFirstname(true)
            return;
        }
        if (!lastName || !lastName.trim()) {
            setValidateLastName(true)
            return;
        }
        if (!mobile || !mobile.trim()) {
            setvalidatePhone(true)
            return;
        }
        if (!validateEmail) {
            setValidateEmailError(true)
            return;
        }
        setLoadingHttp(true)
        let data = {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            files: fileSend,
            email: email
        }
        if (mode === 'edit') {
            Service.updateContacts(data, id)
                .then(response => {
                    let res;
                    if (response.status === 200) {
                        res = null;
                    } else {
                        res = JSON.parse(response.data);
                    }
                    setLoadingHttp(false)
                    if (response.status === 200 || res.status === true) {
                        props.GetListContacts()
                        props.GetDetailContacts(id)
                        Toast.showWithGravity('Berhasil update data', Toast.LONG, Toast.TOP)
                        Navigation.dismissModal(componentId)
                    } else if (response.status == false || res.status === false) {
                        Toast.showWithGravity('Terjadi kesalahan pada server, mohon tunggu beberapa saat', Toast.LONG, Toast.TOP)
                    } else {
                    }

                })
                .catch(e => {
                    Toast.showWithGravity('Server sedang padat, mohon tunggu beberapa saat lagi', Toast.LONG, Toast.TOP)
                    setLoadingHttp(false)
                    console.log(e);
                });
        } else {
            Service.AddContact(data)
                .then(response => {
                    const res = JSON.parse(response.data)
                    setLoadingHttp(false)
                    if (res.status === true) {
                        props.GetListContacts()
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

    }
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
                    {
                        validateFoto ?
                            <Text style={{ color: 'red', fontSize: 10, fontWeight: '600', marginHorizontal: 5 }}>Foto tidk boleh kosong</Text>
                            : null
                    }

                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>First Name</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: Edo'
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        value={firstName}
                        onChangeText={val => onChangeFirstName(val)}
                    />
                    {
                        validateFirstName ?
                            <Text style={{ color: 'red', fontSize: 10, fontWeight: '600', marginHorizontal: 5 }}>First Name tidak boleh kosong</Text>
                            : null
                    }
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>Last Name</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: dudung'
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        value={lastName}
                        onChangeText={val => onChangeLastName(val)}
                    />
                    {
                        validateLastName ?
                            <Text style={{ color: 'red', fontSize: 10, fontWeight: '600', marginHorizontal: 5 }}>Last Name tidak boleh kosong</Text>
                            : null
                    }
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>Mobile</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex : 0813288xxxxx'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'phone-pad'}
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        defaultValue={mobile}
                        onChangeText={val => onChangeMobile(val)}
                    />
                    {
                        validatePhone ?
                            <Text style={{ color: 'red', fontSize: 10, fontWeight: '600', marginHorizontal: 5 }}>No Hp tidak boleh kosong</Text>
                            : null
                    }
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>Email</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: Email@gmail.com'
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        value={email}
                        onChangeText={val => onChangeEmail(val)}
                    />
                    {
                        validateEmailError ?
                            <Text style={{ color: 'red', fontSize: 10, fontWeight: '600', marginHorizontal: 5 }}>Format email yang benar: nama@email.com</Text>
                            : null
                    }
                </View>
            </View>
            <View style={{ flex: .15, margin: 10, }}>
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
            <LoaderModal loading={loadingModal} />
        </View>
    )
}

const mapStateToProps = state => ({
    isLoading: state.contact.isLoading,
    contact: state.contact.ListContacts,
    error: state.contact.error,
})
function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ GetDetailContacts, GetListContacts }, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ActionContact)