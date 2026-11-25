const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username : "wbaansari@gmail.com",
            password : "Orange@1",
            productName : "ZARA COAT 3"
        }
    }
)