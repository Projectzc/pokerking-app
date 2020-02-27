import {StyleSheet} from 'react-native';
import {Metrics} from "../../../configs/Theme";

export default StyleSheet.create({
    navTop: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
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
        backgroundColor: "#FFFFFF",
        flexDirection:'column',
        alignItems:'center'
    },
    areaView: {
        width: Metrics.screenWidth - 34,
        marginTop: 11,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textView:{
        alignSelf:'center',
        width: Metrics.screenWidth - 34,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    complete:{
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

