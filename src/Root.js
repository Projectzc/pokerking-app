/**
 *作者：lorne
 *时间：2018/12/5
 *功能：
 */

import React, { Component } from "react";
import {
  Platform,
  BackHandler,
  NetInfo,
  DeviceEventEmitter
} from "react-native";
import { Router } from "react-native-router-flux";
import { scenes } from "./pages";
import RouterO from "./configs/Router";
import Language from "./lang/Language";
import { connect } from "react-redux";
import "./configs/StorageConfig";
import { initBaseUrl } from "./configs/fetch";
import SplashScreen from "react-native-splash-screen";
import JShareModule from "jshare-react-native";
import {
  getUserId,
  isLogin,
  logMsg,
  OnSafePress,
  showToast,
  isEmptyObject
} from "./utils/utils";
import { Actions } from "react-native-router-flux";
import codePush from "react-native-code-push";
import { getAppVersion, getUnread, initLoginUser } from "./services/accountDao";
import JPushModule from "jpush-react-native";
import Permissions from "react-native-permissions";

@connect(({ common }) => ({
  ...common
}))
@codePush
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.router = this.router || new RouterO();
    global.router = this.router;
    initBaseUrl();
    this.lang = this.lang || new Language();
    global.lang = this.lang;
  }

  componentWillMount() {
    //第一次获取
    NetInfo.isConnected.fetch().done(status => {
      console.log("Status:" + status);
      this.handleConnectivityChange(status);
    });

    //监听网络状态改变
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    JPushModule.addReceiveNotificationListener(this.receiveNotice);
    JPushModule.addReceiveOpenNotificationListener(this.openNotice);
    if (Platform.OS === "android") {
      this.receivePushMsg = DeviceEventEmitter.addListener(
        "receivePushMsg",
        this.receiveNotice
      );

      JPushModule.notifyJSDidLoad(resultCode => {
        logMsg("jpush设置极光", resultCode);
      });
    } else {
      JPushModule.addOpenNotificationLaunchAppListener(this.openNotice);
    }

    Permissions.check("notification").then(ret => {
      logMsg("通知权限", ret);
      if (ret !== "authorized" && !__DEV__) {
        Permissions.request("notification").then(status => {
          logMsg("申请通知权限", status);
          if (status !== "authorized") {
            // showToast(global.lang.t('alert_message'))
          }
        });
      }
    });
  }

  handleConnectivityChange = isConnected => {
    console.log("status change:" + isConnected);
    //监听第一次改变后, 可以取消监听.或者在componentUnmount中取消监听
    // NetInfo.removeEventListener('change', this.handleConnectivityChange);
    if (!isConnected) {
      alert(global.lang.t("open_net"));
    }
  };

  componentDidMount() {
    initLoginUser(() => {
      SplashScreen.hide();
      getAppVersion();
      if (isEmptyObject(global.loginUser)) {
        let timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.router.toLogin();
        }, 3000);
      }
    });

    if (Platform.OS === "ios") {
      JShareModule.setup();
      JPushModule.hasPermission(ret => {
        if (ret) {
          JPushModule.initPush();
        }
      });
    } else {
      JPushModule.initPush();
      BackHandler.addEventListener("hardwareBackPress", this.onBackAndroid);
    }

    codePush.disallowRestart();
    codePush.sync({
      updateDialog: false,
      installMode: codePush.InstallMode.ON_NEXT_RESUME
    });
  }

  onBackAndroid = () => {
    if (Actions.state.index > 0) {
      router.pop();
      return true;
    } else {
      logMsg("款式大方", Actions.state);
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //按第二次的时候，记录的时间+2000 >= 当前时间就可以退出
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp(); //退出整个应用
        return false;
      }
      this.lastBackPressed = Date.now(); //按第一次的时候，记录时间
      showToast(global.lang.t("again_exit")); //显示提示信息
      return true;
    }
  };

  componentWillUnmount() {
    console.log("componentWillUnMount");
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    JPushModule.removeReceiveNotificationListener(this.receiveNotice);
    JPushModule.removeReceiveOpenNotificationListener(this.openNotice);
    if (Platform.OS === "android") {
      DeviceEventEmitter.removeSubscription(this.receivePushMsg);
    } else {
      JPushModule.removeOpenNotificationLaunchAppEventListener(this.openNotice);
    }
  }

  openNotice = e => {
    logMsg("点击通知", e);
    try {
      JPushModule.setBadge(0, ret => {});
      if (isLogin()) {
        OnSafePress(() => {
          router.toNotices(() => {
            getUnread(getUserId());
          });
        });

        JPushModule.clearAllNotifications();
      }
    } catch (e) {}
  };
  receiveNotice = msg => {
    logMsg("推送消息", msg);
    if (isLogin()) {
      OnSafePress(() => {
        getUnread();
      });
    }
  };

  render() {
    return <Router>{scenes()}</Router>;
  }
}
