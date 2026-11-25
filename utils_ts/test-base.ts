import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder: {
            username : "wbaansari@gmail.com",
            password : "Orange@1",
            productName : "ZARA COAT 3"
        }
    }
)