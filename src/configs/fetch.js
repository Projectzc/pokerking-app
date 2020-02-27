/**
 * fetch.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/1.
 *
 */

import { create, SERVER_ERROR, TIMEOUT_ERROR, NETWORK_ERROR } from "apisauce";
import api from "./api";
import { isStrNull, logMsg, showToast } from "../utils/utils";
import dva from "../utils/dva";

let TAG = "Http:";

// define the api
const client = create({
  baseURL: api.production,
  timeout: 20000
});

if (__DEV__) {
  client.addMonitor(response => {
    const { url } = response.config;
    logMsg("响应" + url, response);
  });

  client.addRequestTransform(request => {
    logMsg("请求" + request.url, request);
  });
}

let typeUrl = "production";
export function baseUrlType() {
  return typeUrl;
}

export function initBaseUrl() {
  client.setHeader('X-LANG', 'zh')
  storage
    .load({
      key: "BaseApiType"
    })
    .then(ret => {
      logMsg("当前环境为：" + ret);
      typeUrl = ret;
      if (ret === "test") client.setBaseURL(api.test);
      else client.setBaseURL(api.production);
    })
    .catch(err => {});
}

export function getBaseUrl() {
  return client.getBaseURL();
}
export function setBaseUrl(type) {
  logMsg("当前环境为：" + type);
  storage.save({
    key: "BaseApiType", // Note: Do not use underscore("_") in key!
    data: type
  });
  if (type === "test") client.setBaseURL(api.test);
  else client.setBaseURL(api.production);
}

export function setLang(lang) {
  client.setHeader("X-LANG", lang);
}
export function setToken(access_token) {
  if (isStrNull(access_token)) {
    delete client.headers["x-access-token"];
  } else {
    client.setHeader("x-access-token", access_token);
  }
}

export function get(url, body, resolve, reject) {
  return client
    .get(url, body)
    .then(res => {
      handle(res, resolve, reject);
    })
    .catch(err => {
      errReject(err);
    });
}

export function put(url, body, resolve, reject) {
  client
    .put(url, body)
    .then(res => {
      handle(res, resolve, reject);
    })
    .catch(err => {
      errReject(err);
    });
}

export function del(url, body, resolve, reject) {
  client
    .delete(url, body)
    .then(res => {
      handle(res, resolve, reject);
    })
    .catch(err => {
      errReject(err);
    });
}

export function postScan(url, body, resolve, reject) {
  client
    .post(url, body, { timeout: 60 * 1000 })
    .then(res => {
      handle(res, resolve, reject, true);
    })
    .catch(err => {
      errReject(err);
    });
}

export function post(url, body, resolve, reject) {
  client
    .post(url, body)
    .then(res => {
      handle(res, resolve, reject);
    })
    .catch(err => {
      errReject(err);
    });
}

function handle(res, resolve, reject, notToast = false) {
  const { ok, status, data } = res;
  if (ok && status === 200 && data.code === 0) {
    resolve && resolve(data);
  } else {
    if (data && !isStrNull(data.msg)) {
      notToast || showToast(data.msg);
      reject && reject(data.msg);
    }

    errReject(res);
  }
}

function errReject(res) {
  logMsg("错误", res);
  const { status, problem, data, ok } = res;
  if (status === 401) {
    setLoginEmpty();
  } else {
    // showToast(problem)
  }
}

export function setLoginEmpty(showT) {
  logMsg("退出登录用户");
  global.storage.save({
    key: "LoginUser",
    data: {}
  });
  setToken("");
  global.loginUser = {};
  dva.getDispatch()({ type: "MinePage/setProfile", params: {} });
  showT || showToast("用户登录过期");
  router.toLogin();
}
