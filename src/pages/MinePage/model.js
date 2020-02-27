import * as MinePageApi from './service';

export default {
  namespace: 'MinePage',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { statusCode, data } = yield call(MinePageApi.demo, {});
      if (statusCode === 200) {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
      * setProfile(payload,{call,put}){

          yield put({type:'save',payload:{
                  profile:payload.params
              }})

      },
      * setUnread(_, { call, put }) {
          yield put({type:'save',payload:{
                  msgInfo:_.params
              }})
      },
      * setCollections(_, { call, put }) {
          yield put({type:'save',payload:{
                  collects:_.params
              }})
      },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
