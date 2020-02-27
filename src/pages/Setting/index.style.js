import {StyleSheet} from 'react-native';
import {Metrics, px2dp} from "../../configs/Theme";

export default StyleSheet.create({
    btn_view: {
        width: Metrics.screenWidth,
        backgroundColor: "#303236",
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    leftTxt: {
        color: "#FFE9AD",
        fontSize: 15,
        marginLeft: 19
    },
    drop_out_txt: {
        color: "#FFE9AD",
        fontSize: 17
    },
    right_img: {
        marginRight: 17,
        width: px2dp(16),
        height: px2dp(30)
    },
    right_btn: {
        width: 53,
        height: 34,
        borderRadius: 17,
        flexDirection:'row-reverse',
        alignItems: 'center',
        marginLeft: 17
    },
    btn_change: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth:1,
        borderColor:"#888888",
        backgroundColor: 'white'
    },
    rightTitle:{
        color: "#998E72",
        fontSize: 14,
        marginRight:9
    },
    drop_out:{
        width:Metrics.screenWidth,
        height:59,
        backgroundColor:"#303236",
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:0
    },
    img:{
        width:px2dp(102),
        height:px2dp(62)
    }
})

