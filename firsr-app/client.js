const { Client } = require('pg')

const client = new Client({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'12341234',
    port:5432
})
client.connect();
    client.connect(err=>{
        if(err){
            return err;
        }
    })
module.exports = client;