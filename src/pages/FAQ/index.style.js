import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    faq_view: {
        paddingTop:16,
        paddingBottom:16,
        width: Metrics.screenWidth,
        backgroundColor: "white",
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt:{
        color:"#333333",
        fontSize:18,
        marginLeft:18,
        width:'80%'
    },
    txt2:{
        color:"#444444",
        fontSize:14,
        lineHeight:20
    },
    image:{
       width:12,
       height:22,
        marginRight:18
    },
    image2:{
        height:12,
        width:22,
        marginRight:18
    }

})

