import React, { Component } from "react";
import { connect } from "react-redux";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import ShareToast from "./comm/ShareToast";
import { isEmptyObject } from "../utils/utils";
import TabBarItem from "./navigation/TabBarItem";
import LinearGradient from "react-native-linear-gradient";
import { Images, px2dp, px2sp } from "../configs/Theme";

@connect(({ Home }) => ({
  ...Home
}))
class TabBar extends Component {
  render() {
    const { shareParam } = this.props;
    const {
      navigation: {
        state: { routes, index }
      },
      inactiveTintColor,
      activeTintColor,
      jumpTo
    } = this.props;
    return (
      <SafeAreaView style={{ backgroundColor: "#8B6941" }}>
        <LinearGradient
          colors={["#E1BB8D", "#8B6941"]}
          style={{ height: px2dp(100), flexDirection: "row" }}
        >
          {routes.map((item, i) => {
            let focused = index === i;

            let txtColor = focused ? activeTintColor : inactiveTintColor;
            return (
              <TouchableOpacity
                onPress={() => {
                  jumpTo(item.key);
                  DeviceEventEmitter.emit("SwitchTab",item.key);
                }}
                activeOpacity={1}
                key={item.key}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.renderTabIcon(i, focused)}
                <Text
                  style={{
                    color: txtColor,
                    fontSize: px2sp(24),
                    marginTop: px2dp(6)
                  }}
                >
                  {global.lang.t(item.key)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
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
      </SafeAreaView>
    );
  }

  renderTabIcon = (i, focused) => {
    switch (i) {
      case 0:
        return (
          <TabBarItem
            iconStyle={{ height: px2dp(48), width: px2dp(36) }}
            focused={focused}
            normalImage={Images.news_gray}
            selectedImage={Images.news}
          />
        );
      case 1:
        return (
          <TabBarItem
            iconStyle={{ height: px2dp(48), width: px2dp(48) }}
            focused={focused}
            normalImage={Images.event_gray}
            selectedImage={Images.event}
          />
        );
      case 2:
        return (
          <TabBarItem
            iconStyle={{ height: px2dp(48), width: px2dp(46) }}
            focused={focused}
            normalImage={Images.room_gray}
            selectedImage={Images.room}
          />
        );
      case 3:
        return (
          <TabBarItem
            redDot={true}
            iconStyle={{ height: px2dp(48), width: px2dp(48) }}
            focused={focused}
            normalImage={Images.mine_gray}
            selectedImage={Images.mine}
          />
        );
    }
  };
}

export default TabBar;
