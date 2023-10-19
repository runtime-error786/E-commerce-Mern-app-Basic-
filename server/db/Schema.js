let express = require("express");
let mongodb = require("mongoose");
let app = express();
let cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
let jwt = require("jsonwebtoken");

mongodb.connect("mongodb://127.0.0.1:27017/ecom", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connection successfully");
  })
  .catch(() => {
    console.log("Connection not successful");
  });

let schema = new mongodb.Schema({
    name:String,
    phone:String,
    email:{
        type:String,
        unique:true,
    },
    password:String,
    role:{
        type:String,
        default:"Customer"
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
});


schema.methods.generate = async function()
{
    try{

        let token = jwt.sign({id:this._id},"mynameismustafarizwaniamfastianstudent");
        this.tokens = this.tokens.concat({token});
        await this.save();
        console.log("token : ", token);
        return token;
    }
    catch(err)
    {
        return err;
    }
}

let pschema = new mongodb.Schema({
    name:String,
    category:String,
    qty:Number,
    pic:String,
    price:String
});

let cart = new mongodb.Schema(
    {
        name:String,
        phone:String,
    email:{
        type:String,
        unique:true,
    },
    cart:[
        {
            name:String,
    category:String,
    qty:Number,
    pic:String,
    price:String
        }
    ]
    }
);
module.exports = {express,mongodb,app,schema,pschema,cart};