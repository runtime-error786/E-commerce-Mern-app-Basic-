let {express,mongodb,app,schema,userinfo,products,pschema} = require("./db/Model");
let bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");



async function  auth(req,res,next)
{
    console.log("aaaa");
    try{
        let r1 = req.cookies.ckio;
        console.log("cookies---------: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log("aaaaaaaaa",user1);
        req.r1 = r1;
        req.user1 = user1;
        next();
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}

async function  auth1(req,res,next)
{
    console.log("sss",req.query.r);
    try{
        let r1 = req.query.r;
        console.log("cookies: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log(user1);
        if(user1.role=="Admin")
        {
            next();
        }
        
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}

async function  auth2(req,res,next)
{
    console.log("sss",req.body.r);
    try{
        let r1 = req.body.r;
        console.log("cookies: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log(user1);
        if(user1.role=="Admin")
        {
            next();
        }
        
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}

async function  auth3(req,res,next)
{
    console.log("aaaa");
    try{
        let r1 = req.cookies.ckio;
        console.log("cookies---------: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log("aaaaaaaaa",user1);
        
        if(user1.role=="Admin")
        {
            next();
        }
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}

async function  auth4(req,res,next)
{
    console.log("aaaa");
    try{
        let r1 = req.cookies.ckio;
        console.log("cookies---------: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log("aaaaaaaaa",user1);
        
        if(user1.role=="Customer")
        {
            req.user1 = user1;
            next();
        }
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}

async function  auth5(req,res,next)
{
    try{
        console.log("aaaa");
        let r1 = req.body.r;
        console.log("cookies---------: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log("aaaaaaaaa",user1);
        
        if(user1.role=="Customer")
        {
            req.user1 = user1;
            next();
        }
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}

async function  auth6(req,res,next)
{
    console.log("aaaa+");
    try{
        let r1 = req.cookies.ckio;
        console.log("cookies--------+: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log("aaaaaaaaa+",user1);
        
        if(user1.role=="Customer")
        {
            req.user1 = user1;
            next();
        }
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}


async function  auth7(req,res,next)
{
    console.log("aaaa+");
    try{
        let r1 = req.cookies.ckio;
        console.log("cookies--------+: ",r1);
        let user = jwt.verify(r1,"mynameismustafarizwaniamfastianstudent");
        console.log(user);
        let user1 = await userinfo.findOne({_id:user.id});
        console.log("aaaaaaaaa+",user1);
        
        
            req.user1 = user1;
            next();
        
    }
    catch(err)
    {
        res.send("cookie not present");
    }
}

module.exports={auth,auth1,auth2,auth3,auth4,auth5,auth6,auth7};