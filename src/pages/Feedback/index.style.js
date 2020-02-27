import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    feedback_view: {
        flex: 1,
        backgroundColor: "#ECECEE"
    },
    answer_question: {
        color: "#444444",
        fontSize: 14,
        lineHeight: 20
    },
    feedback_view2: {
        marginTop: 18,
        marginLeft: 17,
        marginRight: 17,
        paddingBottom: 34
    },
    your_mailbox: {
        color: "#444444",
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
        marginTop: 17
    },
    input: {
        width: Metrics.screenWidth - 34,
        height: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#CCCCCC",
        marginTop: 7,
        paddingLeft: 7,
        paddingRight: 7
    },
    list_view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    browse_documents_btn: {
        width: Metrics.reallySize(113),
        height: Metrics.reallySize(32),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom_btn: {
        width: Metrics.screenWidth - 34,
        height: Metrics.reallySize(40),
        justifyContent:'center',
        alignItems:'center'
    },
    browse_documents:{
        color:"#FFFFFF",
        fontSize:12
    }
})

