let {express,mongodb,app,schema,pschema,cart} = require("./Schema");

let userinfo = mongodb.model("userinfo",schema);

let products = mongodb.model("products",pschema);

let cart1 = mongodb.model("cart",cart);


module.exports = {express,mongodb,app,schema,userinfo,products,pschema,cart1};