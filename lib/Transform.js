// vim: ts=4 sw=4 et
const fs = require('fs')

module.exports = class Transform {

    constructor(inFile, outFile) {
        this.inFileName = inFile
        this.outFileName = outFile
    }

    transform() {
        fs.readFile(this.inFileName, 'utf8', this._processData.bind(this));
    }

    _processData(err, fileData) {
        var customers = []
        var orders = []
        
        if (err) {
            // TODO: should this throw an exception ?
            console.log(`error reading input: ${err}`);
        } else {
            const records = JSON.parse(fileData);
            records.forEach(record => {
                customers.push(record.customer);
                var orderList = []
                Object.entries(record.order).forEach(entry => {
                        var key = entry[0], value = entry[1];
                        orderList.push({
                                "item":     key,
                                "quantity": value.quantity,
                                "price":    value.price,
                                "revenue":  value.quantity * value.price
                                })
                        });
                var order = {
                "id":       record.id,
                "vendor":   record.vendor,
                "date":     record.date,
                "customer": record.customer.id,
                "order":    orderList
                }     
                orders.push(order)
            });
            fs.writeFile(this.outFileName, JSON.stringify({customers, orders}, null, 4), 'utf-8', (err) => {
                if (err) {
                // TODO: should this throw an exception ?
                    console.log(`error writing output: ${err}`);
                } 
            });
        }
    }
};
