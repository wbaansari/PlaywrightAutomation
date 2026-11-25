export class APIUtils
{
    apiContext: any;
    loginPayload: string;

    constructor(apiContext: any, loginPayload: string)
    {
        //constructor(apiContext) scope is inside constructor block to access in other methods then this.apiContext will have access to complete class
        //this refers to current class
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const loginResonse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: this.loginPayload
        })
        const loginResponseJson = await loginResonse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload:string)
    {
        let response = {token: String, orderId: String};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                data: orderPayload,
                headers: {
                        'Authorization':response.token,
                        'Content-Type':'application/json'
                        },
            })
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            return response;
    }
}

module.exports = {APIUtils};