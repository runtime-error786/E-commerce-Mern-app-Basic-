import React, { useState } from "react";
import avatarImage from "./i1.png"; // Import the image
import axios from "axios";

function Deleteadmin()
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
    const config = {
        withCredentials: true, // Include withCredentials in the configuration
      };
    let post = async()=>{
        try{
            console.log("hello1");
            if(cpassword==password)
            {
                console.log("hello2");
                const url = `http://localhost:2001/userinfo2?name=${name}&phone=${phone}&email=${email}`;
                let g = await axios.delete(url,config);
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

            
                <div className="i3">

                <button type="button" className="button1 inp3" onClick={post}>Submit</button>
                </div>

            </div>
        </>
    )
}

export {Deleteadmin};