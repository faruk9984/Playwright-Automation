const base = require('@playwright/test');


exports.customtest=base.test.extend({

    testDataForOrder: {
        username: "test@yopmail.com",
        password: "Faruk@123#",
        productName: "ADIDAS ORIGINAL"
    }

})