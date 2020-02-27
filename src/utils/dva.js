/**
 *作者：lorne
 *时间：2018/12/5
 *功能：
 */

import { create } from 'dva-core';
import { createLogger } from 'redux-logger';

let app;
let store;
let dispatch;

function createApp(opt) {
    // redux日志
    // opt.onAction = [createLogger()];
    app = create(opt);

    if (!global.registered) opt.models.forEach(model => app.model(model));
    global.registered = true;
    app.start();

    store = app._store;
    app.getStore = () => store;

    dispatch = store.dispatch;

    app.dispatch = dispatch;
    return app;
}

export default {
    createApp,
    getDispatch() {
        return app.dispatch;
    },
    getStore(){
        return app.getStore()
    }
}
