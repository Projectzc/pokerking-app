import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    top_txt: {
        color: '#444444',
        fontSize: 22,
        marginTop: 46,
        marginBottom: 54
    },
    textView: {
        width: Metrics.screenWidth - 34,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ECECEE',
        borderBottomWidth: 1,
        flexWrap: 'nowrap'
    },
    confirm_btn: {
        marginTop: 50,
        width: Metrics.screenWidth - 34,
        height: 40,
        backgroundColor: '#939393'
    },
    areaView: {
        width: Metrics.screenWidth - 34,
        // marginTop: 50,
        paddingTop:50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ECECEE',
        borderBottomWidth: 1
    },
    btn: {
        width: Metrics.screenWidth - 34,
        paddingTop: 17,
        paddingBottom: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:4,
    },
    down_txt2: {
        fontSize: 14,
        color: '#4A90E2'
    }
})

