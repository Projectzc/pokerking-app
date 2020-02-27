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
        fontSize: 16,
        marginLeft: 17
    },
    right_img: {
        width: px2dp(16),
        height: px2dp(30),
        marginRight:17
    }
})

