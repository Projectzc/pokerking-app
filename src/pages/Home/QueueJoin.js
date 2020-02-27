import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Metrics, px2dp} from "../../configs/Theme";


export default class QueueJoin extends Component{

    render(){
        const {games} = this.props
        if(games && games.length>0){
            return (<View>
                {games.map((item,i)=>(
                    <LinearGradient
                        key={`join${i}`}
                        colors={['#E1BB8D', '#8B6941']}
                        style={[styles.container]}>

                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.lbNum}>{`Tables #${item.cash_queue_numbers}`}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={()=> router.toQueueProcess(item)}
                            style={styles.btn}>
                            <Text style={styles.lbNum}>排队</Text>
                        </TouchableOpacity>

                    </LinearGradient>
                ))}
            </View>)
        }else{
            return <View/>
        }

    }
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:px2dp(120),
        borderRadius:px2dp(8),
        alignItems:'center',
        flexDirection:'row',
        paddingRight:px2dp(18),
        paddingLeft:px2dp(26),
        justifyContent:'space-between',
        marginTop:px2dp(12)
    },
    title:{
        color:'#FFF',
        fontSize:14,
        marginTop:px2dp(14)
    },
    name:{
        color:'#FFF',
        fontSize:15,
        fontWeight:'bold'
    },
    lbNum:{
        color:'#FFF',
        fontSize:10
    },
    btn:{
        height:px2dp(48),
        width:px2dp(120),
        borderColor:"#FFF",
        borderWidth:px2dp(1),
        justifyContent:'center',
        alignItems:'center'
    }
})