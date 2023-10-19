import React, { useState } from "react";
import avatarImage from "./i1.jpg"; // Import the image
import axios from "axios";
import { useNavigate } from "react-router-dom";
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


   
function Signin() {
  let [role1,setrole]=useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("Customer"); // Default role
  let navigate = useNavigate();
  const clearFields = () => {
    setName("");
    setEmail("");
    setPass("");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async () => {
   

    try {
      const response = await axios.get("http://localhost:2001/userinfo", {
        params: { name, email, pass, role },
        withCredentials: true
      });
      alert(response.data);
      
if(response.data=="Sign in Successfully")
{
  if(role==="Admin")
  {
   
    // document.getElementById("f1").style.display="block";
    // document.getElementById("f2").style.display="none";
    // document.getElementById("f3").style.display="none";
    console.log("enter in 1");
    navigate("/adminhome");
  }
  else{
    // document.getElementById("f1").style.display="block";
    //      document.getElementById("f2").style.display="none";
    //      document.getElementById("f3").style.display="none";
    console.log("enter in 2");
    navigate("/home");
  }
}
    } catch (err) {
      alert("Credentials not found");
    }
  };

  return (
    <>
    <form>
      <div className="all">
        <div className="im1">
          <img src={avatarImage} style={{ width: "300px", height: "300px" }} alt="avatar" />
        </div>
        <div className="inp1">Name:</div>
        <input
          type="text"
          placeholder="name"
          className="inp2"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="inp1">Email:</div>
        <input
          type="email"
          placeholder="Email"
          className="inp2"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="inp1">Password:</div>
        <input
          type="password"
          placeholder="Password"
          className="inp2"
          value={pass}
          id="pass"
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <br />
        <div className="inp1">Role:</div>
        <input
          type="radio"
          id="Admin"
          name="role"
          value="Admin"
          checked={role === "Admin"}
          onChange={handleRoleChange}
          className="inp4"
        />
        <label htmlFor="Admin" className="inp5">
          Admin
        </label>
        <br/>
        <input
          type="radio"
          id="Customer"
          name="role"
          value="Customer"
          checked={role === "Customer"}
          onChange={handleRoleChange}
          className="inp4"
        />
        <label htmlFor="Customer" className="inp5">
          Customer
        </label>
        <div className="i3">
          <button type="submit" className="button1 inp3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      </form>
    </>
  );
}

export { Signin };
