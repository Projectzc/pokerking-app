
import { StyleSheet } from 'react-native';
import {Metrics, px2dp, px2sp} from "../../configs/Theme";
export default StyleSheet.create({
    time_text:{
        color:"#6A6C74",
        fontSize:14
    },
    item: {
        width:Metrics.screenWidth - 20,
        marginTop: 7,
        backgroundColor:'#FFFFFF',
        paddingTop:21,
        paddingBottom:25
    },
    img: {
        height: px2dp(336),
        width: Metrics.screenWidth - 34,
        alignSelf:'center'
    },
    title: {
        color: '#303236',
        fontSize: px2sp(32),
        lineHeight:25,
        marginLeft:5,
        marginRight:5
    },
    title2:{
        color: '#303236',
        fontSize: px2sp(32),
        fontWeight:'bold',
        lineHeight:25
    },
    title3:{
        color: '#4A90E2',
        fontSize: px2sp(32),
        lineHeight:25
    },
    title4:{
        color: '#64AD10',
        fontSize: px2sp(32),
        fontWeight:'bold',
        lineHeight:25
    },
    rowBack3:{
        marginLeft:10,
        marginRight:10,
        marginTop:46,
        backgroundColor:'#888888',
        flexDirection: 'row',
        alignItems:'center'
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

