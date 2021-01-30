// import _wx from 'wx';
// 此处使用wxsdk作为例子，可以看本例子将自己的异步sdk整理成此方式，如果是同步sdk,直接使用即可
// 解决的是使用api时，需要等待ready执行完毕，处理后，调用即可，不再每次都ready
// 如果需要返回值：const res = await wx("b"),如果不需要返回值，wx("b")即可
// 如果是赋值的情况，不用使用此壳，直接_wx.a=1即可，通常sdk没有赋值的需求，自己斟酌吧
const _wx:any = {
    ready: (cb:any) => {
        setTimeout(() => {
            cb()
        }, 3000)
    },
    a: "a",
    b: <T>(_:T):T => _
}

let wait:any;

function ready(){
    if(wait) return wait;
    wait = new Promise(resolve => {
        _wx.ready(() => {
            resolve()
        })
    })
    return wait;
}

ready()

export default async function wx(key:string, ...other:any[]){
    await ready();
    return typeof(_wx[key]) === "function" ? _wx[key](...other) : _wx[key]
}