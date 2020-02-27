import {StyleSheet} from 'react-native';
import {Metrics, px2dp} from "../../configs/Theme";

export default StyleSheet.create({
    upload_text: {
        marginTop: px2dp(48),
        marginLeft: px2dp(34),
        marginBottom: px2dp(34),
        color: "#AAAAAA",
        fontSize: px2dp(28)
    },
    upload_text2: {
        color: "#AAAAAA",
        fontSize: px2dp(28)
    },
    example_view: {
        width: px2dp(412),
        height: px2dp(256),
        alignSelf: 'center',
        marginBottom: 50
    },
    example_img: {
        width: px2dp(414),
        height: px2dp(256),
        alignSelf: 'center'
    },
    confirm_btn2: {
        height: px2dp(88),
        width: Metrics.screenWidth - 34,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    message_view:{
        marginTop:px2dp(16),
        width:Metrics.screenWidth,
        height:px2dp(96),
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:"#FFFFFF"
    },
    message_text:{
        marginLeft: px2dp(34),
        color: "#333333",
        fontWeight:'bold',
        fontSize: px2dp(30)
    },
    upload_text3:{
        marginLeft: px2dp(34),
        marginTop:px2dp(42),
        color: "#AAAAAA",
        fontSize: px2dp(20)
    }
})

