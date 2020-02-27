
import { StyleSheet } from 'react-native';
import {Metrics, px2dp} from "../../../configs/Theme";
export default StyleSheet.create({
    regist_view:{
        width:Metrics.screenWidth,
        marginTop:28,
        backgroundColor:'white',
        flexDirection:'column'
    },
    input_view:{
        marginLeft:17,
        marginRight:17,
        flexDirection:'row',
        alignItems:'center'
    },
    login_img: {
        width: px2dp(36),
        height: px2dp(40),
        marginRight: 9,
        marginLeft: 7
    },
    next_btn:{
        width: Metrics.screenWidth - 34,
        marginLeft: 17,
        marginRight: 17,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#212223',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
})

