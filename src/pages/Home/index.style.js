
import { StyleSheet } from 'react-native';
import {isIphoneX, Metrics} from "../../configs/Theme";
import {mul} from "../../utils/utils";

const WIDTH = Metrics.screenWidth;
const HEIGHT = Metrics.screenHeight;

export default StyleSheet.create({
    home_view:{
        flex:1,
        backgroundColor:'#1A1B1F'
    },
    active_type_view:{
        marginLeft:17,
        marginRight:17,
        paddingTop:12,
        paddingBottom:12,
    },
    home_navTop:{
        height: isIphoneX ? Metrics.navBarHeight + 10 : Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#13151C',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    home_left:{
        height: 44,
        justifyContent: 'center',
        width: 90,
        paddingRight: 10,
        paddingLeft: 17,
        zIndex:999
    },
    home_nav_title:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    home_right:{
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        height: 44,
        alignItems: 'center',
        paddingLeft: 17,
        width: 90
    },
    active_btn:{
        width:Number(mul(WIDTH , 0.437)),
        height:Number(mul(WIDTH , 0.427)),
        borderRadius:Metrics.reallySize(10),
        backgroundColor:"#13151c",
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    touanament_img:{
        width:Number(mul(WIDTH , 0.25)),
        height:Number(mul(WIDTH , 0.25))
    },
    active_txt:{
        color:"#D9C27A",
        fontSize:18,
        marginTop:10
    },
    middle_view:{
        backgroundColor:'white',
        marginBottom:8,
        height:86
    },
    hot_race_view:{
        backgroundColor:'white'
    },
    header_view:{
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        paddingLeft:17,
        paddingRight:17
    },
    hot_race_txt:{
        color:"#E0BA8C",
        fontSize:15,
        fontWeight:'bold'
    },
    more_txt:{
        color:"#CCCCCC",
        fontSize:14
    },
    item_view:{
        marginTop:20,
        marginBottom:16,
        marginLeft:17,
        marginRight:17,
        flexDirection:'row'
    },
    event_view:{
        paddingTop:20,
        paddingBottom:16,
        paddingLeft:17,
        paddingRight:17,
        flexDirection:'row',
    },
    race_img:{
        width:122,
        height:74,
        marginRight:14,
        alignSelf:'center'
    },
    right_view:{
        flexDirection:'column',
        justifyContent:'space-between'
    },
    race_content_txt:{
        color:"#444444",
        fontSize:16
    },
    right_bottom_view:{
        flexDirection:'row',
        alignItems:'center'
    },
    bottom_txt:{
        color:"#998E72",
        fontSize:12
    },
    into_poker_txt:{
        color:"#212223",
        fontSize:17,
        fontWeight:'bold',
        marginTop:18,
        marginLeft:18
    },
    found_beauti_txt:{
        color:"#CCCCCC",
        fontSize:14,
        marginTop:2,
        marginLeft:18
    },
    safe_area_view:{
        alignSelf:'center',
        marginTop:78,
        flexDirection:'column',
        alignItems:'center'
    },
    person_img:{
        width:70,
        height:70,
        borderRadius:35,
        borderWidth:1,
        borderColor:"#FFE9AD"
    },
    person_txt:{
        color:"#FFFFFF",
        fontSize:15,
        marginTop:12
    },
    select_btn:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:28,
        marginLeft:30
    },
    change_img:{
        width:22,height:22,
        marginRight:22
    },
    change_img_about:{
        width:20,height:22,
        marginRight:22
    },
    wentis:{
        width:28,height:28,
        marginRight:18
    },
    safe_area_txt:{
        color:"#ECECEE",
        fontSize:14
    }


})

