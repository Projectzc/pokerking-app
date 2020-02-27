import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView, FlatList, Modal,StatusBar
} from 'react-native';
import {Images, Metrics, px2dp} from "../../configs/Theme";
import LinearGradient from 'react-native-linear-gradient'

export default class TopBar extends Component {

    render(){
        const {left_img,narTitle,right_img,left_btn,mid_btn,showLeftIcon,showSearch} = this.props;
        return(
            <LinearGradient
                colors={['#E1BB8D', '#8B6941']}
                style={styles.navTop}>
                <StatusBar barStyle={'light-content'}/>
                <TouchableOpacity
                    onPress={() => {
                        left_btn && left_btn()
                    }}
                    style={styles.left22}>
                    {showLeftIcon?<Image
                        style={{height: px2dp(34), width: px2dp(42)}}
                        source={left_img}
                    />:null}

                </TouchableOpacity>
                {showSearch?<View style={styles.search}/>:null}
                <TouchableOpacity
                    style={styles.navTitle}
                    onPress={() => {
                        mid_btn && mid_btn()
                    }}>
                    <Text
                        style={{fontSize: 17, color: '#FFF', maxWidth: '90%'}}
                        numberOfLines={1}>{narTitle}</Text>
                </TouchableOpacity>
                {showSearch?  <TouchableOpacity
                    onPress={() => {
                        router.toSearchNews()
                    }}
                    style={styles.search}>
                    <Image
                        style={{height: px2dp(40), width: px2dp(40)}}
                        source={Images.home_search}
                    />

                </TouchableOpacity>:null}

                <TouchableOpacity
                    onPress={() => {
                        router.toSetting()
                    }}
                    style={styles.right2}>
                    <Image
                        style={{height: px2dp(52), width: px2dp(52)}}
                        source={right_img}
                    />

                </TouchableOpacity>
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create({
    navTop: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    left22: {
        paddingLeft: 17,
        width:40,
        justifyContent: 'center'
    },
    right2: {
        width:40,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingLeft: 17
    },
    search: {
        width:px2dp(50),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingLeft: 17
    },
    navTitle: {
        flex: 1,
        width:Metrics.screenWidth - 164,
        marginLeft:5,
        marginRight:5,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})