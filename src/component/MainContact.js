import React, {
    useEffect,
    useState,
    useCallback
} from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
import { connect } from 'react-redux';
import { GetListContacts } from '../redux/actions/contactAction'


const ContactComponent = ({componentId, ...props }) => {
    const { isLoading, contact, error } = props;
    useEffect(() => {
        getContact()
    }, [])
    const getContact = useCallback(async () => {
        props.dispatch(GetListContacts())

    }, [])


    const ViewContacts=(id) => {
        Navigation.push(componentId, navigation.views.ViewContacts(id));
    }


    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <ActivityIndicator />
                    :
                    <>
                        {
                            error ?
                                <View>
                                    <Text>Terjadi kesalahan pada server</Text>
                                </View>
                                :
                                <View>
                                    <FlatList
                                        data={contact}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity activeOpacity={.7} onPress={() => ViewContacts(item.id)} style={styles.listContainer}>
                                                <View style={styles.cyrcleImage}>
                                                    <View style={{}}>
                                                        <Image source={require('../images/profile.png')} style={{ height: 40, width: 40 }} />
                                                    </View>
                                                </View>
                                                <View style={{ marginHorizontal: 20 }}>
                                                    <Text>{item.firstName}</Text>
                                                </View>
                                                <View style={styles.Favorites}>
                                                    <Image source={require('../images/favorite.png')} style={{ height: 30, width: 30 }} />
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



