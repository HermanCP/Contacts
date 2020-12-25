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
    const { iconSrc } = props;


    const ModeContact =(mode="add")=> {
        // Navigation.push(componentId, navigation.views.actionContact());
        Navigation.showModal(navigation.actionContacts(mode));
    }

    return (
        <TouchableOpacity onPress={() => ModeContact()}>
            <View style={styles.container}>
                <Image source={iconSrc} resizeMode="contain"  style={{width:20,height:20}}/>
            </View>
        </TouchableOpacity>
    )
}

export default Add;