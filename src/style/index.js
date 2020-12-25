import { StyleSheet, Dimensions, Platform } from 'react-native';
export const colors = {
    withe: '#FFF',
    green: '#33d799',
    greyBorder: "#F8F5F5",
    grey: '#C8C5C5',
};
const { width, height } = Dimensions.get("window");



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.withe
    },
    actionUser: {
        borderRadius: 100,
        backgroundColor: colors.green,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionBox: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    titlePrimary: {
        color: colors.black,
        fontSize: 25,
        fontWeight: '700',
    },
    titleList: {
        color: colors.black,
        fontSize: 15,
        fontWeight: '700',
    },
    subtitlePrimary: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '200',
    },
    listContainer: {
        backgroundColor: colors.withe,
        borderBottomWidth:1,
        borderBottomColor:colors.greyBorder,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cyrcleImage: {
        backgroundColor: 'grey',
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Favorites: {
        position: 'absolute',
        top: 25,
        right: 30,
        bottom: 0
    },
    header: {
        backgroundColor: colors.greyBorder,
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TitleInput: {
        fontSize: 13,
        fontWeight: '700',
        height: (Platform.OS == 'ios') ? 30 : 40,
        color: 'black',
        borderBottomWidth: (Platform.OS == 'ios') ? 1 : 0,
        borderBottomColor: (Platform.OS == 'ios') ? colors.greyBorder : colors.withe,
    },
    Button: {
        borderRadius: 4,
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
    },

});