import React, { useState } from "react";
import avatarImage from "./food.png"; // Import the image
import axios from "axios";

function Deleteproducts()
{
    let [name,setname]=useState();
    let [quan,setqty]=useState(0);
    let [cat,setcat]=useState("grocery");
    let [im,setim]=useState();

    let after = ()=>
    {
        
        setname("");
        setqty(0);
        setcat("grocery");
        setim("");
    }
    let post = async()=>{
        console.log("ss",name,quan,cat,im);
        try{
            let g1 = await axios.get("http://localhost:2001/cook",
                    {withCredentials:true}
                );
                let r = g1.data;
                const url = `http://localhost:2001/delpro?name=${name}&cat=${cat}&r=${r}&quan=${quan}`;
                let g = await axios.delete(url);
                after();
                alert(g.data);
        }
        catch(err)
        {
          alert("product not add successfully");
        }
    }
    return(
        <>
        
            <div className="all">
        <div className="im1" >
        <img src={avatarImage} style={{width:"300px" , height:"300px"}} alt="avatar"></img>
        </div>
                <div className="inp1">
                 Name:
                </div>
                <input type="text" placeholder="name" className="inp2" value={name} onChange={(e)=>{
                    setname(e.target.value);
                }} required></input>


<div className="inp1">
  Category:
</div>
<select className="inp2" value={cat} onChange={(e) => setcat(e.target.value)}>
  <option value="grocery">Grocery</option>
  <option value="electronics">Electronics</option>
  <option value="stationary">Stationary</option>
  <option value="fastfood">Fast Food</option>
</select>

                <div className="i3">

                <button type="button" className="button1 inp3" onClick={post}>Submit</button>
                </div>

            </div>
        </>
    )
}

export {Deleteproducts};