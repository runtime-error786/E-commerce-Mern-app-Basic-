import React, { useState } from "react";
import {NavLink,Link} from "react-router-dom";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import { Sea } from "./Search";
async function Cnfirm(set,set1)
{
    try{

        const response = await axios.get("http://localhost:2001/role",{
            withCredentials:true
        });
        set(response.data);
        set1(true);
        console.log("send successfully");
    }
    catch(err)
    {
        console.log(" not send successfully");
    }
}

function JI(set)
{
   let f=async ()=>{
    try{

      const response = await axios.get("http://localhost:2001/cook",{
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

   f();
}
function Nav(props)
{
  let [role,setrole]=useState("");
  let [co,setco] = useState("");
  let [auth,setauth]=useState(false);
    Cnfirm(setrole,setauth);
    JI(setco);
    console.log("run fun7",role);
  let [msg1,setmsg1] = useState("");
  let loc = useLocation();
  let navigate = useNavigate();
    return(
        <>
 <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
  {role==="Customer" && (<NavLink to="/home" style={{color:"white",textDecoration:"none"}}>
            <a class="navbar-brand e2">E-commerce</a>
            </NavLink>)}
            {role==="Admin" && (<NavLink to="/adminhome" style={{color:"white",textDecoration:"none"}}>
            <a class="navbar-brand e2">E-commerce</a>
            </NavLink>)}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      {role==="Customer" && (<li class="nav-item">
      <NavLink to="/home" style={{color:"white",textDecoration:"none"}}>
        <a class="nav-link e1" aria-current="page">Home </a>
      </NavLink>
      </li>)}
      {role==="Admin" && (<li class="nav-item">
      <NavLink to="/adminhome" style={{color:"white",textDecoration:"none"}}>
        <a class="nav-link e1" aria-current="page">Home </a>
      </NavLink>
      </li>)}
      {role==="Customer" && (
      <li class="nav-item">
      <NavLink to="/cart" style={{color:"white",textDecoration:"none"}}>
        <a class="nav-link e1" aria-current="page">Cart </a>
      </NavLink>
      </li>)}
      
      {role==="Customer" && (
      <li class="nav-item">
      <NavLink to="/purchase" style={{color:"white",textDecoration:"none"}}>
        <a class="nav-link e1" aria-current="page">Purchase </a>
      </NavLink>
      </li>)}

        {role==="Admin" && (
          <>
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Add
          </a>
          <ul class="dropdown-menu">
            <li>
            <NavLink to="add/admin" style={{color:"white",textDecoration:"none"}}>
            <a class="dropdown-item">Admin</a>
            </NavLink></li>
            <li>
            <NavLink to="add/product" style={{color:"white",textDecoration:"none"}}>
            <a class="dropdown-item">Product</a>
            </NavLink></li>
            </ul>
        </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Delete
          </a>
          <ul class="dropdown-menu">
          <li>
            <NavLink to="delete/admin" style={{color:"white",textDecoration:"none"}}>
            <a class="dropdown-item">Admin</a>
            </NavLink></li>
            <li><NavLink to="delete/product" style={{color:"white",textDecoration:"none"}}>
            <a class="dropdown-item">Product</a>
            </NavLink></li>
            </ul>
        </li>
        </>
        )}
       
{role==="Admin" && (
  <li className="nav-item dropdown">

<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
Categories
</a>
<ul className="dropdown-menu">
  <li>
    <Link to="/admincategories/stationary" className="dropdown-item">Stationary</Link>
  </li>
  <li>
    <Link to="/admincategories/grocery" className="dropdown-item">Grocery</Link>
  </li>
  <li>
    <Link to="/admincategories/electronics" className="dropdown-item">Electronics</Link>
  </li>
  <li>
    <Link to="/admincategories/fastfood" className="dropdown-item">Fast Food</Link>
  </li>
</ul>
</li>

)}

{role==="Customer" && (
  <li className="nav-item dropdown">

<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
Categories
</a>
<ul className="dropdown-menu">
  <li>
    <Link to="/categories/stationary" className="dropdown-item">Stationary</Link>
  </li>
  <li>
    <Link to="/categories/grocery" className="dropdown-item">Grocery</Link>
  </li>
  <li>
    <Link to="/categories/electronics" className="dropdown-item">Electronics</Link>
  </li>
  <li>
    <Link to="/categories/fastfood" className="dropdown-item">Fast Food</Link>
  </li>
</ul>
</li>

)}

      </ul>
      {(loc.pathname=="/home" || loc.pathname=="/categories/stationary" || loc.pathname=="/categories/grocery" || loc.pathname=="/categories/electronics" ||  loc.pathname=="/categories/fastfood" || loc.pathname=="/cart" || loc.pathname=="/adminhome" || loc.pathname=="/admincategories/stationary" || loc.pathname=="/admincategories/grocery" || loc.pathname=="/admincategories/electronics" ||  loc.pathname=="/admincategories/fastfood") && (
        <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" onChange={(e)=>{
        if(e.target.value=="")
        {
          props.setmsg("");
        }
        else{
          props.setmsg(e.target.value);
        }
      }} aria-label="Search" />
      
      
    </form>
    
      )}
      
      {co===""  && (
        <>

       <NavLink to="/register" >
        <a class="nav-link button1" id="f3" style={{color:"white"}}>Register </a>
      </NavLink>
      
      
      <NavLink to="/login" >
        <a class="nav-link button1" id="f2" style={{color:"white"}} onClick={()=>{
         
        }}>Log in </a>
      </NavLink>
      </>
      )}

      {co!=""  && (<NavLink to="/logout" >
        <a class="nav-link button1" id="f1" onClick={async ()=>{
         
    try{
        

        
          let r = await axios.get("http://localhost:2001/logout",{
            withCredentials:true
        });
        alert(r.data);
        //  document.getElementById("f1").style.display="none";
        //  document.getElementById("f2").style.display="block";
        //  document.getElementById("f3").style.display="block";
        navigate("/login");
        

    }
    catch(err)
    {
        alert("not logout successfully");
    }

        }} style={{color:"white"}}>Log out </a>
      </NavLink>)}

    </div>
  </div>
</nav>
        </>
    )
}


export {Nav};


//formik --- useFormik