import {Metrics} from "../../configs/Theme";
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    navTop: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#1A1B1F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    left2: {
        paddingLeft: 17,
        width:60,
        justifyContent: 'center'
    },
    right2: {
        width:60,
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        alignItems: 'center',
        paddingLeft: 17
    },
    navTitle: {
        flex: 1,
        width:Metrics.screenWidth - 164,
        marginLeft:5,
        marginRight:5,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    table_view:{
        flex:1,
        backgroundColor:'#1A1B1F',
        alignItems:'center'
    },
    click_btn:{
        paddingTop:16,
        paddingBottom:16,
        width:Metrics.screenWidth,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#36373A',
        borderColor:"#2D2D2D",
        borderWidth:1
    },
    macao_txt:{
        color:"#ECECEE",
        fontSize:14,
        alignSelf:'center'
    },
    jinsha:{
        width:Metrics.screenWidth,
        height:170
    },
    txt_view:{
        height:45,
        width:Metrics.screenWidth,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    },
    weini_view:{
        flexDirection:'column',
        marginLeft:32,

    },
    txt1:{
        fontSize:18,
        color:"#FFE9AD",
        marginLeft:17,
        maxWidth:'80%'
    },
    txt2:{
        fontSize:14,
        color:"#AAAAAA",
        marginTop:2
    }
})

