import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Metrics} from "../../configs/Theme";

@connect(({Mobile}) => ({
    ...Mobile,
}))
export default class Mobile extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F", justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    height: 220,
                    width: Metrics.screenWidth - 34,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={[styles.iphone_text,{fontSize:16}]}>{global.lang.t('iphone_text')}</Text>
                        <Text
                            style={[styles.iphone_text, {fontSize:14,marginTop: 7}]}>{global.lang.t('iphone_text2')}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={styles.mobile_view}>
                        <Text style={styles.change_mobile}>{global.lang.t('change_mobile')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
