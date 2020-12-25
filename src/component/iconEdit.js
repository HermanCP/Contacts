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


const Add = ({componentId, ...props}) => {
    const { action} = props;


    const Edit =()=> {
        Navigation.push(componentId, navigation.views.Contacts());
    }

    return (
        <TouchableOpacity onPress={() => Edit()}>
            <View style={styles.container}>
                <Text>{action}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Add;