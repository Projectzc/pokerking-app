/**
 *作者：lorne
 *时间：2019/2/18
 *功能：
 */

import React, {Component} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native'
import ShareModal from "./ShareModal";
import {isStrNull} from "../utils/utils";
import dva from '../utils/dva'

export default class CustomModal extends Component {


    toggle = ()=>{
        const {showModal,type} = this.props
        dva.getDispatch()({type:'Home/showModal',params:{
                showModal:!showModal,type
            }})
    }

    close = ()=>{
        const {showModal,type} = this.props
        dva.getDispatch()({type:'Home/showModal',params:{
                showModal:false,type
            }})
    }

    renderContent =()=>{
        const {type} = this.props
        switch (type) {
            case 'ShareModal':
                return <ShareModal toggle={this.toggle}/>
        }

    }

    render() {
        const {showModal,type} = this.props
        let visible = showModal && !isStrNull(type)
        return (<Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => {
            }}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
                {this.renderContent()}

            </View>
        </Modal>)
    }

}