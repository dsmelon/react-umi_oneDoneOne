export default async (url = "", { data }:any) => {
    console.log("api-----",url,data)
    switch(url){
        case "/api/login":
            return {
                statusCode: 200,
                data: {
                    code: 200,
                    data: {
                        token: "你的token"
                    }
                }
                
            }
            
        case "/api/getInfo":
            if(!data.token){
                return {
                    statusCode: 200,
                    data: {
                        code: 402,
                        message: "未登录"
                    }
                }
            }
            return {
                statusCode: 200,
                data:{
                    code: 200,
                    data: {
                        name: "吴彦祖",
                        sex: "男"
                    }
                }
            }
        case "/api/test":
            if(!data.token){
                return {
                    statusCode: 200,
                    data: {
                        code: 402,
                        message: "未登录"
                    }
                }
            }
            await new Promise(_=>setTimeout(_, 1000))
            return {
                statusCode: 200,
                data:{
                    code: 200,
                    data: {
                        test: "我返回数据了"
                    }
                }
            }
    }
    return {
        statusCode: 200,
        data:{
            code: 500,
            message: "不存在此接口"
        }
    }
}