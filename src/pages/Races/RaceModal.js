import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Modal, FlatList} from 'react-native';
import styles from './index.style';
import {Images, Styles} from "../../configs/Theme";
import {Metrics} from "../../configs/Theme";
import {isEmptyObject} from "../../utils/utils";


export default class RaceModal extends Component {
    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    _separator = () => {
        return <View style={{height: 1, width: '100%', backgroundColor: '#2D2D2D'}}/>;
    };

    _renderItem = ({item, index}) => {
        const {name} = item;
        const {id} = this.props.recent_event;
        return (
            <TouchableOpacity activeOpacity={1}
                              style={[styles.select_top_view, item.id === id ? styles.select_item_view1 : styles.select_top_view2]}
                              onPress={() => {
                                  this.props.change_recent_event(item);
                                  this.props.change_list_show();
                                  setTimeout(() => {
                                      this.toggle()
                                  }, 100);
                              }}>
                <Text style={[styles.select_item_txt, {marginLeft: item.id === id ? 22 : 28}]}>{name}</Text>
                <View style={{flex: 1}}/>
                <Image style={{width: 6, height: 12, marginRight: 17}} source={Images.is_right}/>
            </TouchableOpacity>)
    };

    render() {

        return (
            this.state.visible ? <View
                style={{
                    height: Metrics.screenHeight,
                    alignItems: 'center',
                    zIndex: 999,
                    position: 'absolute',
                    marginTop: Metrics.navBarHeight,
                    backgroundColor: "#3F4042"
                }}>

                <View style={{
                    width: Metrics.screenWidth
                }}>

                    <FlatList
                        data={this.props.events}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}/>

                </View>
            </View> : null

        )
    }
}