import * as HomeApi from './service';
import {logMsg} from "../../utils/utils";

export default {
  namespace: 'Home',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
        console.log('进入这里')
      let data = yield call(HomeApi.demo, {});
        console.log('Model',data)
        yield put({ type: 'save',
            payload: {
                topData: data,
            } });
    },
      * setProfile(_,{call,put}){

          yield put({type:'save',payload:{
                  profile:_.params
              }})

      },
      * showShare(_,{call,put}){
          logMsg(_)
          yield put({type:'save',payload:{
                  shareParam:_.params
              }})

      },
      * closeShare(_,{call,put}){
          yield put({type:'save',payload:{
              shareParam:null
          }})

      }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
