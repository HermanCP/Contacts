import { StyleSheet, Dimensions } from 'react-native';
export const colors = {
    withe:'#FFF'
};
const { width, height } = Dimensions.get("window");



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.withe
    },

});