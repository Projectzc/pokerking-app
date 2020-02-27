import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList, Linking} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Colors, Images, Metrics, px2dp, px2sp, wh} from "../../configs/Theme";
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {isEmptyObject, logMsg, utcDate, moneyFormat, showToast, getRemainTime, alertOrder} from "../../utils/utils";
import moment from 'moment';
import {getSchedulesDates, getSchedulesEvents} from '../../services/raceDao'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import NotData from "../comm/NotData";

@connect(({RaceSchedule}) => ({
    ...RaceSchedule,
}))
export default class RaceSchedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            schedules_dates: [],
            schedules_events: []
        }

        let title = props.params.event && props.params.event.name
        props.navigation.setParams({
            title: title ? title : global.leng.t('race_date')
        })
    };


    componentDidMount() {
        getSchedulesDates({event_id: this.props.params.event.id}, data => {
            let dates = [];
            data.dates.map((item, index) => {
                dates.push({id: index, date: item, isSelect: index === 0})
            });
            logMsg("schedules_dates", dates);
            this.setState({
                schedules_dates: dates
            })
            this.ultRefresh()
        }, err => {
            logMsg("schedules_dates_err", err)
        })
    }


    ultRefresh = () => {
        setTimeout(() => {
            this.listView && this.listView.refresh()
        }, 500)
    }

    carousel_Item = ({item, index}) => {
        const {schedules_dates} = this.state;
        let week = moment(item.date).format('E');
        let day = moment(item.date).format('MM/DD');
        let dayTxtStyle = item.isSelect ? styles.day_txt_light : styles.day_txt
        let weekTxtStyle = item.isSelect ? styles.week_txt_light : styles.week_txt
        return (
            <TouchableOpacity style={styles.item_view}
                              onPress={() => {
                                  schedules_dates.forEach((x) => {
                                      x.isSelect = item.id === x.id
                                  });
                                  this.setState({
                                      schedules_dates: [...schedules_dates]
                                  });
                                  this.ultRefresh()
                              }}>
                <Text style={dayTxtStyle}>{day}</Text>
                <Text style={weekTxtStyle}>{global.lang.t(`week${week}`)}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const {schedules_dates} = this.state;
        if (isEmptyObject(schedules_dates)) {
            return <NotData backgroundColor={'#1A1B1F'}/>
        }
        return (
            <ScrollView style={styles.schedule_view}>
                <View style={styles.carousels_view}>
                    <FlatList
                        keyExtractor={(item, index) => `date_${index}`}
                        horizontal
                        data={schedules_dates}
                        renderItem={this.carousel_Item}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{backgroundColor: '#736C5B', height: px2dp(2),marginBottom:px2dp(12)}}/>

                <UltimateFlatList
                    firstLoader={false}
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
                    emptyView={() => <NotData backgroundColor={'#1A1B1F'}/>}
                />

            </ScrollView>
        )
    }

    _renderItem = (item, index) => {
        const {schedules_events} = this.state;
        const {name, event_type, event_num, buy_in, entries, starting_stack, schedule_pdf, begin_time, reg_open, reg_close} = item;
        return (
            <View>
                <TouchableOpacity style={styles.item_view2}
                                  activeOpacity={1}
                                  onPress={() => {
                                      schedules_events.forEach((x) => {
                                          if (x.id === item.id) {
                                              x.isSelect = !x.isSelect
                                          }
                                      });
                                      this.setState({
                                          schedules_events: [...schedules_events]
                                      });
                                  }}>
                    <Text style={{color: Colors._FFE, fontSize: px2sp(32), marginBottom: px2dp(20)}}>{name}</Text>
                    <View style={{flexDirection: 'row', marginBottom: px2dp(32)}}>
                        <View style={{width: px2dp(250)}}>
                            <Text
                                style={{color: Colors._FFE, fontSize: px2sp(24)}}>{utcDate(begin_time, 'HH:mm')}</Text>
                        </View>
                        <View style={{height: px2dp(62), width: px2dp(2), backgroundColor: Colors._FFE}}/>
                        <View style={{flexDirection: 'row', flex: 1, paddingLeft: px2dp(32)}}>
                            <Text style={{fontSize: px2sp(24), color: Colors._FFE}}
                                  numberOfLines={1}>{global.lang.t('race_price')}</Text>
                            <View style={{flex: 1}}/>
                            <View style={{flexWrap: 'wrap-reverse'}}>
                                <Text style={{fontSize: px2sp(24), color: Colors._FFE}}
                                      numberOfLines={1}>{buy_in}</Text>
                                <View style={{flex: 1}}/>
                                <Image style={{...wh(30, 14)}}
                                       source={item.isSelect ? Images.top : Images.bottom}/>
                            </View>

                        </View>


                    </View>
                </TouchableOpacity>
                {item.isSelect ? <SelectPart item={item} event={this.props.params.event}/> : null}
            </View>

        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {schedules_dates} = this.state;
        if (isEmptyObject(schedules_dates)) {
            return <NotData/>
        }
        try {
            schedules_dates.forEach((item) => {
                if (item.isSelect) {
                    getSchedulesEvents({
                        event_id: this.props.params.event.id,
                        date: moment(item.date).format('YYYY-MM-DD')
                    }, data => {
                        logMsg("SchedulesEvents", data);
                        let events = data.schedules;
                        events.map((event) => {
                            event.isSelect = false
                        });
                        this.setState({
                            schedules_events: events
                        })
                        startFetch(events, 18)
                    })
                }
            });
        } catch (err) {
            abortFetch();
        }
    };

    _separator = () => {
        return (
            <View
                style={{height: px2dp(1), backgroundColor: Colors._303, width: Metrics.screenWidth}}/>
        )
    }
}

class SelectPart extends Component {
    state = {
        countTime: ''
    }

    counting = (startTime, endTime) => {
        this.intervalTimer = setInterval(() => {
            // 得到剩余时间
            let remainTime = getRemainTime(startTime)

            // 倒计时
            if (remainTime.total > 0) {
                let countTime = `${remainTime.days}${global.lang.t('day')}${remainTime.hours}${global.lang.t('time')}${remainTime.minutes}${global.lang.t('minute')}${remainTime.seconds}${global.lang.t('second')}`
                this.setState({
                    countTime
                })
                //倒计时结束
            } else if (remainTime.total <= 0) {
                clearInterval(this.intervalTimer);
                let toEndTime = getRemainTime(endTime)
                let raceStatus = global.lang.t('processing')
                if (toEndTime.total < 0) {
                    raceStatus = global.lang.t('over')
                }
                this.setState({
                    countTime: raceStatus
                })
            }
        }, 500)
    }

    render() {
        const {name, event_type, event_num, buy_in, entries, starting_stack, schedule_pdf, begin_time, reg_open, reg_close} = this.props.item;
        const {id, description} = this.props.event;
        return (
            <View style={styles.selected_view}>
                <View style={{flexDirection: 'row', paddingLeft: px2dp(18),marginBottom:px2dp(24),paddingRight:px2dp(18)}}>
                    <View style={{width: px2dp(250), justifyContent: 'space-around', paddingRight: px2dp(18)}}>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("start_registration")}</Text>
                            <Text style={styles.top_txt1}>{utcDate(reg_open, 'HH:mm')}</Text>
                        </View>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("end_registration")}</Text>
                            <Text style={styles.top_txt1}>{utcDate(reg_close, 'HH:mm')}</Text>
                        </View>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("starting_chip")}</Text>
                            <Text style={styles.top_txt1}>{moneyFormat(starting_stack)}</Text>
                        </View>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("type")}</Text>
                            <Text style={styles.top_txt1}>{event_type}</Text>
                        </View>
                    </View>
                    <View style={{height: px2dp(164), width: px2dp(2), backgroundColor: Colors._FFE}}/>
                    <View style={{justifyContent: 'space-around', paddingLeft: px2dp(18),flex:1}}>
                        <View style={[styles.cloumn_view]}>
                            <Text style={styles.top_txt1}>{global.lang.t("end_distance")}</Text>
                            <View style={{flex:1}}/>
                            <Text style={styles.top_txt1}>{this.state.countTime}</Text>
                        </View>
                        <View style={[styles.cloumn_view]}>
                            <Text style={[styles.top_txt1, {marginRight: 8}]}>{global.lang.t("race_people")}</Text>
                            <Text style={{color: "#888888", fontSize: 14}}>{entries}</Text>
                        </View>
                    </View>


                </View>
                <View style={{backgroundColor: '#736C5B', height: px2dp(2)}}/>

                <View style={{height: px2dp(160), width: '100%', paddingLeft: px2dp(18), paddingTop: px2dp(16)}}>
                    <Text style={styles.top_txt1}>{global.lang.t('remarks')}：</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: px2dp(30)
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                router.toStructure(schedule_pdf)
                            }}
                            style={styles.btnRemark}>
                            <Text style={styles.top_txt1}>{global.lang.t('structure')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                router.toRaceMessage(id)
                            }}
                            style={styles.btnRemark}>
                            <Text style={styles.top_txt1}>{global.lang.t('enter_race')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnRemark}>
                            <Text style={styles.top_txt1}
                                  onPress={() => {

                                      let s = utcDate(begin_time, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                                      let eventConfig = {
                                          title: name,
                                          startDate: s,
                                          endDate: s,
                                          allDay: true
                                      }
                                      AddCalendarEvent.presentEventCreatingDialog(eventConfig)
                                          .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
                                              if (eventInfo.action === 'SAVED') {
                                                  showToast(global.lang.t('add_schedule'))
                                              }
                                              console.log(JSON.stringify(eventInfo));
                                          })
                                          .catch((error: string) => {
                                              // handle error such as when user rejected permissions
                                              console.warn(error);
                                              alertOrder(global.lang.t('add_calendar_alert'), () => {
                                                  Linking.openURL('app-settings:')
                                                      .catch((err) => console.log('error', err));
                                              });

                                              // alert(JSON.stringify(error))
                                          });
                                  }}>{global.lang.t('add_race')}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }

    componentDidMount() {
        const {reg_open, reg_close} = this.props.item;
        this.counting(reg_open * 1000, reg_close * 1000)
    }

    componentWillUnmount() {
        this.intervalTimer && clearInterval(this.intervalTimer);
    }
}
