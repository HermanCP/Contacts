import React, {
    useEffect,
    useState,
    useCallback
} from 'react'
import {
    View,
    Text,
    RefreshControl,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
import { connect } from 'react-redux';
import Loader from '../loading/LoaderInScreen'
import { GetListContacts } from '../redux/actions/contactAction'


const ContactComponent = ({ componentId, ...props }) => {
    const { isLoading, contact, error } = props;
    const [refreshing, setrefreshing] = useState(false)

    useEffect(() => {
        getContact()
    }, [])

    const getContact = useCallback(async () => {
        props.dispatch(GetListContacts())

    }, [])

    const ViewContacts = (id) => {
        Navigation.push(componentId, navigation.views.ViewContacts(id));
    }

    const _onRefresh = () => {
        setrefreshing(true)
        getContact().then(() => {
            setrefreshing(false)
        })
    }

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <Loader loading={isLoading} />
                    :
                    <>
                        {
                            error ?
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={_onRefresh}
                                            progressBackgroundColor={colors.withe}
                                            enabled={true}
                                            progressViewOffset={0}
                                            colors={[colors.green]}
                                        />}
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Terjadi kesalahan pada server</Text>
                                    </View>
                                </ScrollView>
                                :
                                <View>
                                    <FlatList
                                        data={contact}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={_onRefresh}
                                                progressBackgroundColor={colors.withe}
                                                enabled={true}
                                                progressViewOffset={0}
                                                colors={[colors.green]}
                                            />
                                        }
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity activeOpacity={.7} onPress={() => ViewContacts(item.id)} style={styles.listContainer}>
                                                <View style={styles.cyrcleImage}>
                                                    {
                                                        item.avatar !== null ?
                                                            <Image source={{ uri: item.avatar }} style={{ height: 50, width: 50, borderRadius: 100 }} />
                                                            : <Image source={require('../images/profile.png')} style={{ height: 40, width: 40 }} />
                                                    }
                                                </View>
                                                <View style={{ marginHorizontal: 20 }}>
                                                    <Text>{item.firstName}</Text>
                                                </View>
                                                <View style={styles.Favorites}>
                                                    {
                                                        item.isFavorites === 1 ?
                                                            <Image source={require('../images/favorite.png')} style={{ height: 30, width: 30 }} />
                                                            : null
                                                    }
                                                </View>

                                            </TouchableOpacity>

                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                        }
                    </>
            }
        </View>
    )
}
const mapStateToProps = state => ({
    isLoading: state.contact.isLoading,
    contact: state.contact.ListContacts,
    error: state.contact.error,
})


export default connect(mapStateToProps, null)(ContactComponent)



