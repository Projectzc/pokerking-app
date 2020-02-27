import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView, FlatList, Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Metrics} from "../../configs/Theme";
import {logMsg, mul} from "../../utils/utils";

const codes = [{id: 0, name: 'mainland', code: '86'}, {
    id: 1,
    name: 'hong_kong',
    code: '852'
}, {id: 2, name: 'macao', code: '853'}, {
    id: 3,
    name: 'taiwan',
    code: '886'
}];
const height = Metrics.screenHeight;
const top = Number(mul(height, 0.2315));

export default class ExtArea extends Component {

    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    _separator = () => {
        return <View style={{width: '100%', height: 1, backgroundColor: '#F3F3F3'}}/>
    };

    _renderItem = (item, index) => {
        const {id, name, code} = item;
        return (
            <TouchableOpacity key={index}
                              style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: 50}}
                              onPress={() => {
                                  this.props.changed_ext(code,global.lang.t(name));
                                  this.toggle();
                              }}>
                <Text style={{color: "#666666", fontSize: 14, marginLeft: 10}}>{global.lang.t(name)}</Text>
                <View style={{flex: 1}}/>
                <Text style={{color: "#666666", fontSize: 14, marginRight: 17}}>{code}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                onRequestClose={() => {

                }}
                visible={this.state.visible}
                style={{alignItems: 'center'}}
            >
                <View style={{width:Metrics.screenWidth - 34,marginTop:top,alignSelf:'center'}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.toggle}
                        style={{height: this.props.type && this.props.type === 'ModalPrompt' ? 290 : 110}}/>

                    <Animatable.View animation={'fadeInDown'}>
                        {codes.map(this._renderItem)}
                    </Animatable.View>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.toggle} style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                    }}/>
                </View>
            </Modal>
        )
    }
}