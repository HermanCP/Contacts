import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    Linking
} from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddFavorites, RemoveFavorites } from '../redux/actions/favoritesAction'
import { GetListContacts } from '../redux/actions/contactAction'
import { GetDetailContacts } from '../redux/actions/detailaction'
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
import Service from '../service'
import LoaderModal from '../loading/LoaderModal'
import Toast from 'react-native-simple-toast';



Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId, componentId }) => {
        if (buttonId === 'Main.Contact.Component') {
            Navigation.pop(componentId);
        }
    });

const ActionContact = ({ componentId, ...props }) => {
    const [loadingHttp, setLoadingHttp] = useState(true)
    const [data, setData] = useState(null)
    const [selectedFavorites, setSelectedfavorites] = useState(false)
    const { DetailContacts } = props.detailContacts


    useEffect(() => {
        async function Detail() {
            await getDetail();
        }
        Detail();
    }, [])

    const getDetail = async () => {
        props.GetDetailContacts(props.id)
        Service.GetContacts(props.id)
            .then(response => {
                if (response.status === 200) {
                    setLoadingHttp(false)
                    if (response.data.data.isFavorites === 1) {
                        setSelectedfavorites(true)
                    }
                } else if (response.status === 201) {
                    setLoadingHttp(false)
                }

            })
            .catch(e => {
                setLoadingHttp(false)
                console.log(e);
            });
    }

    const Message = async () => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${DetailContacts.mobile}${separator}body=''`
        await Linking.openURL(url)
    }
    const SendEmail = () => {
        Linking.openURL(`mailto:${DetailContacts.email}`)
    }
    const CallNumber = () => {
        let phoneNumber = DetailContacts.mobile;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${DetailContacts.mobile}`;
        }
        else {
            phoneNumber = `tel:${DetailContacts.mobile}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };
    const addToFavorites = () => {
        let send = {
            id: props.id
        }
        if (!selectedFavorites) {
            setSelectedfavorites(selectedFavorites => !selectedFavorites)
            props.AddFavorites(send)
            props.GetListContacts()
        } else {
            setSelectedfavorites(selectedFavorites => !selectedFavorites)
            props.RemoveFavorites(send)
            props.GetListContacts()
        }

    }

    const DeleteAction = () => {
        setLoadingHttp(true)
        console.log(props.id)
        Service.DeleteContacts(props.id)
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                Toast.showWithGravity('Data berhasil di hapus', Toast.LONG, Toast.TOP)
                setLoadingHttp(false)
                props.GetListContacts()
                Navigation.pop(componentId)
            } else if (response.status === 201) {
                setLoadingHttp(false)
                Toast.showWithGravity('Terjadi kesalahan pada server, mohon tunggu beberapa saat', Toast.LONG, Toast.TOP)
            }

        })
        .catch(e => {
            Toast.showWithGravity('Server sedang padat, mohon tunggu beberapa saat lagi.', Toast.LONG, Toast.TOP)
            setLoadingHttp(false)
            console.log(e);
        });
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: 'grey',
                        borderRadius: 100,
                        width: 100,
                        height: 100,
                        margin: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{}}>
                            {
                                DetailContacts.avatar ?
                                    <Image source={{ uri: DetailContacts.avatar }} style={{ height: 100, width: 100, borderRadius: 100 }} />
                                    :
                                    <Image source={require('../images/profile.png')} style={{ height: 50, width: 50 }} />
                            }

                        </View>
                    </View>
                    <View>
                        <Text style={styles.titlePrimary}>{DetailContacts.firstName} {DetailContacts.lastName}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity activeOpacity={.6} onPress={() => Message()} style={styles.actionBox}>
                            <View style={styles.actionUser}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} onPress={() => CallNumber()} style={styles.actionBox}>
                            <View style={styles.actionUser}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} onPress={() => SendEmail()} style={styles.actionBox}>
                            <View style={styles.actionUser}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} onPress={() => addToFavorites()} style={[styles.actionBox]}>
                            <View style={[styles.actionUser, { backgroundColor: selectedFavorites ? colors.green : colors.withe, borderWidth: selectedFavorites ? 0 : 1, borderColor: selectedFavorites ? colors.green : colors.grey }]}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>favorite</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <View style={styles.ViewContacts}>
                    <Text style={styles.titleList}>Mobile : </Text>
                    <Text style={[styles.subtitlePrimary, { marginHorizontal: 20 }]}>{DetailContacts.mobile}</Text>
                </View>
                <View style={styles.ViewContacts}>
                    <Text style={styles.titleList}>Email : </Text>
                    <Text style={[styles.subtitlePrimary, { marginHorizontal: 20 }]}>{DetailContacts.email}</Text>
                </View>
                <View style={[styles.ViewContacts, {borderBottomWidth:0}]}>
                <TouchableOpacity
                    onPress={() => DeleteAction()}
                    style={[styles.BtnBorder, {
                        borderColor: colors.red,
                        borderWidth: 1,
                        borderRadius: 25
                    }]}
                >
                    <Text style={[styles.titleList, {
                        color: colors.red,

                    }]}>Hapus</Text>
                </TouchableOpacity>
                </View>
                
            </View>
            <LoaderModal loading={loadingHttp}/>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        isFavorite: state.isFavorite,
        detailContacts: state.detailContacts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ AddFavorites, RemoveFavorites, GetListContacts, GetDetailContacts }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionContact)