import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, Platform} from 'react-native';
import {connect} from 'react-redux';
import {
    getLoginUser, getUserId, isEmptyObject, isLogin, isStrNull, logMsg, moneyFormat, needLogin,
    showToast, strNotNull, turn2MapMark
} from "../../utils/utils";
import styles from './index.style';
import {Metrics, Images, px2dp} from "../../configs/Theme";
import {getCashQueues, getCashQueuesNumber, postCancelApply, postScanApply} from '../../services/cashTableDao'
import NotData from '../comm/NotData';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {getUnread, initLoginUser, shortUrl} from "../../services/accountDao";
import QRCodeModal from "./QRCodeModal";
import PopAction from "../comm/PopAction";
import LinearGradient from 'react-native-linear-gradient'

@connect(({QueueProcess}) => ({
    ...QueueProcess,
}))
export default class QueueProcess extends Component {


    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: props.params.item.name,
            onRight: () => {
                router.toFeedback(props.params.item.id);
            },
            onRight1: () => {
                if (Platform.OS === 'ios') {
                    this.mapAction && this.mapAction.toggle();
                } else {
                    const {amap_location, amap_navigation_url, amap_poiid, location, name} = props.params.item;
                    if (strNotNull(amap_navigation_url))
                        turn2MapMark(amap_location, amap_navigation_url, amap_poiid, location, name, '')

                }
            }
        })

        this.state = {
            signedList: [],
            applySuccessBlind: ''
        }
    };

    componentDidMount() {
        this.mount = true
    }

    componentWillUnmount() {
        this.mount = false
    }


    topName = () => {
        return (
            <View style={styles.topName_view}>
                <View style={{width: 67}}/>
                <View style={{flex: 1}}/>
                <Text style={[styles.room_waiting, {
                    alignSelf: 'center',
                    maxWidth: 200
                }]}>{global.lang.t('room_waiting')}</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={{flexDirection: 'row-reverse', width: 80}} onPress={() => {
                    this._onRefresh()
                }}>
                    <Text style={[styles.room_waiting, {marginRight: 17}]}>{global.lang.t('refresh')}</Text>
                </TouchableOpacity>
            </View>
        )
    }


    _onRefresh = () => {
        this.listView && this.listView.refresh()
    };

    _renderItem = (item, index) => {
        const {id, small_blind, big_blind, table_numbers, cash_queue_members_count, buy_in, apply_index,apply_status} = item;
        let applyTex = global.lang.t('application_wait')
        if(apply_status === 'pending'){
            applyTex = global.lang.t('rank_pending')
        }
        if(apply_status === 'success'){
            applyTex = global.lang.t('cancel_wait')
        }

        return (
            <View style={styles.item_view}>
                <View style={styles.left_view}>
                    <View style={styles.left_top_view}>
                        <Text style={styles.blind}>{`${small_blind}/${big_blind} NLH`}</Text>
                        <Text style={styles.hkd}>{`${buy_in}`}</Text>
                    </View>
                    <View style={[styles.left_bottom_view, {marginTop: 4}]}>
                        <Text style={styles.table_numbers_text}>{`${global.lang.t('table_number')}`}</Text>
                        <Text style={[styles.table_numbers_text, {
                            marginLeft: 5,
                            fontWeight: 'bold'
                        }]}>{table_numbers}</Text>
                    </View>
                    <View style={[styles.left_bottom_view, {marginTop: 6}]}>
                        <Text style={styles.table_numbers_text}>{`${global.lang.t('waiting_number')}`}</Text>
                        <Text style={[styles.table_numbers_text, {
                            marginLeft: 5,
                            fontWeight: 'bold'
                        }]}>{cash_queue_members_count}</Text>
                    </View>
                </View>
                <View style={styles.right_view}>
                    <View style={styles.right_top_view}>
                        <Text style={styles.ranking}>{global.lang.t('ranking')}</Text>
                        <Text
                            style={[styles.ranking_info, !isStrNull(apply_index) ? styles.ranking_info3 : styles.ranking_info2]}>{apply_index ? apply_index : '--'}
                        </Text>
                    </View>

                    <LinearGradient
                        style={{height: px2dp(54), width: px2dp(210), alignSelf: 'center'}}
                        colors={isStrNull(apply_index) ? ['#E1BB8D', '#8B6941'] : ['#303236', '#303236']}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.right_mid_view, isStrNull(apply_index) ? {} : {
                                backgroundColor: "#303236",
                                borderColor: "#998E72",
                                borderWidth: 1,
                                borderRadius: 4
                            }]}
                            onPress={() => {
                                if (isLogin() && global.loginUser && strNotNull(global.loginUser.mobile)) {
                                    if (apply_status === 'none') {
                                        this.clearSign()
                                        this.signChange(this.state.signedList[index], index)
                                        this.PopAction && this.PopAction.toggle()
                                    } else if(apply_status === 'success') {
                                        this.cancelId = id
                                        this.popCancel && this.popCancel.toggle()
                                    }
                                } else {
                                    router.toBindingMobile()
                                }

                            }}>
                            <Text
                                style={[styles.application_wait, {color: isStrNull(apply_index) ? '#FFFFFF' : '#DAB68A'}]}
                            >{applyTex}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>
                <PopAction
                    key={'cancel'}
                    ref={ref => this.popCancel = ref}>
                    <LinearGradient
                        colors={['#E1BB8D', '#8B6941']}
                        style={{
                        height: px2dp(320), width: '100%',
                        justifyContent: 'space-evenly'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.cancelApply()
                                this.popCancel && this.popCancel.toggle()
                            }}
                            style={{
                                height: px2dp(88), marginHorizontal: px2dp(34),
                                backgroundColor: '#303236', alignItems: 'center', justifyContent: 'center'
                            }}>
                            <Text style={{fontSize: 18, color: '#FFE9AD'}}>{global.lang.t('confirm_cancel')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.popCancel && this.popCancel.toggle()
                            }}
                            style={{
                                height: px2dp(88), marginHorizontal: px2dp(34),
                                borderWidth: px2dp(1), borderColor: '#303236',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                            <Text style={{fontSize: 18, color: '#303236'}}>{global.lang.t('cancel')}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </PopAction>
                <PopAction
                    btnShow={true}
                    ref={ref => this.mapAction = ref}
                    btnArray={this.popActions()}/>
            </View>
        )
    };

    popActions = () => {
        const {name, location, amap_poiid, amap_navigation_url, amap_location} = this.props.params.item;
        let reportList = [{id: 0, name: global.lang.t('Gaode'), type: 'gaode'}, {
            id: 1,
            name: global.lang.t('iphone_map'),
            type: 'pingguo'
        }];
        let resultArray = [];
        reportList.forEach((data, index) => {
            let item = {
                name: data.name, txtStyle: {color: '#4A90E2'}, onPress: () => {
                    if (strNotNull(amap_navigation_url)) {
                        this.mapAction.toggle();
                        turn2MapMark(amap_location, amap_navigation_url, amap_poiid, location, name, data.type)
                    }

                }
            };
            resultArray.push(item);
        });
        resultArray.push({
            name: global.lang.t('cancel'),
            txtStyle: {color: "#AAAAAA"},
            onPress: () => this.mapAction.toggle()
        });

        return resultArray;
    };


    getUnread = () => {
        needLogin(() => {
            getUnread(getUserId())
        })

    }

    clearSign = () => {
        this.state.signedList.forEach(x => {
            x.signed = false
        })
        this.setState({
            signedList: this.state.signedList
        })
    }

    signChange = (item, i) => {
        let changeList = [...this.state.signedList]
        changeList[i].signed = !item.signed
        this.setState({
            signedList: changeList
        })
    }

    toSign = () => {
        const {signedList} = this.state
        let ids = []
        let blind = []
        signedList.forEach((x, i) => {
            if (x.signed && isStrNull(x.applyId)) {
                ids.push(x.id)
                blind.push(x.buy_in)
            }
        })

        this.setState({
            applySuccessBlind: blind.join(',')
        })
        let str = ids.join("|")

        let cash_game_id = this.props.params.item.id
        let access_token = getLoginUser().access_token
        let url = `http://www.baidu.com?token=${access_token}&cash_queue_id=${str}&cash_game_id=${cash_game_id}`
        logMsg('报名', url)
        shortUrl({url}, data => {
            postScanApply({dwz_url: data.short_url}, ret => {
                if (this.mount) {

                    this.QRCodeModel && this.QRCodeModel.toggle()
                    if (ret && ret.code === 0) {
                        this.applySuccess && this.applySuccess.toggle()
                    } else {
                        showToast(global.lang.t('failed_rank'))
                    }

                }

            })
            this.QRCodeModel && this.QRCodeModel.toggle(data.short_url)
        })
    }

    cancelApply = () => {
        let cash_queue_id = this.cancelId
        let cash_game_id = this.props.params.item.id
        let body = {cash_queue_id, cash_game_id}
        postCancelApply(body, ret => {
            showToast(global.lang.t('cancel_success'))
            this.getUnread();
            this._onRefresh()
        })
    }

    render() {
        return (
            <View style={styles.process_view}>
                {this.topName()}
                {this._separator()}
                <UltimateFlatList
                    firstLoader={true}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    separator={this._separator}
                    keyExtractor={(item, index) => `hot_race${index}`}
                    item={this._renderItem}
                    refreshableTitlePull={global.lang.t('pull_refresh')}
                    refreshableTitleRelease={global.lang.t('release_refresh')}
                    dateTitle={global.lang.t('last_refresh')}
                    allLoadedText={''}
                    waitingSpinnerText={global.lang.t('loading')}
                    emptyView={() => <NotData/>}
                />

                <QRCodeModal
                    closeCall={this._onRefresh}
                    ref={ref => this.QRCodeModel = ref}/>

                <PopAction
                    key={'apply'}
                    ref={ref => this.PopAction = ref}>
                    <ChooseType
                        cancel={() => {
                            this.PopAction && this.PopAction.toggle()
                        }}
                        confirm={this.toSign}
                        onChange={this.signChange}
                        signedList={this.state.signedList}/>
                </PopAction>

                <PopAction
                    key={'apply_success'}
                    ref={ref => this.applySuccess = ref}>
                    <TouchableOpacity
                        onPress={() => {
                            this.getUnread()
                            this.applySuccess && this.applySuccess.toggle()
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0,
                            marginBottom: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            width: Metrics.screenWidth,
                            height: Metrics.screenHeight
                        }}>
                        <Text style={{color: '#FFE9AD', fontSize: 18, marginHorizontal: px2dp(34)}}
                        >{`${global.lang.t('rank')}${this.state.applySuccessBlind}`}</Text>
                        <Text style={{color: '#FFE9AD', fontSize: 18, marginHorizontal: px2dp(34)}}
                        >{`${global.lang.t('rank_success')}!`}</Text>

                    </TouchableOpacity>

                </PopAction>
            </View>

        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {item} = this.props.params;
        try {
            initLoginUser(() => {
                getCashQueues({
                    page,
                    page_size: 20,
                    cash_game_id: item.id
                }, data => {
                    logMsg("cash_queues:", data);

                    if (data && data.queues) {
                        let members = data.queues;
                        let signedList = []
                        members.forEach(x => {
                            signedList.push({
                                buy_in: `${x.small_blind}/${x.big_blind} NLH`,
                                signed: !isStrNull(x.apply_index),
                                id: x.id,
                                applyId: x.apply_index
                            })
                        })
                        this.setState({
                            signedList
                        })

                        startFetch(data.queues, 18)
                    } else {
                        abortFetch()
                    }

                }, err => {
                    logMsg("reject:", err)
                    abortFetch()
                })
            })

        } catch (err) {
            abortFetch();
        }
    };

    _separator = () => {
        return (
            <View style={{height: 9, width: Metrics.screenWidth, backgroundColor: "#1A1B1F"}}/>
        )
    }
}


const ChooseType = ({signedList, onChange, cancel, confirm}) => {
    let count = signedList.length - 1
    return <LinearGradient colors={['#E1BB8D', '#8B6941']}>
        <LinearGradient colors={['#E1BB8D', '#8B6941']}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            height: px2dp(100), width: '100%'
                        }}>
            <TouchableOpacity
                onPress={() => {
                    cancel && cancel()
                }}
                style={{height: px2dp(100), width: px2dp(140), alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: '#FFF'}}>{global.lang.t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    cancel && cancel();
                    confirm && confirm()
                }}
                style={{height: px2dp(100), width: px2dp(140), alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: '#FFF'}}>{global.lang.t('determine')}</Text>
            </TouchableOpacity>
        </LinearGradient>

        {signedList && signedList.map((item, i) => <View
            key={`we${i}`}
            style={{width: '100%'}}>
            <TouchableOpacity
                disabled={!isStrNull(item.applyId)}
                onPress={() => onChange && onChange(item, i)}
                style={{height: px2dp(72), flexDirection: 'row', alignItems: 'center'}}>

                <View style={{width: px2dp(194)}}/>
                <Image style={{height: px2dp(44), width: px2dp(44)}}
                       source={item.signed ? Images.selected : Images.select_gary}/>
                <Text style={{
                    fontSize: 16,
                    color:  '#FFF',
                    marginLeft: px2dp(48)
                }}>{item.buy_in}</Text>
            </TouchableOpacity>
            {/*{i < count ?*/}
                {/*<View style={{height: px2dp(2), backgroundColor: '#DCDCDC', marginHorizontal: px2dp(38)}}/> : null}*/}

        </View>)}


        <Text style={{fontSize: 12, color: '#FFF', marginTop: px2dp(30), marginHorizontal: px2dp(34)}}
        >{global.lang.t('rank_prompt')}</Text>
        <View style={{height: px2dp(100)}}/>
    </LinearGradient>
}
