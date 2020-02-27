import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

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
    register_container: {
        flex: 1,
        backgroundColor: "#1A1B1F",
        flexDirection:'column',
        alignItems:'center'
    },
    areaView: {
        marginTop: 11,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"#303236"
    },
    textView:{
        alignSelf:'center',
        width: Metrics.screenWidth,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"#303236"
    },
    down_bind_txt:{
        fontSize:14,
        color:"#1E1E1E"
    },
    bind_text:{
        marginTop:19,
        marginLeft: 17,
        marginRight: 17,
        justifyContent:'center',
        alignItems:'center'
    },
    bind_complete:{
        width: Metrics.screenWidth - 34,
        marginLeft: 17,
        marginRight: 17,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#FFE9AD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 54
    }
})

