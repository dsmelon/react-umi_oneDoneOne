export default interface Api {
    [key:string]: any;
    /** 获取用户信息 */
    getInfo: (data?:{
        id: "a";
    }) => Promise<{
        code:number;
        data: {
            sex:number;
            name:string;
            address:number;
            [key:string]: any;
        };
    }>;
    login: (data?:{
        account:string;
        pwd:string;
    }) => Promise<{
        code:number;
        data: {
            token:string;
        };
    }>;
    // 可以使用node脚本生成剩下的接口代码块，手写也可以,建议使用node脚本，抽离出来接口文件就是方便使用脚本生成

}