import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Base from "../Base";
import {Colors, px2dp, px2sp} from "../../configs/Theme";
import StepToChange from "./StepToChange";
import LinearGradient from 'react-native-linear-gradient'

@connect(({ChangePhone}) => ({
    ...ChangePhone,
}))
export default class ChangePhone extends Component {

    state = {
        showModal: false
    }

    componentDidMount() {

    }

    toggle = ()=>{
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        const {mobile,country_code} = this.props.params
        return (
            <Base style={{alignItems: 'center'}}>

                <Text style={[styles.txtPhone, {marginTop: px2dp(328)}]}>{global.lang.t('iphone_text')}{mobile}</Text>
                <Text style={[styles.txtPhone, {marginTop: px2dp(14)}]}>{global.lang.t('iphone_text2')}</Text>

                <TouchableOpacity  onPress={this.toggle}>
                    <LinearGradient
                        colors={['#E1BB8D', '#8B6941']}
                        style={[styles.btnChange, {marginTop: px2dp(178)}]}>
                        <Text style={styles.txtChange}>{global.lang.t('change_mobile')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <StepToChange
                    oldMobile={mobile}
                    country_code={country_code}
                    closeModal={this.toggle}
                    showModal={this.state.showModal}
                />


            </Base>
        )
    }
}

const styles = StyleSheet.create({
    txtPhone: {
        fontSize: px2sp(32),
        color: '#AAA',
        marginLeft:8,
        marginRight:8
    },
    btnChange: {
        height: px2dp(100),
        width: px2dp(682),
        marginHorizontal: px2dp(34),
        backgroundColor: Colors._FFE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px2dp(8)
    },
    txtChange: {
        fontSize: px2sp(34),
        color: '#FFF'
    }
})
