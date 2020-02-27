import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {Metrics, px2dp} from "../../configs/Theme";
import {isEmptyObject, logMsg} from "../../utils/utils";
import {Images} from "../../configs/Theme";

export default class NetWorkErr extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                height: Metrics.screenHeight - Metrics.navBarHeight,
                width: Metrics.screenWidth,
                backgroundColor: this.props.backgroundColor,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={Images.net_err} style={{width: px2dp(200), height: px2dp(200),marginTop:100}}/>
                <Text style={{color: "#CCCCCC", fontSize: 18, marginTop: 13}}>{global.lang.t('net_err')}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.props.onPress && this.props.onPress()
                    }}
                >
                    <Text style={{
                        color: '#AAAAAA', fontSize: 18,
                        marginTop: 37
                    }}>{global.lang.t('net_err')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}