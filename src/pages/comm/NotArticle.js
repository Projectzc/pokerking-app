import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {Metrics, px2dp} from "../../configs/Theme";
import {isEmptyObject, logMsg} from "../../utils/utils";
import {Images} from "../../configs/Theme";

export default class NotArticle extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.props.onPress && this.props.onPress()
                }}
                style={{
                    flex: 1,
                    height:Metrics.screenHeight - Metrics.navBarHeight,
                    width:Metrics.screenWidth,
                    backgroundColor: this.props.backgroundColor,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems: 'center'
                }}>
                <Image style={{height: px2dp(176), width: px2dp(176)}}
                       source={Images.no_search}/>

                <Text style={{
                    color: '#484A50', fontSize: 15,
                    marginTop: 22
                }}>{global.lang.t('load_no_article')}</Text>
            </TouchableOpacity>
        )
    }
}