import {StyleSheet} from 'react-native';
import {Metrics, px2dp} from "../../configs/Theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1A1B1F'
    },
    person_img: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: "#FFE9AD",
        alignSelf: 'center',
        marginTop: px2dp(134),
        marginBottom: px2dp(120)
    },
    textView2: {
        alignSelf:'center',
        width: Metrics.screenWidth - 34,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: "#303236"
    },
    login_img: {
        width: px2dp(36),
        height: px2dp(40),
        marginRight: 9,
        marginLeft: 7
    },
    confirm_btn: {
        marginTop: 50,
        width: Metrics.screenWidth - 34,
        height: 40,
        backgroundColor: '#939393'
    },
    areaView: {
        width: Metrics.screenWidth - 34,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ECECEE',
        borderBottomWidth: 1
    },
    btn: {
        width: Metrics.screenWidth - 34,
        marginLeft: 17,
        marginRight: 17,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    down_txt: {
        fontSize: 14,
        color: '#4A90E2'
    },
    mobile_ver:{
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'
    }
})

