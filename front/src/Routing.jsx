import React from "react";
import { useState } from "react";
import { BrowserRouter,Routes,Route, resolvePath } from "react-router-dom";
import { Nav } from "./Nav";
import { Error } from "./Error";
import { Register } from "./Register";
import { Signin } from "./Signin";
import { Registeradmin } from "./Add";
import { Deleteadmin } from "./Delete";
import { Logout } from "./Signout";
import { Addproducts } from "./Addproduct";
import { Deleteproducts } from "./Deleteproduct";
import { Card } from "./Card";
import { Sta } from "./Sta";
import { Cuscard } from "./Cuscard";
import { CSta } from "./Csta";
import { Showcart } from "./Cart";
import { Purchase } from "./Purchase";
import axios from "axios";

async function Cnfirm(set)
{
    try{

        const response = await axios.get("http://localhost:2001/role",{
            withCredentials:true
        });
        set(response.data);
        console.log("send successfully");
    }
    catch(err)
    {
        console.log(" not send successfully");
    }
}

const ProtectedRoute = ({ path, element}) => {
    let [role,setrole]=useState("");
    Cnfirm(setrole);
    console.log("run fun7",role);
    if (role === "Admin" && (path === "add/admin" || path === "add/product" || path === "delete/admin" ||  path === "delete/product" || path === "/adminhome")) {
        return element;
      } else if (role === "Customer" && (path === "/home" || path === "categories/:name" || path=="/cart" || path=="/purchase")) {
        return element;
      } 
      else if(role=="Admin" && path==="/register")
      {
        return <Error></Error>;
      }
      else if(role=="Admin" && path==="/login")
      {
        return <Error></Error>;
      }
      else if(role=="Customer" && path==="/register")
      {
        return <Error></Error>;
      }
      else if(role=="Customer" && path==="/login")
      {
        return <Error></Error>;
      }
      else if(path==="/register")
      {
        return element;
      }
      else if(path==="/login")
      {
        return element;
      }
      else{
        return <Error></Error>;
      }
};



function Routing()
{
    let [search,setsearch] = useState("");
    return(
        <>
            <BrowserRouter>
            <Nav setmsg = {(msg)=>{
                setsearch(msg);
            }}></Nav>
                <Routes>
                <Route path="/home" element={<ProtectedRoute path="/home" element={<Cuscard msg={search}></Cuscard>}></ProtectedRoute>}></Route>
                <Route path="categories/:name" element={<ProtectedRoute path="categories/:name" element={<CSta msg = {search}></CSta>}></ProtectedRoute>} ></Route>
                <Route path="/cart" element={<ProtectedRoute path="/cart" element={<Showcart msg = {search}></Showcart>}></ProtectedRoute>}></Route>
                <Route path="/purchase" element={<ProtectedRoute path="/purchase" element={<Purchase></Purchase>}></ProtectedRoute>} ></Route>
                <Route path="/adminhome" element={<ProtectedRoute path="/adminhome" element={<Card msg={search}></Card>}></ProtectedRoute>}></Route>
                <Route path="admincategories/:name" element={<Sta msg = {search}></Sta>} ></Route>
                <Route path="add/admin" element={ <ProtectedRoute path="add/admin" element={<Registeradmin></Registeradmin>}></ProtectedRoute>}></Route>
                <Route path="delete/admin" element={ <ProtectedRoute path="delete/admin" element={<Deleteadmin></Deleteadmin>}></ProtectedRoute>}></Route>
                <Route path="add/product" element={ <ProtectedRoute path="add/product" element={<Addproducts></Addproducts>}></ProtectedRoute> }></Route>
                <Route path="delete/product" element={<ProtectedRoute path="delete/product" element={<Deleteproducts></Deleteproducts>}></ProtectedRoute>}></Route>
                <Route path="/register" element={<ProtectedRoute path="/register" element={<Register></Register>}></ProtectedRoute>}></Route>
                <Route path="/login" element={<ProtectedRoute path="/login" element={<Signin></Signin>}></ProtectedRoute>}></Route>
                <Route path="/logout"></Route>
                <Route path="*" element={<Error></Error>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export {Routing};

//                    <Route path="categories/:name" element={<Sta msg = {search}></Sta>} ></Route>
 