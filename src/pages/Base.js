/**
 *作者：lorne
 *时间：2019/6/26
 *功能：
 */

import React, {Component} from 'react';
import {View, ScrollView, Text, RefreshControl, StyleSheet, StatusBar} from 'react-native';
import Loading from './comm/Loading'
import {logMsg} from "../utils/utils";
import PropTypes from 'prop-types';
import {NavBar} from "./index";
import _ from 'lodash';
import NoNet from "./comm/NoNet";


const StatusBarStyle = {
    default: 'default',
    lightcontent: 'light-content'
};


export default class Base extends Component {

    static propTypes = {
        showNav: PropTypes.bool,//显示顶部导航栏
        statusBarStyle: PropTypes.oneOf([StatusBarStyle.default, StatusBarStyle.lightcontent]),
        scrollable: PropTypes.bool,//是ScrollView或者View
        hudView: PropTypes.any,//插入如错误页或者其他占位页面,可以传任何参数注意使用方法

    };
    static defaultProps = {
        showNav: false,
        statusBarStyle: StatusBarStyle.lightcontent,
        scrollable: false,
        hudView: null

    };

    state = {
        isRefreshing: false
    }

    open = () => {
        this.loading && this.loading.open()
    }

    close = () => {
        this.loading && this.loading.close()
    }

    _renderContent() {
        const {hudView, children} = this.props
        if (_.isEmpty(hudView)) {
            return children
        }
        if (_.isString(hudView)) {
            switch (hudView) {
                case 'NoNet':
                    return <NoNet/>
                default:
                    return <NoNet/>
            }
        }

        return hudView
    }

    render() {
        const {
            style,
            scrollable,
            statusBarStyle,
            showNav,
        } = this.props;
        if (scrollable) {
            return <View style={[{flex: 1, backgroundColor: '#1A1B1F'}, style]}>
                {showNav ? <NavBar {...this.props}/> : null}
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    refreshControl={this.renderRefreshControl()}>
                    <StatusBar barStyle={statusBarStyle}/>
                    {this._renderContent()}

                    <Loading
                        ref={ref => this.loading = ref}/>
                </ScrollView>

            </View>
        }
        return (
            <View style={[{flex: 1, backgroundColor: '#1A1B1F'}, style]}>
                <StatusBar barStyle={statusBarStyle}/>
                {showNav ? <NavBar {...this.props}/> : null}

                {this._renderContent()}

                <Loading
                    ref={ref => this.loading = ref}/>

            </View>
        );
    }

    renderRefreshControl = () => {
        if (this.props.onRefresh)
            return (
                <RefreshControl
                    onRefresh={() => {
                        logMsg('下拉刷新')
                        this.props.onRefresh && this.props.onRefresh()
                        this.setState({
                            isRefreshing: true
                        })
                        setTimeout(() => {
                            this.setState({
                                isRefreshing: false
                            })

                        }, 1000)


                    }}
                    refreshing={this.state.isRefreshing}
                    colors={['dimgray', 'tomato', 'limegreen']}
                    progressBackgroundColor={'white'}
                    tintColor={'lightgray'}
                />
            )
        return null
    }
}

const styles = StyleSheet.create(({
    flex_center: {
        justifyContent: 'center',
        alignItems: 'center'
    }

}))


