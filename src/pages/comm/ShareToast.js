import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    Modal,
} from 'react-native';
import ShareItem from "./ShareItem";
import {Images, px2dp} from '../../configs/Theme';
import LinearGradient from 'react-native-linear-gradient'

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;


export default class ShareToast extends Component {
    static props = {
        hiddenShareAction: null,//关闭弹窗回调
        shareTitle: null,//分享标题
        shareText: null,//分享内容
        shareLink: null,//分享链接
        shareImage: null,//分享图片
        shareType: null,//分享的类型
        show_favorites: false
    };

    ///关闭分享弹窗
    hiddenShare = () => {
        this.props.hiddenShareAction && this.props.hiddenShareAction();
    };

    render() {
///分享平台列表
        let shareList = [
            {
                platform: "wechat_session",
                icon: Images.icon_share_wechat,
                name: global.lang.t('weixin'),
            },
            {
                platform: "wechat_timeLine",
                icon: Images.icon_share_wxcircle,
                name: global.lang.t('friend_circle'),
            },
            // {
            //     platform: "facebook",
            //     icon: Images.facebook,
            //     name: 'Facebook',
            // },
            {
                platform: "twitter",
                icon: Images.twitter,
                name: 'twitter',
            },
            {
                platform: "copy_link",
                icon: Images.fuzhi,
                name: global.lang.t('fuzhi'),
            }
        ];

        return (
            <Modal
                onRequestClose={this.hiddenShare}
                transparent={true}
                visible={true}>

                {/*顶部遮罩*/}
                <TouchableOpacity onPress={this.hiddenShare}>
                    <View style={styles.hideView}/>
                </TouchableOpacity>

                {/*标题*/}
                <View style={[styles.titleView,{backgroundColor: "#ECECEE"}]}>
                    {/*<Text style={{fontSize: 16}}>{global.lang.t('choice_platform')}</Text>*/}
                </View>

                {/*分享平台*/}
                <View style={[{backgroundColor: "#ECECEE"}, {flex: 1}, {width: DEVICE_WIDTH}, {alignItems: "center"}]}>
                    <FlatList data={shareList}
                              style={[{backgroundColor: "#ECECEE"}, {width: DEVICE_WIDTH - 40}]}
                              numColumns={5}
                              bounces={false}
                              showsVerticalScrollIndicator={false}
                              ItemSeparatorComponent={this._separator}
                              keyExtractor={(item, index) => index}
                              renderItem={(item) => {
                                  return (
                                      <ShareItem item={item.item}
                                                 itemClick={() => {
                                                     this.hiddenShare()

                                                 }}
                                                 shareTitle={this.props.shareTitle}
                                                 shareText={this.props.shareText}
                                                 shareLink={this.props.shareLink}
                                                 shareImage={this.props.shareImage}
                                                 shareType={this.props.shareType}
                                      />
                                  );
                              }}
                    />
                </View>

                {/*取消分享*/}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.hiddenShare}>
                    <LinearGradient style={styles.closeView}
                                    colors={['#E1BB8D', '#8B6941']}>
                        <Text style={{fontSize: 14,color:"#FFF"}}>{global.lang.t('cancel')}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Modal>
        )
    }
    _separator=()=>{
        return <View style={{height:15}}/>
    }
}
const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        position: "absolute",
        zIndex: 9999,
        alignItems: "center",
    },
    hideView: {
        height: DEVICE_HEIGHT - (DEVICE_WIDTH) / 5 - 140,
        width: DEVICE_WIDTH,
        backgroundColor: "rgba(58,58,58,0.5)"
    },
    titleView: {
        alignItems: "center",
        justifyContent: "center",
        width: DEVICE_WIDTH,
        height: 34,
        backgroundColor: "#eaeff3",
    },
    closeView: {
        height: px2dp(100),
        width: DEVICE_WIDTH,
        alignItems: "center",
        justifyContent: "center",
    },
});