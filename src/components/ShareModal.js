/**
 *作者：lorne
 *时间：2019/2/18
 *功能：
 */

import React, {Component} from 'react';
import {TouchableOpacity, View,Text} from 'react-native'


export default class ShareModal extends Component{

    render(){
        return <View style={{flex:1}}>
            <TouchableOpacity
                onPress={()=>{
                    this.props.toggle && this.props.toggle()
                }}
                style={{flex:1}}>
            </TouchableOpacity>

            <View style={{flex:1,backgroundColor:'white'}}>

                <View style={{flex:1,flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{flex:1,alignItems: 'center',justifyContent: 'center',borderWidth: 1}}>
                        <Text>{global.lang.t('wechat')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1,alignItems: 'center',justifyContent: 'center',borderWidth: 1}}>
                        <Text>{global.lang.t('friends')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1,alignItems: 'center',justifyContent: 'center',borderWidth: 1}}>
                        <Text>{global.lang.t('weibo')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{flex:1,alignItems: 'center',justifyContent: 'center',borderWidth: 1}}>
                        <Text>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1,alignItems: 'center',justifyContent: 'center',borderWidth: 1}}>
                        <Text>Tweeter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>

                    </TouchableOpacity>
                </View>



            </View>

        </View>
    }

}