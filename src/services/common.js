
import {logMsg} from "../utils/utils";
import {getProfile} from "./accountDao";

/**
 *作者：lorne
 *时间：2019/1/16
 *功能：
 */

export default {
    namespace: 'common',
    state: {

    },

    effects: {
        * switchLang(_, { call, put }) {
            logMsg('切换语言',_.params)

            yield put({ type: 'save',
                payload: {
                    langStr: _.params,
                } });
        },
    },

    reducers: {
        save(state, { payload }) {
            logMsg('切换语言2',payload)
            return { ...state, ...payload };
        },
    },

};