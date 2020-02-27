import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, Modal} from 'react-native';
import {Metrics} from "../../configs/Theme";
import Picker from '@gregfrench/react-native-wheel-picker'
import LinearGradient from 'react-native-linear-gradient'

let PickerItem = Picker.Item;


export default class SelectPiker extends Component {

    state = {
        visible: false,
        index: 1
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
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
                <TouchableOpacity style={{flex:1}} onPress={()=>{
                    // const {index} = this.state;
                    // if (index === 0) {
                    //     global.lang.switchLang('en')
                    // } else if (index === 1) {
                    //     global.lang.switchLang('zh')
                    // } else if (index === 2) {
                    //     global.lang.switchLang('zh-e')
                    // } else {
                    //     global.lang.switchLang('zh')
                    // }
                    this.toggle();
                }}/>

                <LinearGradient
                    colors={['#E1BB8D', '#8B6941']}
                    style={{
                    width: Metrics.screenWidth,
                    position: 'absolute',
                    bottom: 0
                }}>
                    <LinearGradient
                        colors={['#E1BB8D', '#8B6941']}
                        style={{
                        height:50,
                        flexDirection: 'row',
                        paddingLeft: 17,
                        paddingRight: 17,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.toggle();
                        }}>
                            <Text style={{color: "#FFF", fontSize: 18}}>{global.lang.t('cancel')}</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={() => {
                            const {index} = this.state;
                            if (index === 0) {
                                global.lang.switchLang('en')
                            } else if (index === 1) {
                                global.lang.switchLang('zh')
                            } else if (index === 2) {
                                global.lang.switchLang('zh-e')
                            } else {
                                global.lang.switchLang('zh')
                            }
                            this.toggle();
                        }}>
                            <Text style={{color: "#FFF", fontSize: 18}}>{global.lang.t('determine')}</Text>
                        </TouchableOpacity>

                    </LinearGradient>
                    <Picker style={{width: Metrics.screenWidth,height: 180}}
                            selectedValue={this.props.selectedItem}
                            itemStyle={{color: "#FFF", fontSize: 20,borderWidth:0}}
                            onValueChange={(index) => {
                                this.props.onPickerSelect(index);
                                this.setState({
                                    index: index
                                })
                            }}>
                        {this.props.itemList.map((value, i) => (
                            <PickerItem label={value} value={i} key={value}
                                        color={i === this.state.index ? "#FFF" : "#333"}/>
                        ))}
                    </Picker>
                    <View style={{height: 40}}/>
                </LinearGradient>
            </Modal>

        )
    }
}