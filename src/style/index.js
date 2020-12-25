import { StyleSheet, Dimensions } from 'react-native';
export const colors = {
    withe: '#FFF',
    green: '#33d799',
    greyBorder: "#F8F5F5",
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
        backgroundColor: "red",
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
    Favorites:{
        position:'absolute',
        top:25,
        right:30,
        bottom:0
    }

});