/**
 *作者：lorne
 *时间：2019/6/25
 *功能：
 */
import React, {Component} from 'react';
import {Image, View,DeviceEventEmitter} from 'react-native';

import {px2dp} from "../../configs/Theme";

export default class TabBarItem extends Component {

    state = {
        msg_unread: false
    }

    handleChange = (msgInfo) => {
        if (msgInfo) {
            this.setState({
                msg_unread: msgInfo.unread_count > 0
            })
        }
    }



    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('NoticeTab',this.handleChange)
    }

    componentWillUnmount(){
        this.subscription.remove()
    }


    render() {
        let {focused, normalImage, selectedImage, iconStyle,redDot} = this.props;
        iconStyle = iconStyle || {}
        return (
            <View style={{marginTop:5}}>
                <Image
                    source={focused ? selectedImage : normalImage}
                    style={iconStyle}/>
                {this.state.msg_unread && redDot? <View style={{
                    height: px2dp(20), width: px2dp(20), borderRadius: px2dp(10),
                    backgroundColor: 'red',position:'absolute',top:0,right:-5
                }}/> : null}
            </View>
        );
    }
}
