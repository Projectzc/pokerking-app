import {StyleSheet} from 'react-native';
import {Metrics} from "../../../configs/Theme";

export default StyleSheet.create({
    navBar: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#1A1B1F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    btn_search: {
        width: 50,
        height: 40,
        flexDirection: "row",
        alignItems: 'center'
    },
    btn_search2: {
        flex:1,
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent:'center'
    },
    cancel_text: {
        fontSize: 17,
        color: '#FFFFFF'
    },
    title: {
        fontSize: 12,
        color: '#998E72'
    },
    img_search: {
        height: 17,
        width: 17
    },
    nar_text: {
        fontSize: 17,
        color: '#FFE9AD',
        alignSelf: 'center',
        maxWidth: '60%'
    },
    resent: {
        height: 45,
        alignItems: 'center',
        flexDirection: 'row'
    },
    txtRecent: {
        fontSize: 14,
        color: '#999999',
        marginLeft: 19
    },
    viewSearch: {
        minHeight: 50
    },
    imgDel: {
        height: 22,
        width: 22
    },
    btnDel: {
        height: 45,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabSearch: {
        borderRadius: 14,
        height: 28,
        paddingLeft: 17,
        paddingRight: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303236',
        marginBottom: 16,
        marginRight: 12
    },
    txtTab: {
        fontSize: 14,
        color: '#999999'
    }
})

