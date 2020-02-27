import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    old_pwd_view: {
        width: Metrics.screenWidth,
        height: 50,
        backgroundColor: "#212325",
        flexDirection: 'row',
        alignItems: 'center'
    },
    left_text: {
        color: '#AAAAAA',
        fontSize: 16,
        marginLeft: 17
    },
    determine: {
        color: '#212325',
        fontSize: 14
    },
    iphone_change: {
        color: '#FFF',
        fontSize: 17
    },
    confirm_view: {
        width: Metrics.screenWidth - 34,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE9AD',
        borderRadius: 4
    },
    iphone_pwd:{
        position:'absolute',
        bottom:47,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    getCode:{
        width:100,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#FFE9AD"
    },
    down_txt: {
        fontSize: 16,
        color: '#212325'
    }
})

