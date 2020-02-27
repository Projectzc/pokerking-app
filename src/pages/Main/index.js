import React, {Component} from 'react';
import {View, DeviceEventEmitter, Platform} from 'react-native';
import {connect} from 'react-redux';
import Base from "../Base";
import NavigationBar from "../comm/NavigationBar";
import ScrollableTab, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import {
    getInfoList,
    postCollect,
    postCancelCollect,
    isCollect,
    initLoginUser,
    getTags, getUnread
} from "../../services/accountDao";
import {getUserId, isEmptyObject, isLogin, logMsg, OnSafePress, shareHost, shareTo, showToast} from "../../utils/utils";
import Hot from "./Hot";
import {Images, px2dp, px2sp} from "../../configs/Theme";
import More from "./More";
import ShareToast from "../comm/ShareToast";


@connect(({Main, Home}) => ({
    ...Main, ...Home
}))
export default class Main extends Component {


    state = {
        activeTab: global.lang.t('hot'),
        index: 0,
        show_collect: false,
        tags: []
    }

    isFirst = true

    componentDidMount() {

        getTags(data => {
            this.setState({
                tags: data.tags
            })
        })
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        if (this.isFirst) {
            this.isFirst = false
            let t2 = setTimeout(() => {
                getInfoList({
                    status: 'hot',
                    page,
                    page_size: 20
                }, data => {
                    logMsg("InfoList:", data)
                    startFetch(data.infos, 20)
                }, err => {
                    logMsg("reject:", err)
                    abortFetch()
                })
            }, 1000)
        } else {
            getInfoList({
                status: 'hot',
                page,
                page_size: 20
            }, data => {
                logMsg("InfoList:", data)
                startFetch(data.infos, 20)
            }, err => {
                logMsg("reject:", err)
                abortFetch()
            })
        }

    }
    onFetchInstant = (page = 1, startFetch, abortFetch) => {
        getInfoList({
            page,
            page_size: 20
        }, data => {
            logMsg("InfoList:", data)
            startFetch(data.infos, 18)
        }, err => {
            logMsg("reject:", err)
            abortFetch()
        })
    }

    onChangeTab = ({i, ref}) => {
        this.setState({
            activeTab: ref.props.tabLabel,
            index: i
        })
    }

    toDetail = (item) => OnSafePress(() => router.toInfoDetail(item.id))

    share = (info) => {
        let param = {
            shareLink: `${shareHost()}/infos/${info.id}`,
            shareTitle: info.title,
            shareText: info.title,
            shareImage: info.image
        };
        shareTo(param)
        logMsg('分享')

    }
    toCollect = (item) => {
        if (isLogin()) {
            const body = {target_id: item.id, target_type: "info"}
            let show_collect = false;
            isCollect(body, data => {
                if (data.is_favorite) {
                    postCancelCollect(body, data => {
                        showToast(global.lang.t("cancelFavorite"))
                        show_collect = true
                    }, err => {
                        showToast(global.lang.t('err_problem'))
                    })
                } else {
                    postCollect(body, data => {
                        showToast(global.lang.t("getFavorite"))
                        show_collect = false
                    }, err => {
                        showToast(global.lang.t('err_problem'))
                    })
                }
            })
            this.setState({
                show_collect
            })
        } else {
            router.toLogin()
        }
    }

    render() {
        const {shareParam} = this.props;

        return (
            <Base>
                <NavigationBar title={this.state.activeTab}
                               index={this.state.index}
                               leftOnPress={()=>{
                                   router.pop()
                               }}/>
                <ScrollableTab
                    onChangeTab={this.onChangeTab}
                    scrollWithoutAnimation={true}
                    tabBarPosition='top'
                    tabBarTextStyle={{fontSize: px2sp(30), fontWeight: 'bold'}}
                    tabBarInactiveTextColor={'#998E72'}
                    tabBarActiveTextColor='#FFE9AD'
                    tabBarUnderlineStyle={{backgroundColor: '#FFE9AD', height: px2dp(2)}}
                    renderTabBar={() => <DefaultTabBar style={{borderWidth: 0}}/>}>
                    <Hot
                        onShare={this.share}
                        onPress={this.toDetail}
                        onCollect={this.toCollect}
                        tabLabel={global.lang.t('hot')}
                        onFetch={this.onFetch}
                        show_collect={this.state.show_collect}/>
                    <Hot
                        onShare={this.share}
                        onPress={this.toDetail}
                        key={'2'}
                        tabLabel={global.lang.t('instants')}
                        onFetch={this.onFetchInstant}/>
                    <More
                        tags={this.state.tags}
                        key={'3'}
                        tabLabel={`${global.lang.t('more')}>`}/>
                </ScrollableTab>

                {!isEmptyObject(shareParam) ? <ShareToast hiddenShareAction={() => {
                    this.props.dispatch({type: 'Home/closeShare'})
                }}

                                                          shareTitle={shareParam.shareTitle}
                                                          shareText={shareParam.shareText}
                                                          shareLink={shareParam.shareLink}
                                                          shareImage={shareParam.shareImage}
                                                          shareType={shareParam.shareType}/> : null}
            </Base>
        )
    }
}
