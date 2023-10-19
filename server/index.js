let {express,mongodb,app,schema,userinfo,products,pschema,cart1} = require("./db/Model");
let bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");
let cookie = require("cookie-parser");
let {auth,auth1,auth2,auth3,auth4,auth5,auth6,auth7} = require("./auth");
const { reset } = require("nodemon");
let pdf = require("pdfkit");
app.use(cookie());

app.get("/",(req,res)=>{
    res.send("hello");
});

app.post("/userinfo",async(req,res)=>{
    console.log("sssa");

    try{
        console.log("sssa");
        let cpass = await bcrypt.hash(req.body.password,10);
        console.log("hello",cpass);
        let g1 = new userinfo({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:cpass
        });
        console.log(g1);
        let g = await userinfo.find({name:req.body.name,email:req.body.email,phone:req.body.phone});
        console.log("g:",g.length);
        if(g.length==0)
        {
            let a = await userinfo.insertMany([g1]);
            res.send("successfully");
        }
        else{
            res.send("data already found");
        }
    }
    catch(err)
    {
        res.send(err);
    }
});

app.get("/userinfo",async(req,res)=>{
    try{
        let name = req.query.name;
        let email = req.query.email;
        let pass = req.query.pass;
        let role = req.query.role;
        console.log("hello1",name,email,pass,role);
        let g = await userinfo.findOne({name:name,email:email,role:role});
        console.log("hello2");
        
        console.log("hello3",g);
        
        let ismatch = await bcrypt.compare(pass,g.password);
        console.log("hello4");
        
        if(ismatch==true)
        {
            console.log("hello5");

            let token = await g.generate();
            res.cookie("ckio",token);

            console.log("hello6");

            res.send("Sign in Successfully");
        }
        else{
            res.send("credentials not correct");
        }
    }
    catch(err)
    {
        res.send("Correct data enter");
    }

});

app.get("/userinfo1",auth,async(req,res)=>{
    try{
        console.log("loop");
        console.log("hello",req.query.password);
        let cpass = await bcrypt.hash(req.query.password,10);
        let role = "Admin";
        console.log("hello",cpass);
        let g1 = new userinfo({
            name:req.query.name,
            phone:req.query.phone,
            email:req.query.email,
            password:cpass,
            role:role
        });
        console.log(g1);
        let g = await userinfo.find({name:req.query.name,email:req.query.email,phone:req.query.phone,role:role});
        console.log("g:",g.length);
        if(g.length==0)
        {
           if(req.user1.role=="Admin")
           {
               let a = await userinfo.insertMany([g1]);
               res.send("successfully");
           }
           else{
            res.send("you are not admin");
           }
        }
        else{
            res.send("data already found");
        }
        
    }
    catch(err)
    {
        res.send(err);
    }
});

app.delete("/userinfo2",auth,async(req,res)=>{
    try{
        console.log("delete admin",req.query.name,req.query.email,req.query.phone);
       let role="Admin";
        let g = await userinfo.find({name:req.query.name,email:req.query.email,phone:req.query.phone,role:role});
        console.log("g:",g.length);
        if(g.length!=0)
        {
            console.log("delete admin");
           if(req.user1.role=="Admin")
           {
            if(req.user1.name!=req.query.name && req.user1.email!=req.query.email && req.user1.phone!=req.query.phone)
            {

                let a = await userinfo.deleteOne({name:req.query.name,email:req.query.email,phone:req.query.phone,role:role});
                res.send("successfully");
            }
            else{
                res.send("you cannot delete your own credentials");
            }
           }
           else{
            res.send("you are not admin");
           }
        }
        else{
            res.send("data not found");
        }
        
    }
    catch(err)
    {
        res.send(err);
    }
});


app.get("/logout",async(req,res)=>{
    try{
        res.clearCookie("ckio");
        res.send("logout successfully");
    }
    catch(err)
    {
        res.send(err);
    }
});

app.get("/cook",async(req,res)=>{
    try{
        console.log("sss")
        res.send(req.cookies.ckio);
    }
    catch(err)
    {
        res.send("err");
    }
});


app.post("/products",auth2,async(req,res)=>{
    try{
        console.log("SS",req.body.name);
        let g = new products({
            name:req.body.name.toLowerCase(),
            category:req.body.cat,
            qty:req.body.quan,
            pic:req.body.im,
            price:req.body.pra
            });

            console.log("fr",g);
           let r = await products.findOne({
            name:req.body.name.toLowerCase(),
            category:req.body.cat,
            });

            if(r)
            {
                console.log(r);
                let t = Number(r.qty);
                t = t + Number(req.body.quan);
                r.qty = t;
                await r.save();
                res.send("updated successfully");
            }
            else{
                console.log(g);
                await products.insertMany([g]);
                res.send("inserted successfully");
            }
            
    }
    catch(err)
    {
        res.send("not inserted successd=fully");
    }
});

app.delete("/delpro",auth1,async(req,res)=>{
    try{
        console.log("SS---",req.query.name,req.query.cat,);
        let g = new products({
            name:req.query.name.toLowerCase(),
            category:req.query.cat,
            qty:req.query.quan
            });

            console.log("fr",g);
           let r = await products.findOne({
            name:req.query.name,
            category:req.query.cat
            });

            let cart2 = await cart1.find();
            if(r)
            {

                    console.log(r);
                    for(let i of cart2)
                    {
                        i.cart = i.cart.filter((val) => {
                            console.log("hello++++++");
                            return (
                              val.name !== req.query.name  &&
                              val.category!==req.query.cat
                            );
                        });
                        await i.save();
                    }
                    
                    await products.deleteOne({name:req.query.name,category:req.query.cat});
                    res.send("delete item");
            }
            else{
                res.send("products not found");
            }
            
    }
    catch(err)
    {
        res.send("not inserted successd=fully");
    }
});

app.get("/home",auth3,async(req,res)=>{
    try{
        console.log("hello f3");
        let r = await products.find();
        console.log(r);
        res.send(r);
    }
    catch(err)
    {
        res.send("something wrong");
    }
});

app.get("/chome",auth4,async(req,res)=>{
    try{
        console.log("hello f3");
        let r = await products.find();
        console.log("hello : ",r);
        res.send(r);
    }
    catch(err)
    {
        res.send("something wrong");
    }
});


app.post("/cart",auth5,async(req,res)=>{
    try{
        console.log("m");
        let r = await cart1.findOne({name:req.user1.name,phone:req.user1.phone,email:req.user1.email});
        console.log(r);
        let f = "false";
        if(r)
        {
            r.cart.map((val,ind)=>{
                console.log("val --------------------: ",val);  
                if(val.name==req.body.name1 && val.category==req.body.category1 && val.price==req.body.price1 && val.pic==req.body.pic1)
                {
                    val.qty = req.body.quantity;
                    console.log("+++++++++++",val.qty);
                    r.save();
                    f = "true";
                }           
            });
            if(f=="false")
            {
                let b = {
                    name:req.body.name1,
                    category:req.body.category1,
                    qty:req.body.quantity,
                    pic:req.body.pic1,
                    price:req.body.price1
                };
                r.cart = r.cart.concat(b);
                await r.save();
                console.log(r);
                console.log("1");
            }
            else{
                f="false";
            }
             
        }
        else{
            let g = new cart1({
                name:req.user1.name,
                phone:req.user1.phone,
                email:req.user1.email,
                cart: [{
                    name: req.body.name1,
                    category: req.body.category1,
                    qty: req.body.quantity,
                    pic: req.body.pic1,
                    price: req.body.price1,
                }],
            })
            
            let r1 = await cart1.insertMany([g]);
            console.log("0");
        }
        res.send("successfully");
    }
    catch(err)
    {
        res.send("something wrong");
    }
});


app.get("/showcart",auth6,async(req,res)=>{
    try{
        console.log("hello------------->>>>>>>----");
        let full = await cart1.findOne({name:req.user1.name,phone:req.user1.phone,email:req.user1.email});
        console.log("hello2>>>>>>>>>>",full);
        res.send(full);
    }
    catch(err)
    {        
        console.log("hello3>>>>>>>>");

        res.send("err");
    }
});

app.get("/getcount",async(req,res)=>{
    try{
        let resa = await products.findOne({name:req.query.name1,category:req.query.category1,price:req.query.price1});
        console.log(resa);
        res.send(resa);
    }
    catch(err)
    {
      console.log(err);
    }
});
// name1,category1,price1,quantity

app.get("/crement",auth6,async(req,res)=>{
    try{
        console.log(",,,,,,,,,,,,,,");
        let resa = await cart1.findOne({name:req.user1.name,email:req.user1.email,phone:req.user1.phone});
        console.log("/0",resa.cart);
        for(val of resa.cart)
        {
            if(val.name==req.query.name1 && val.category==req.query.category1 )
            {
                val.qty=req.query.r;
                console.log("AAAAA",val.qty,req.query.r);
            }
        }        
        await resa.save();
        res.send("successfully");
    }
    catch(err)
    {
        res.send("not successfully");
    }
})

app.delete("/delcartitem",auth6,async(req,res)=>{
    try{
        console.log("j");
        let resa = await cart1.findOne({name:req.user1.name,email:req.user1.email,phone:req.user1.phone});
        console.log("/deleted item %%%%%%%%%%%",resa.cart);
        console.log("enter before into deleted items+++++++++++++",req.query.name,req.query.cat,req.query.price);

        resa.cart = resa.cart.filter((val) => {
            console.log("hello++++++");
            return (
              val.name !== req.query.name  &&
              val.category!==req.query.cat &&
              val.price !== req.query.price
            );
          });
      await resa.save();
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",resa);
      res.send(resa);
    }
    catch(err)
    {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

    }
});

app.delete("/purchase",auth6,async(req,res)=>{
    try{
        console.log("j");
        let resa = await cart1.findOne({name:req.user1.name,email:req.user1.email,phone:req.user1.phone});
        
        console.log("/deleted it--------------------------------////////////",resa.cart);

        

        for (let val of resa.cart)
        {
            let r2 = await products.findOne({name:val.name,category:val.category});
            r2.qty = r2.qty - val.qty;
            await r2.save();
            console.log("ss",r2);
            let f = Number(val.price);
            console.log("f",f);
            f = val.qty * f;
            val.price = String(f);
            console.log("f",val.price);
            await resa.save();
            let wcart = await cart1.find();
            for(let v of wcart)
            {
                console.log("ener1");
                for(let j of v.cart)
                {
                    console.log("ener2",j.qty);

                    let r3 = await products.findOne({name:j.name,category:j.category});
                    if(r3)
                    {

                        if(j.qty>r3.qty)
                        {
                            j.qty = r3.qty;
                            console.log("j",j.qty,"r",r3.qty);
                            
                        }
                    }
                }
                await v.save();
            }

            await resa.deleteOne({name:val.name,category:val.category});
        }
          console.log("+++++++++++++++++++++++++++ppppppppppppppppp+++++++++++++++++++++++++++++++++++++++",resa);
      res.send(resa);
    }
    catch(err)
    {
      console.log(err);
    }
});

app.get("/role",auth7,async(req,res)=>{
    try{
        
        res.send(req.user1.role);
    }
    catch(err)
    {
        res.send(err);
    }
});
app.listen(2001);