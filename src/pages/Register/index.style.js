
import { StyleSheet } from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    resgister_container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'white'
    },
    textView:{
        alignSelf:'center',
        width:Metrics.screenWidth - 34,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#ECECEE',
        borderBottomWidth:1
    },
    confirm_btn:{
        marginTop:50,
        width:Metrics.screenWidth - 34,
        height:40,
        backgroundColor:'#939393'
    },
    btn:{
        width:'90%',
        marginLeft: 17,
        marginRight: 17,
        paddingTop: 17,
        paddingBottom: 17,
        backgroundColor: '#212223',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:4
    }
})

