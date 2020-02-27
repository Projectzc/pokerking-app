import {StyleSheet} from 'react-native';
import {Metrics} from "../../themes";
import {px2dp} from "../../configs/Theme";
import {div} from "../../utils/utils";

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
    race_view: {
        flex: 1,
        backgroundColor: '#1A1B1F',
        flexDirection:'column'
    },
    carousel_view: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    time_view: {
        height: 45,
        width: Metrics.screenWidth,
        backgroundColor: "#1A1B1F",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    date_text: {
        alignSelf: 'center',
        color: "#DAB68A",
        fontSize: 15,
        maxWidth: '70%'
    },
    slide_view: {
        flexDirection: 'column'
    },
    slide_top_view_1: {
        width: Metrics.screenWidth - 60,
        backgroundColor: "#6C6C6C",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 4
    },
    slide_top_view: {
        width: Metrics.screenWidth - 60,
        backgroundColor: "#DAB68A",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 4
    },
    race_time_txt_1: {
        color: "#CCCCCC",
        fontSize: 16
    },
    race_time_txt2_1: {
        color: "#CCCCCC",
        fontSize: 16
    },
    race_time_txt: {
        color: "#FFF",
        fontSize: 16
    },
    race_time_txt2: {
        color: "#FFF",
        fontSize: 16,
        maxWidth: '60%'
    },
    card_name: {
        color: "#DAB68A",
        fontSize: 14,
        marginTop: 12,
        maxWidth:Metrics.screenWidth - 60
    },
    card_bottom_view: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 8
    },
    card_location: {
        color: "#998E72",
        fontSize: 12,
        maxWidth:'75%'
    },
    collect_img: {
        width: px2dp(40),
        height: px2dp(38)
    },
    share_img: {
        width: px2dp(40),
        height: px2dp(32),
        marginLeft: 18
    },
    slide_img: {
        marginBottom: px2dp(24),
        width: Metrics.screenWidth - 60,
        height: px2dp(302)
    },
    personalText: {
        fontSize: 12,
        color: '#DAB68A',
        marginTop: 7
    },
    personalImg: {
        width: Metrics.reallySize(6),
        height: Metrics.reallySize(16),
        marginRight: 18
    },
    item_view: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight:9,
        marginTop:17
    },
    item_view_last: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:17
    },
    item_view2: {
        height: px2dp(120),
        width: px2dp(120),
        borderRadius: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#303236'
    },
    img_dy: {
        width: px2dp(54),
        height: px2dp(66)
    },
    img_dy1: {
        width: px2dp(54),
        height: px2dp(62)
    },
    img_dy2: {
        width: px2dp(72),
        height: px2dp(72)
    },
    img_dy3: {
        width: px2dp(68),
        height: px2dp(28)
    },
    img_dy4: {
        width: px2dp(64),
        height: px2dp(60)
    },
    select_top_view: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12
    },
    select_top_txt: {
        fontSize: 18,
        color: '#444444',
        marginLeft: 28,
        fontWeight: 'bold'
    },
    select_item_txt: {
        fontSize: 14,
        color: '#ECECEE'
    },
    select_item_view1: {
        backgroundColor: "#333436",
        borderLeftWidth: 6,
        borderLeftColor: "#CF1E34"
    },
    select_top_view2: {
        backgroundColor: "#3F4042"
    }
})

