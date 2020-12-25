import React from 'react'
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
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
const { width, height } = Dimensions.get("window");

const dataList = [
    {
        id: 1,
        title: 'Mobile',
    },
    {
        id: 2,
        title: 'Email',

    },
]
Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId, componentId }) => {
      if (buttonId === 'Main.Contact.Component') {
        Navigation.pop(componentId);
      }
    });

const ActionContact = props => {


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{ backgroundColor: 'red', alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: 'grey',
                        borderRadius: 100,
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{}}>
                            <Image source={require('../images/profile.png')} style={{ height: 50, width: 50 }} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.titlePrimary}>namanya</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.actionBox}>
                            <View style={styles.actionUser}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>message</Text>
                        </View>
                        <View style={styles.actionBox}>
                            <View style={styles.actionUser}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>call</Text>
                        </View>
                        <View style={styles.actionBox}>
                            <View style={styles.actionUser}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>email</Text>
                        </View>
                        <View style={styles.actionBox}>
                            <View style={styles.actionUser}>
                                <Image source={require('../images/favorite.png')} style={{ height: 50, width: 50 }} />
                            </View>
                            <Text style={[styles.subtitlePrimary, { marginVertical: 5 }]}>favorite</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex:2}}>
                <View style={{padding:20, flexDirection:'row', borderBottomWidth:1,borderBottomColor:colors.greyBorder}}>
                    <Text style={styles.titleList}>Mobile : </Text>
                    <Text style={[styles.subtitlePrimary,{marginHorizontal:20}]}>0989890</Text>
                </View>
                <View style={{padding:20, flexDirection:'row', borderBottomWidth:1,borderBottomColor:colors.greyBorder}}>
                    <Text style={styles.titleList}>Email : </Text>
                    <Text style={[styles.subtitlePrimary,{marginHorizontal:20}]}>0989890</Text>
                </View>
            </View>
        </View>
    )
}

export default ActionContact;