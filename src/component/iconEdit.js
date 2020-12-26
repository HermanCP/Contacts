import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { Navigation } from 'react-native-navigation';
import navigation from '../Navigation';
import styles, { colors } from '../style'


const Icon = ({componentId, ...props}) => {
    const {action} = props;
    
    const Edit =(mode="edit")=> {
        Navigation.showModal(navigation.actionContacts(mode, props.id));
    }

    return (
        <TouchableOpacity onPress={() => Edit()}>
            <View style={styles.container}>
                <Text style={[styles.subtitlePrimary,{fontWeight:'700',color:colors.green}]}>{action}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Icon;