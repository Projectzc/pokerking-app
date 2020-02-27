import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    modifyData_view: {
        flex: 1,
        backgroundColor: "#ECECEE"
    },
    text_label: {
        color: "#333333",
        fontSize: Metrics.reallySize(17),
        marginRight: Metrics.reallySize(17)
    },
    line2: {
        height: 1,
        width:Metrics.screenWidth,
        backgroundColor: '#ECECEE'
    },
    item_view: {
        height: Metrics.reallySize(54),
        alignItems: 'center',
        flexDirection: 'row'
    },
    item_view2: {
        height: Metrics.reallySize(54),
        alignItems: 'center',
        flexDirection: 'row'
    },
    text_value: {
        color: "#333333",
        fontSize: Metrics.reallySize(15),
        height:40,
        flex:1,
        textAlign:'right'
    },
    text_value2: {
        fontWeight:'bold',
        color: "#333333",
        fontSize: Metrics.reallySize(15)
    }
})

