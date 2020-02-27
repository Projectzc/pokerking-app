import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import NotData from "../comm/NotData";
import {
    alertOrder, isEmptyObject, isLogin, logMsg, shareHost, shareTo, showToast,
    unix_format
} from "../../utils/utils";
import {getInfoList, delCancelNoti, postCancelCollect,postCollect,isCollect} from "../../services/accountDao";
import {Images, Metrics, px2dp, px2sp} from "../../configs/Theme";
import styles from './index.style';
import ImageLoad from "../../components/ImageLoad";
import CollectBtn from "../comm/CollectBtn";
import {SwipeListView} from 'react-native-swipe-list-view';
import ShareToast from "../comm/ShareToast";

@connect(({InstantList}) => ({
    ...InstantList,
}))
export default class InstantList extends Component {


    componentDidMount() {
        this.props.navigation.setParams({
            onLeft: () => {
                this.props.params.refresh()
                router.pop()
            }
        });
    }

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


    render() {
        const {events} = this.props.params;
        if (isEmptyObject(events)) {
            return <NotData/>
        }
        return (
            <View style={{flex: 1, backgroundColor: "#F5F0F0"}}>
                <UltimateFlatList
                style={{paddingTop: 20}}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                separator={this._separator}
                keyExtractor={(item, index) => `instantList${index}`}
                item={this._renderItem}
                pagination={false}
                refreshableTitlePull={global.lang.t('pull_refresh')}
                refreshableTitleRelease={global.lang.t('release_refresh')}
                dateTitle={global.lang.t('last_refresh')}
                allLoadedText={global.lang.t('no_more')}
                waitingSpinnerText={global.lang.t('loading')}
                emptyView={() => <NotData/>}
                />
            </View>
        )
    }

    _separator = () => {
        return (
            <View
                style={{height: 20, width: Metrics.screenWidth, alignSelf: 'center'}}/>
        )
    };

    toCollect = (item) => {
        if (isLogin()) {
            const body = {target_id: item.id, target_type: "info"}
            isCollect(body, data => {
                if (data.is_favorite) {
                    postCancelCollect(body, data => {
                        showToast(global.lang.t("cancelFavorite"))
                    }, err => {
                        showToast(global.lang.t('err_problem'))
                    })
                } else {
                    postCollect(body, data => {
                        showToast(global.lang.t("getFavorite"))
                    }, err => {
                        showToast(global.lang.t('err_problem'))
                    })
                }
            })
        }

    }

    getTime = (created_at, type) => {
        let month = unix_format(created_at,'MM')
        let race_start_time = global.localLanguage === 'en' ? `${global.lang.t(`month${month}`)}` + unix_format(created_at, type) :
            unix_format(created_at, `YYYY${global.lang.t('year')}MM${global.lang.t('month')}DD${global.lang.t('day2')}`);
        return race_start_time;
    }

    _renderItem = (item, index) => {
        return (
            <View style={{flexDirection: 'column', alignItems: 'center',marginTop:20}}>
                <Text style={styles.time_text}>{this.getTime(item.created_at, ` DD,YYYY`)}</Text>
                <TouchableOpacity
                    key={`instants_list${index}`}
                    style={styles.item}>
                    <ImageLoad style={styles.img}
                               source={{uri: item.info.image}}/>
                    <View style={styles.content}>
                        <Text numberOfLines={2} style={styles.title}>{item.info.title}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 5}}>
                            <Text style={[styles.time, {marginLeft: px2dp(14)}]}>{`#TPTS`}</Text>
                            <Text
                                style={[styles.time, {marginLeft: px2dp(28)}]}>{this.getTime(item.info.created_at, " DD,YYYY")}</Text>
                            <View style={{flex: 1}}/>

                            <CollectBtn item={item.info}
                                        collect_gray={true}
                                        type={'info'}
                                        btnStyle={{
                                            height: px2dp(44),
                                            width: px2dp(44),
                                            marginRight: 18,
                                            alignSelf: 'flex-end'
                                        }}
                            />

                            <TouchableOpacity onPress={()=>{
                                this.share(item.info)
                            }}>
                                <Image style={{height: px2dp(32), width: px2dp(40), marginRight: px2dp(20)}}
                                       source={Images.share_gray}/>
                            </TouchableOpacity>

                        </View>

                    </View>

                </TouchableOpacity>
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {events} = this.props.params;
        try {
            startFetch(events, 18)

        } catch (err) {
            abortFetch();
        }
    };
}
