class APiUtils
{

    constructor(apiContext,loginPlayload){
        this.apiContext=apiContext
        this.loginPlayload=loginPlayload
    }


    async getToken(){
        const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPlayload
            }
        )
        // 200, 201
        const loginResponseJson=await loginResponse.json()
        const token=loginResponseJson.token
        console.log("token: ",token)
        return token
    }


    async createOrder(orderPlayload){

        let response={}
        response.token=await this.getToken()

        const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data:orderPlayload,
                headers:{
                    'authorization':response.token,
                    'content-type':'application/json'
                },
            }
        )
        const orderResponseJson=await orderResponse.json()
        console.log(orderResponseJson)
        const orderId=orderResponseJson.orders[0]
        response.orderId=orderId
        return response

    }

}

module.exports={APiUtils}