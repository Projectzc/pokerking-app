import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {protocol_zh, protocol_en, protocol_zh_en} from '../../lang/Protocol'

@connect(({ProtocolPage}) => ({
    ...ProtocolPage,
}))
export default class ProtocolPage extends Component {


    componentDidMount() {

    }

    get_protocol = () => {
        let lang = global.localLanguage;
        if (lang === 'zh') {
            return protocol_zh
        } else if (lang === 'en') {
            return protocol_en
        } else {
            return protocol_zh_en
        }

    }

    render() {

        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{marginLeft: 17, marginRight: 17, marginTop: 10}}>
                    <Text style={{color: "#444444", fontSize: 14, lineHeight: 22}}>{this.get_protocol()}</Text>
                </View>
                <View style={{height: 80}}/>
            </ScrollView>
        )
    }
}
