
import { StyleSheet } from 'react-native';
import {Metrics} from "../../configs/Theme";
export default StyleSheet.create({
    iphone_text:{
        color:"#AAAAAA",
        maxWidth:Metrics.screenWidth - 34
    },
    change_mobile:{
        color:"#1A1B1F",
        fontSize:17
    },
    mobile_view:{
        width:Metrics.screenWidth - 34,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#FFE9AD",
        borderRadius:4
    }

})

