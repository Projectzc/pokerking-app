import React, {Component} from 'react';
import {View, Text, DeviceEventEmitter, TouchableOpacity, Image, ScrollView, RefreshControl, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {isEmptyObject, logMsg} from "../../utils/utils";
import MainBanner from './MainBanner';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Images, Metrics, px2dp, Styles} from "../../configs/Theme";
import HotItem from "./HotItem";
import {getHomeBanners, getInfoList, initLoginUser} from '../../services/accountDao'
import codePush from "react-native-code-push";
import ShareToast from "../comm/ShareToast";
import NotData from "../comm/NotData";
import ControlPanel from "./Drawer";
import Drawer from 'react-native-drawer'
import TopBar from "../comm/TopBar";
import CountTime from "./CountTime";
import QueueJoin from "./QueueJoin";
import {mainEvents} from "../../services/eventsDao";
import {getCashGames} from '../../services/cashTableDao'

const WIDTH = Metrics.screenWidth;
const HEIGHT = Metrics.screenHeight;

const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

@connect(({Home,MinePage}) => ({
    ...Home,...MinePage
}))
@codePush
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文'],
            home_banners: [],
            info_list: [],
            isRefreshing: false,
            recent_event: {},
            games: []
        };

        this.count = 0
    };

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.getEventGame()
            this.listView && this.listView.refresh();
            this.setState({isRefreshing: false});
        }, 1000)
    };

    getEventGame = () => {
        mainEvents(data => {
            this.setState({
                recent_event: data.recent_event,
            })
        })
        getCashGames({page: 1, page_size: 20}, data => {
            if (data && data.data) {
                this.setState({
                    games: data.data.items
                })
            }
        })
    }

    componentDidMount() {
        this.getEventGame()
        codePush.disallowRestart()
        codePush.sync({
            updateDialog: false,
            installMode: codePush.InstallMode.ON_NEXT_RESUME
        })
        this.subscription =DeviceEventEmitter.addListener('SwitchTab',data=>{
            if(data === 'news'){
            this.getEventGame()
            this.listView && this.listView.refresh();
            }
        })
    };

    componentWillUnmount(){
        this.subscription.remove()
    }

    onPickerSelect = (index) => {
        this.setState({
            selectedItem: index,
        })
    };


    header = () => {
        return (
            <View>
                <View style={styles.header_view}>
                    <Text style={styles.hot_race_txt}>{global.lang.t('hot_race')}</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity onPress={() => {
                        router.toHotRaceList();
                    }}
                                      style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.more_txt}>{global.lang.t('more')}></Text>

                    </TouchableOpacity>
                </View>
                {this._separator()}
            </View>


        )
    };
    _renderItem = (item, index) => {
        return (
            <HotItem item={item} type={'hot'}/>
        )
    };

    _separator = () => {
        return (
            <View
                style={{height: 1, backgroundColor: "#998E72", width: Metrics.screenWidth - 34, alignSelf: 'center'}}/>
        )
    }

    _drawerClose = () => {
        this.drawer && this.drawer.close()
    }

    render() {
       
        return (
            <Drawer
                tapToClose
                ref={ref => this.drawer = ref}
                type="static"
                content={<ControlPanel
                    drawClose={this._drawerClose}
                    profile={this.props.profile}/>}
                openDrawerOffset={185}
                tweenHandler={Drawer.tweenPresets.parallax}>
                <ScrollView
                    style={styles.home_view}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />}>
                    <TopBar left_img={Images.homepage_side}
                            showLeftIcon={true}
                            left_btn={() => {
                                this.drawer && this.drawer.toggle()
                            }}
                            showSearch={true}
                            narTitle={global.lang.t('app_name')}
                            right_img={Images.setting}/>
                    <MainBanner home_banners={this.state.home_banners}/>
                    <View style={styles.active_type_view}>

                        <Text style={{color: '#E0BA8C', fontSize: 15, marginBottom: px2dp(12)}}>UPCOMING EVENT</Text>
                        {isEmptyObject(this.state.recent_event) ? null :
                            <CountTime recentEvent={this.state.recent_event}/>}

                    </View>

                    <UltimateFlatList
                        header={this.header}
                        ref={(ref) => this.listView = ref}
                        onFetch={this.onFetch}
                        separator={this._separator}
                        keyExtractor={(item, index) => `hot_race${index}`}
                        item={this._renderItem}
                        refreshableTitlePull={global.lang.t('pull_refresh')}
                        refreshableTitleRelease={global.lang.t('release_refresh')}
                        dateTitle={global.lang.t('last_refresh')}
                        allLoadedText={global.lang.t('no_more')}
                        waitingSpinnerText={global.lang.t('loading')}
                        pagination={false}
                        emptyView={() => <NotData/>}
                    />

                    <View style={[styles.active_type_view, {marginBottom: px2dp(116)}]}>

                        <Text style={{color: '#E0BA8C', fontSize: 15, marginBottom: px2dp(12)}}>JOIN OUR WAITING
                            LIST</Text>
                        <QueueJoin games={this.state.games}/>
                    </View>

                </ScrollView>


            </Drawer>
        )
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            initLoginUser(() => {
                getHomeBanners(data => {
                    this.setState({
                        home_banners: data.banners
                    })
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

                });
            })

        } catch (err) {
            abortFetch();
        }
    };
}
