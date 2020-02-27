import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar ,DeviceEventEmitter} from "react-native";
import { connect } from "react-redux";
import styles from "./index.style";
import { Images, px2dp, Styles } from "../../configs/Theme";
import Carousel from "react-native-snap-carousel";
import { Metrics } from "../../configs/Theme";
import RaceModal from "./RaceModal";
import { mainEvents } from "../../services/eventsDao";
import {
  getBg,
  logMsg,
  unix_format,
  getRemainTime,
  isStrNull,
  mul,
  showToast,
  shareHost,
  shareTo,
  isEmptyObject,
  strNotNull,
  turn2MapMark
} from "../../utils/utils";
import LinearGradient from "react-native-linear-gradient";
import ShareToast from "../comm/ShareToast";
import CollectBtn from "../comm/CollectBtn";
import NotData from "../comm/NotData";
import Loading from "../comm/Loading";
import { postHotSwitch } from "../../services/cashTableDao";
import PopAction from "../comm/PopAction";

@connect(({ Races }) => ({
  ...Races
}))
export default class Races extends Component {
  state = {
    list_show: false,
    events: [],
    recent_event: {},
    all_events: [],
    show_race: true
  };

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener("SwitchTab", data => {
      if (data === "race") {
        this.refresh();
      }
    });

    this.refresh();
    // postHotSwitch(data => {
    //     logMsg("房间开关", data)
    //     this.setState({
    //         show_race: data.data.hot_switch
    //     })
    // }, err => {
    //
    // })
  }

  refresh = () => {
    mainEvents(data => {
      logMsg("主赛", data);
      let all = [];
      all.push(data.recent_event);
      data.events.map(item => {
        if (item.id !== data.recent_event.id) {
          all.push(item);
        }
      });
      this.setState({
        events: data.events,
        recent_event: data.recent_event,
        all_events: all
      });
    });
  };

  change_recent_event = recent_event => {
    const { all_events } = this.state;

    all_events.forEach((item, index) => {
      if (item.id === recent_event.id) {
        this._carousel && this._carousel.snapToItem(index);
      }
    });
    this.setState({
      recent_event: recent_event
    });
  };

  change_list_show = () => {
    this.setState({
      list_show: !this.state.list_show
    });
  };

  topBar = recent_event => {
    const { name } = recent_event;
    return (
      <LinearGradient colors={["#E1BB8D", "#8B6941"]} style={styles.navTop}>
        <StatusBar barStyle={"light-content"} />
        <View onPress={() => {}} style={styles.left2}>
          {/*<Image*/}
          {/*style={{height: px2dp(48), width: px2dp(120)}}*/}
          {/*source={Images.puke_icon}*/}
          {/*/>*/}
        </View>
        <TouchableOpacity
          style={styles.navTitle}
          onPress={() => {
            this.raceModal && this.raceModal.toggle();
            this.change_list_show();
          }}
        >
          <Text
            style={{ fontSize: 17, color: "#FFF", maxWidth: "90%" }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Image
            style={{ width: 10, height: 6, marginLeft: 10 }}
            source={this.state.list_show ? Images.top : Images.bottom}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            router.toSetting();
          }}
          style={styles.right2}
        >
          <Image
            style={{ height: px2dp(52), width: px2dp(52) }}
            source={Images.setting}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  timeSelect = events => {
    const { begin_time, end_time } = events;
    return (
      <View style={styles.time_view}>
        <View style={{ width: 17 }} />
        {isStrNull(begin_time) || isStrNull(end_time) ? null : (
          <Image
            style={{ height: px2dp(36), width: px2dp(36), marginRight: 4 }}
            source={Images.date}
          />
        )}

        {isStrNull(begin_time) || isStrNull(end_time) ? null : (
          <Text numberOfLines={1} style={styles.date_text}>
            {`${unix_format(begin_time, "YYYY/MM/DD")}-${unix_format(
              end_time,
              "YYYY/MM/DD"
            )}`}
          </Text>
        )}
        <View style={{ width: 17 }} />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    return (
      <Card
        item={item}
        recent_event={this.state.recent_event}
        snapToNext={this.snapToNext}
        snapToPrev={this.snapToPrev}
      />
    );
  };

  debouncePress = id => {
    const clickTime = Date.now();
    if (
      !this.lastClickTime ||
      Math.abs(this.lastClickTime - clickTime) > 1000
    ) {
      this.lastClickTime = clickTime;
      router.toRaceMessage(id);
    }
  };

  snapToNext = () => {
    this._carousel && this._carousel.snapToNext();
  };

  snapToPrev = () => {
    this._carousel && this._carousel.snapToPrev();
  };

  render() {
    const { shareParam } = this.props;
    const { events, recent_event, all_events } = this.state;
    let selectEventHasMap =
      strNotNull(recent_event.amap_location) ||
      strNotNull(recent_event.amap_navigation_url);
    return (
      <View style={styles.race_view}>
        {this.topBar(recent_event)}
        {this.timeSelect(recent_event)}
        {all_events && all_events.length > 0 ? (
          <View style={styles.carousel_view}>
            <Carousel
              loop
              layout={"default"}
              removeClippedSubviews={false}
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.all_events}
              renderItem={this._renderItem}
              sliderWidth={Metrics.screenWidth}
              itemWidth={Metrics.screenWidth}
              onSnapToItem={index => {
                let selectedEvent = all_events[index];
                logMsg("滚动到了", selectedEvent);
                this.setState({
                  recent_event: selectedEvent
                });
              }}
            />
            <View
              style={{
                backgroundColor: "#736C5B",
                width: Metrics.screenWidth - 34,
                height: 1,
                borderRadius: 2,
                marginTop: 16
              }}
            />
          </View>
        ) : (
          <View style={[styles.carousel_view, { height: px2dp(302) }]} />
        )}

        <View
          style={{
            width: Metrics.screenWidth - 34,
            alignSelf: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          {this._item(
            styles.item_view,
            selectEventHasMap ? Images.location : Images.location_gary,
            styles.img_dy,
            global.lang.t("race_location"),
            () => {
              selectEventHasMap && this.mapAction && this.mapAction.toggle();
            }
          )}

          {this._item(
            styles.item_view,
            Images.event_intro,
            styles.img_dy1,
            `${global.lang.t("race_intro")}`,
            () => {
              this.debouncePress(recent_event.id);
            }
          )}

          {this.state.show_race
            ? this._item(
                styles.item_view,
                Images.event_dynamics,
                styles.img_dy2,
                global.lang.t("race_schedule"),
                () => {
                  router.toRaceSchedule(recent_event);
                }
              )
            : null}
          {this._item(
            styles.item_view,
            Images.news_info,
            styles.img_dy3,
            global.lang.t("race_news"),
            () => {
              router.toRaceNew(recent_event.id);
            }
          )}
          {this._item(
            styles.item_view_last,
            Images.live,
            styles.img_dy4,
            global.lang.t("race_live"),
            () => {
              let url = recent_event.live_url;
              if (strNotNull(url)) {
                router.toWebViewPage(this.props, url);
              } else {
                showToast(global.lang.t("not_live"));
              }
            }
          )}
        </View>

        <RaceModal
          ref={ref => (this.raceModal = ref)}
          recent_event={recent_event}
          events={events}
          change_recent_event={this.change_recent_event}
          change_list_show={this.change_list_show}
        />

        {!isEmptyObject(shareParam) ? (
          <ShareToast
            hiddenShareAction={() => {
              this.props.dispatch({ type: "Home/closeShare" });
            }}
            shareTitle={shareParam.shareTitle}
            shareText={shareParam.shareText}
            shareLink={shareParam.shareLink}
            shareImage={shareParam.shareImage}
            shareType={shareParam.shareType}
          />
        ) : null}

        <PopAction
          btnShow={true}
          ref={ref => (this.mapAction = ref)}
          btnArray={this.popActions()}
        />
      </View>
    );
  }

  popActions = () => {
    const {
      name,
      location,
      amap_poiid,
      amap_navigation_url,
      amap_location
    } = this.state.recent_event;
    let reportList = [
      { id: 0, name: global.lang.t("Gaode"), type: "gaode" },
      {
        id: 1,
        name: global.lang.t("iphone_map"),
        type: "pingguo"
      }
    ];
    let resultArray = [];
    reportList.forEach((data, index) => {
      let item = {
        name: data.name,
        txtStyle: { color: "#4A90E2" },
        onPress: () => {
          if (strNotNull(amap_navigation_url)) {
            this.mapAction.toggle();
            turn2MapMark(
              amap_location,
              amap_navigation_url,
              amap_poiid,
              location,
              name,
              data.type
            );
          }
        }
      };
      resultArray.push(item);
    });
    resultArray.push({
      name: global.lang.t("cancel"),
      txtStyle: { color: "#AAAAAA" },
      onPress: () => this.mapAction.toggle()
    });

    return resultArray;
  };

  _item = (itemStyle, img, imgStyle, title, onPress) => {
    const { profile } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} style={itemStyle} onPress={onPress}>
        <View style={styles.item_view2}>
          <Image style={imgStyle} source={img} />
        </View>

        <Text style={[styles.personalText]}>{title}</Text>
      </TouchableOpacity>
    );
  };
}

class Card extends Component {
  state = {
    countTime: "",
    index: 0
  };

  counting = (startTime, endTime) => {
    let index = 0;
    this.intervalTimer = setInterval(() => {
      // 得到剩余时间
      let remainTime = getRemainTime(startTime);

      // 倒计时
      if (remainTime.total > 0) {
        let countTime = `${remainTime.days}${global.lang.t("day")}${
          remainTime.hours
        }${global.lang.t("time")}${remainTime.minutes}${global.lang.t(
          "minute"
        )}${remainTime.seconds}${global.lang.t("second")}`;
        this.setState({
          countTime
        });
        //倒计时结束
      } else if (remainTime.total <= 0) {
        clearInterval(this.intervalTimer);
        let toEndTime = getRemainTime(endTime);
        let raceStatus = global.lang.t("processing");
        if (toEndTime.total < 0) {
          raceStatus = "----";
          index = -1;
        }
        this.setState({
          countTime: raceStatus,
          index: index
        });
      }
    }, 1000);
  };

  debouncePress = id => {
    const clickTime = Date.now();
    if (
      !this.lastClickTime ||
      Math.abs(this.lastClickTime - clickTime) > 1000
    ) {
      this.lastClickTime = clickTime;
      router.toRaceMessage(id);
    }
  };

  share = event => {
    let param = {
      shareLink: `${shareHost()}/infos/${event.id}`,
      shareTitle: event.name,
      shareText: event.name,
      shareImage: event.logo
    };
    shareTo(param);
    logMsg("分享");
  };

  getImg = img => {
    if (strNotNull(img)) {
      return { uri: img };
    } else {
      return Images.empty_bg;
    }
  };

  render() {
    const { description } = this.props.recent_event;
    const { begin_time, end_time, id, logo, name, location } = this.props.item;
    let month = unix_format(begin_time, `MM`);
    const { snapToPrev, snapToNext } = this.props;
    let img = this.getImg(logo);
    let race_start_time =
      global.localLanguage === "en"
        ? `${global.lang.t(`month${month}`)}` +
          unix_format(begin_time, `DD,YYYY`)
        : unix_format(
            begin_time,
            `YYYY${global.lang.t("year")}MM${global.lang.t(
              "month"
            )}DD${global.lang.t("day2")}`
          );

    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => snapToPrev && snapToPrev()}
          style={{
            height: px2dp(302),
            width: px2dp(60),
            justifyContent: "center"
          }}
        >
          <Image
            style={{ height: 17, width: 11, marginLeft: px2dp(24) }}
            source={Images.race_left}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.debouncePress(id);
          }}
        >
          <Image style={styles.slide_img} source={img} />
          {this.state.index === -1 ? (
            <View style={styles.slide_top_view_1}>
              <Text style={styles.race_time_txt_1}>
                {global.lang.t("race_over")}
              </Text>
              <Text style={styles.race_time_txt2_1}>
                {this.state.countTime}
              </Text>
            </View>
          ) : (
            <LinearGradient
              colors={["#E1BB8D", "#8B6941"]}
              style={styles.slide_top_view}
            >
              <Text style={styles.race_time_txt}>
                {global.lang.t("race_time")}
              </Text>
              <Text style={styles.race_time_txt2}>{this.state.countTime}</Text>
            </LinearGradient>
          )}

          <Text style={styles.card_name}>{name}</Text>
          <View style={styles.card_bottom_view}>
            <Text style={styles.card_location}>{location}</Text>
            <View style={{ flex: 1 }} />
            <CollectBtn
              item={this.props.item}
              type={"main_event"}
              btnStyle={styles.collect_img}
            />
            <TouchableOpacity
              onPress={() => {
                this.share(this.props.item);
              }}
            >
              <Image style={styles.share_img} source={Images.share} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => snapToNext && snapToNext()}
          style={{
            height: px2dp(302),
            width: px2dp(60),
            flexDirection: "row-reverse",
            alignItems: "center"
          }}
        >
          <Image
            style={{
              height: px2dp(34),
              width: px2dp(20),
              marginRight: px2dp(24)
            }}
            source={Images.race_right}
          />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    const { begin_time, end_time } = this.props.item;
    this.counting(begin_time * 1000, end_time * 1000);
  }

  componentWillUnmount() {
    this.intervalTimer && clearInterval(this.intervalTimer);
    this.subscription.remove()
  }
}
