import { getDvaApp, history, Dispatch } from 'umi';
import { stringify } from 'querystring';

let dispatch:Dispatch;

window.token = window.localStorage.getItem("token");

let waitToken:Promise<string>;
window.loginAct = () => {};
window.exit = async () => {
    !dispatch && (dispatch = getDvaApp()._store.dispatch);
    await dispatch({type: "global/exit"})
}
window.getToken = () => {
    if(window.token) return window.token;
    if(waitToken) return waitToken;
    waitToken = new Promise(resolve => {
        //此处去异步拿token,这里使用延时代替
        setTimeout(() => {
            window.token = ""//如果此处拿到了token,就不会触发登录了，如果没有拿到，就会触发登录
            resolve()
        }, 1000);
        //以下是app的逻辑，暂不处理ts语法，根据需要自己处理
        //如果是在自己的app里登录，需要调用token的api,并且在回调函数里resolve,例如：
        // window.appGetToken(token => {
        //     window.token = "token"
        //     resolve()
        // })
        //又如果app是执行传入的回调，则：
        // window.appToken = () => {
        //     window.token = "token"
        //     resolve()
        // }
        // window.appGetTokenCbName("appToken")
    })
    return waitToken;
}

//为什么要封装跳转
//1:方便使用
//2:可以做跳出网站拦截的行为
//3:相似的行为保证统一的出口，这是一个及其深刻的思想觉悟，慢慢你就懂了
window._jump = (option, type = "push") => {
    switch(type){
        case 'go': history.goForward(option as number);break;
        case 'back': history.goBack(option as number);break;
        default:
            if(typeof option === "string"){
                if(/^http/.test(option)){
                    switch(type){
                        case "push": window.location.href = option;break;
                        case "replace": window.location.replace(option);break;
                    }
                }else{
                    switch(type){
                        case "push": history.push(option);break;
                        case "replace": history.replace(option);break;
                    }
                }
            }else{
                const { url = "", query = {} } = option as {url:string,query:any};
                if(/^http/.test(url)){
                    switch(type){
                        case "push": window.location.href = `${url}?${stringify(query)}`;break;
                        case "replace": window.location.replace(`${url}?${stringify(query)}`);break;
                    }
                }else{
                    switch(type){
                        case "push": history.push({pathname: url, query});break;
                        case "replace": history.replace({pathname: url, query});break;
                    }
                }
            }
        break;
    }
}