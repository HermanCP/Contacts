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
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'
const { width, height } = Dimensions.get("window");

Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId, componentId }, { ...props }) => {
        console.log(buttonId)
        if (buttonId === 'Main.Contact.Component') {
            Navigation.dismissModal(componentId)
        }
    });

const ActionContact = props => {
    const { mode } = props
    const [firstName, setFirsname] = useState(null)
    const [lastName, setLasname] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [email, setEmail] = useState(null)

    const onChangeFirstName = () => {

    }
    const onChangeLastName = () => {

    }
    const onChangeMobile = () => {

    }
    const onChangeEmail = () => {

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{ backgroundColor: 'red', alignItems: 'center', padding:30 }}>
                    <View style={styles.header}>
                        <View style={{}}>
                            <Image source={require('../images/profile.png')} style={{ height: 50, width: 50 }} />
                        </View>
                    </View>

                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>First Name</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: Edo kenadi'
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
                        placeholder='Ex: Edo kenadi'
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
                        placeholder='Ex: Edo kenadi'
                        autoCapitalize="none"
                        clearButtonMode="always"
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        onChangeText={val => onChangeMobile(val)}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subtitlePrimary}>Email</Text>
                    <TextInput
                        style={styles.TitleInput}
                        placeholder='Ex: Edo kenadi'
                        autoCapitalize="none"
                        clearButtonMode="always"
                        autoCorrect={false}
                        underlineColorAndroid={colors.greyBorder}
                        onChangeText={val => onChangeEmail(val)}
                    />
                </View>
            </View>
            <View style={{ flex: .15, margin: 10 }}>
                <TouchableOpacity activeOpacity={0.5}

                    style={[styles.Button, { backgroundColor: colors.green, borderRadius: 15, marginVertical: 10 }]}
                    onPress={props.onRequestClose}
                >
                    <Text style={[styles.buttonText, { color: 'white' }]}>Simpan</Text>


                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ActionContact;