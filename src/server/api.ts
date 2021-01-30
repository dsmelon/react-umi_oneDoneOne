
import request from '@/utils/request';
import Api from '@/server/api.d.ts';

const api:Api = {
    getInfo: data => request("/api/getInfo", { data }),
    login: data => request("/api/login", { data, needLogin: false }),
    test: () => request("/api/test"),
    //以下的可以使用node脚本生成
    //-------读入文件解析成字符，找到此标记，替换为新的数据-------//
}

export default api;

//为何我要封装以下两个方法，因为虽然umi-request本身就有取消请求的功能，但是以防很多人用的并不是umi-request，没有abort的功能，减少对某个插件的高度依赖

//使用最后一次数据，使用方法 useEndData(api.getInfo, data)或者在yield call(useEndData,api.login,data),当然你也可以直接在接口中定义
//即：api.xxx = data => useEndData(request, "/api/xxx", {data})
const abort:any[] = [];
export const useEndData = async <T,K>(cb:(...params:T[]) => Promise<K>, ...params:T[]):Promise<K> => {
    let target = abort.findIndex(_=>_.key === cb)
    if(target > -1){
        abort[target].cancel()
    }else{
        abort.push({key: cb})
        target = abort.length - 1
    }
    const res = await Promise.race<Promise<K>>([cb(...params), new Promise((resolve) => {
        //此处不建议使用reject,在redux调用时会有问题，call方法会捕获reject
        abort[target].cancel = resolve
    })])
    if(res){
        abort.splice(target, 1)
        return res
    }
    return new Promise(() => null)//如果取消了请求，就等死
}

//使用第一次数据，防止重点，使用方法同上
const stops:any[] = [];
export const useOnceData = async <T,K>(cb:(...params:T[]) => Promise<K>, ...params:T[]):Promise<K> => {
    const target = stops.findIndex(_=>_.key === cb)
    if(target > -1) return new Promise(() => null)
    else stops.push({key: cb})
    const res = await cb(...params)
    stops.splice(target, 1)
    return res
}