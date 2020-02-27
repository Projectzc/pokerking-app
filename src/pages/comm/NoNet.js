import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {Colors, px2dp, px2sp} from "../../configs/Theme";


const NoNet =({refresh})=>(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

        <Image style={{width:px2dp(198),height:px2dp(160),marginTop:px2dp(252)}}/>

        <Text style={{color:'#ccc',fontSize:px2sp(36),marginTop:px2dp(24)}}>网速过慢，请重新加载</Text>

        <TouchableOpacity
            onPress={()=>refresh && refresh()}
            style={{height:px2dp(80),width:px2dp(344),borderRadius:px2dp(4),
            alignItems:'center',justifyContent:'center',marginTop:px2dp(74)}}>
            <Text style={{color:Colors._FFE,fontSize:px2sp(34)}}>重新加载</Text>

        </TouchableOpacity>

    </View>
)
export default NoNet