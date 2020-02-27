/**
 * Created by lorne on 2017/6/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet, View, WebView, InteractionManager,
    Text, TouchableOpacity, ActivityIndicator, Image,
    Linking, Clipboard, Modal, PanResponder, Animated, ToastAndroid
} from 'react-native';
import {Colors, Images,Metrics} from '../configs/Theme';

export default class WebViewPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bottomInfoBarBottomValue: new Animated.Value(0),
            //toolbarTopValue: new Animated.Value(0)
        };

        this.bottomIconSize = [25, 25, 32];
        this.bottomIconNames = ['back',
            'forward',
            'refresh',
            '浏览器'
        ];

        this.moveYThreshold = 5;
        this.animationFlag = true;
        this.count = 0;

        props.navigation.setParams({
            title: this.props.params.name
        })
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let y = gestureState.dy;
                if (y > this.moveYThreshold && this.animationFlag) { //drag down
                    if (this.state.bottomInfoBarBottomValue === 0) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: 0,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                }
                if (y < -this.moveYThreshold && this.animationFlag) {  //drag up
                    if (this.state.bottomInfoBarBottomValue === -50) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: -50,
                        duration: 300
                    }).start(() => this.anilag = true);

                }
            }
        });
    }

    render() {
        const {url} = this.props.params;
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ECECEE'
            }}>
                <View
                    style={styles.contentContainer}
                    {...this._panResponder.panHandlers}>
                    <WebView
                        ref={(ref) => {
                            this.webView = ref
                        }}
                        style={styles.webView}
                        scalesPageToFit
                        source={{uri: url}}
                        renderLoading={this._renderLoading}
                        renderError={this._renderError}
                        onLoadEnd={() => {
                            if (this.count === 0) {
                                ++this.count
                                this.webView && this.webView.reload()
                            }

                        }}
                        startInLoadingState={true}
                        geolocationEnabled
                    />
                </View>


                {this.bottomBarView()}


            </View>
        );
    }



    _renderLoading = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={Colors._CCC}/>

            </View>
        );
    }

    _renderError = (e) => {
        console.log(e)
        if (e === 'WebKitErrorDomain') {
            return
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.webView.reload();
                }}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> {global.lang.t('refresh_again')}～</Text>
            </TouchableOpacity>
        );
    }

    bottomBarView = () => {
        return (<Animated.View
            style={[styles.bottomInfoBar, {bottom: this.state.bottomInfoBarBottomValue}]}>
            <TouchableOpacity
                onPress={() => this.webView.goBack()}
                style={styles.btn}>
                <Image style={styles.imgBk}
                       source={Images.web_left}/>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.webView.goForward()}
                style={styles.btn}>
                <Image style={styles.imgBk}
                       source={Images.web_right}/>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.webView.reload()}
                style={styles.btn}>
                <Image style={styles.imgRef}
                       source={Images.web_refresh}/>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    Linking.canOpenURL(this.props.params.url).then(supported => {
                        if (supported) {
                            Linking.openURL(this.props.params.url);
                        }
                    });
                }}
                style={styles.btn}>
                <Image style={styles.imgRef}
                       source={Images.web_page}/>

            </TouchableOpacity>


        </Animated.View>)
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1
    },
    toolbar: {
        position: 'absolute',
        width: Metrics.screenWidth,
        marginTop: Metrics.toolbar.paddingTop,
        zIndex: 1
    },
    webView: {
        flex: 1
    },
    bottomInfoBar: {
        position: 'absolute',
        height: 50,
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around'
    },
    moreContentContainerBackground: {
        position: 'absolute',
        top: 0,
        width: Metrics.screenWidth,
        height: Metrics.screenHeight
    },
    moreContentContainer: {
        position: 'absolute',
        right: 5,
        top: Metrics.toolbar.height,
        width: 150,
        height: 160,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    modalItem: {
        width: 150,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgBk: {
        height: 26,
        width: 13
    },
    imgRef: {
        height: 24,
        width: 24
    }
});
