import React, { useEffect, useState } from 'react'
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
    Animated,
    Linking
} from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddFavorites, RemoveFavorites } from '../redux/actions/favoritesAction'
import {GetListContacts} from '../redux/actions/contactAction'
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
import Service from '../service'
const { width, height } = Dimensions.get("window");

Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId, componentId }) => {
        if (buttonId === 'Main.Contact.Component') {
            Navigation.pop(componentId);
        }
    });

const ActionContact = props => {
    const [loadingHttp, setLoadingHttp] = useState(true)
    const [data, setData] = useState(null)
    const [selectedFavorites, setSelectedfavorites] = useState(false)

    useEffect(() => {
        async function Detail() {
            await getDetail();
        }
        Detail();
    }, [])

    const getDetail = async () => {
        Service.GetContacts(props.id)
            .then(response => {
                console.log('responce ', response)
                if (response.status === 200) {
                    setLoadingHttp(false)
                    setData(response.data.data)
                    if(response.data.data.isFavorites === 1){
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
        const url = `sms:${data.mobile}${separator}body=''`
        await Linking.openURL(url)
    }
    const SendEmail = () => {
        Linking.openURL(`mailto:${data.email}`)
    }
    const CallNumber = () => {
        let phoneNumber = data.mobile;
        if (Platform.OS !== 'android') {
          phoneNumber = `telprompt:${data.mobile}`;
        }
        else  {
          phoneNumber = `tel:${data.mobile}`;
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
            id: data.id
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
    console.log(data)

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
                                data !== null ?
                                    <Image source={{ uri: data.avatar }} style={{ height: 100, width: 100, borderRadius: 100 }} />
                                    :
                                    <Image source={require('../images/profile.png')} style={{ height: 50, width: 50 }} />
                            }

                        </View>
                    </View>
                    <View>
                        <Text style={styles.titlePrimary}>{data !== null ? `${data.firstName} ${data.lastName}` : ''}</Text>
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
                <View style={{ padding: 20, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.greyBorder }}>
                    <Text style={styles.titleList}>Mobile : </Text>
                    <Text style={[styles.subtitlePrimary, { marginHorizontal: 20 }]}>{data !== null ? data.mobile : ''}</Text>
                </View>
                <View style={{ padding: 20, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.greyBorder }}>
                    <Text style={styles.titleList}>Email : </Text>
                    <Text style={[styles.subtitlePrimary, { marginHorizontal: 20 }]}>{data !== null ? data.email : ''}</Text>
                </View>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        isFavorite: state.isFavorite,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ AddFavorites, RemoveFavorites,GetListContacts }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionContact)