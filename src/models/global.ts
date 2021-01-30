import { ModelType } from '@/model';
import api, { useEndData, useOnceData } from '@/server/api';

const model:ModelType = {
    namespace: 'global',

    state: {
        openLoginPopu: false,
        userInfo: {
            name: "你的名字会显示在这里"
        },
    },

    effects: {
        *openLoginPopu({ payload }, { put }){
            console.log("无论是多少个需要登录的接口同时发，本登录窗口也仅仅只会触发一次")
            yield put({type: "save", payload: { openLoginPopu: payload }})
        },
        *login({ payload }, { call, put }){
            const  { data } = yield call(api.login, payload)
            window.token = data.token
            if(data.token){
                window.loginAct();
                yield put({type: "save", payload: { openLoginPopu: false }})
            }
        },
        *exit(_, { put }){
            window.token = ""
            yield put({type: "save", payload: { userInfo: {} }})
        },
        *getInfo({ payload }, { call, put }){
            const { data = {} } = yield call(api.getInfo, payload)
            yield put({type: "save", payload: { userInfo: data }})
        },
        *test(_, { call }){
            const { data = {} } = yield call(useEndData, api.test);
            return data;
        },
        *test2(_, { call }){
            const { data = {} } = yield call(useOnceData, api.test);
            return data;
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    },
    //仅仅在此处使用一个监听去做事
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname }) => {
            //去做需要做的事，比如根据而配置文件修改页面title，获取广告，修改导航栏信息等
          });
        }
    }
};

export default model;