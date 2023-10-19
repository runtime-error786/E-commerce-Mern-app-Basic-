import React, { useState } from "react";
import avatarImage from "./i1.png"; // Import the image
import axios from "axios";

function Registeradmin()
{
    let [name,setname]=useState();
    let [email,setemail]=useState();
    let [phone,setphone]=useState();
    let [password,setpass]=useState();
    let [cpassword,setcpass]=useState();

    let after = ()=>
    {
        
        setname("");
        setphone("");
        setemail("");
        setcpass("");
        setpass("");
    }
    let post = async()=>{
        try{
            console.log("hello1");
            if(cpassword==password)
            {
                console.log("hello2");

                let g = await axios.get("http://localhost:2001/userinfo1",{
                       params:{ name,phone,email,password},
                            withCredentials: true
                });
                console.log("hello3");

                after();

                alert(g.data);
            }
            else{
                alert("password are same");
            }
        }
        catch(err)
        {
          alert("registration not successfly");
        }
    }
    return(
        <>
        
            <div className="all">
        <div className="im1" >
        <img src={avatarImage} className="mx-5" style={{width:"200px" , height:"200px"}} alt="avatar"></img>
        </div>
                <div className="inp1">
                 Name:
                </div>
                <input type="text" placeholder="name" className="inp2" value={name} onChange={(e)=>{
                    setname(e.target.value);
                }} required></input>

                <div className="inp1">
                 Phone:
                </div>
                <input type="text" placeholder="phone" className="inp2" value={phone} onChange={(e)=>{
                    setphone(e.target.value);
                }} required></input>
                
                <div className="inp1">
                 Email:
                </div>
                <input type="email" placeholder="Email" className="inp2" value={email} onChange={(e)=>{
                    setemail(e.target.value);
                }} required></input>

                <div className="inp1">
                 Password:
                </div>
                <input type="password" placeholder="Password" className="inp2" value={password} onChange={(e)=>{
                    setpass(e.target.value);
                }} required></input>
                
                <div className="inp1">
                Confirm  Password:
                </div>
                <input type="password" placeholder="Confirm Password" className="inp2" value={cpassword} onChange={(e)=>{
                    setcpass(e.target.value);
                }} required></input>
                <div className="i3">

                <button type="button" className="button1 inp3" onClick={post}>Submit</button>
                </div>

            </div>
        </>
    )
}

export {Registeradmin};