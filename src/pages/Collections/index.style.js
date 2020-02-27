
import { StyleSheet } from 'react-native';
import {px2dp} from "../../configs/Theme";
export default StyleSheet.create({
    rowBack:{
        flex:1,
        backgroundColor:'#888888',
        flexDirection: 'row'
    },
    delete_img:{
        width:px2dp(44),
        height:px2dp(44)
    },
    delete_text:{
        color:"#FFFFFF",
        fontSize:14,
        marginTop:5
    }
})

