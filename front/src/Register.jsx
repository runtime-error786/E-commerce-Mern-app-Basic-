import React, { useState } from "react";
import avatarImage from "./i1.jpg";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPass] = useState("");
    const [cpassword, setCpass] = useState("");

    const after = () => {
        setName("");
        setPhone("");
        setEmail("");
        setCpass("");
        setPass("");
    }

    const post = async () => {
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let pass = document.getElementById("pass");
        let cpass = document.getElementById("cpass");
        let phone = document.getElementById("phone");
        
        try {
            if (cpassword === password) {
                const response = await axios.post("http://localhost:2001/userinfo", {
                    name,
                    phone,
                    email,
                    password,
                });
                after();
                alert(response.data);
            } else {
                alert("Passwords do not match");
            }
        } catch (err) {
            alert("Registration not successful");
        }
    }

    return (
        <>
        <form>
            <div className="all">
                <div className="im1">
                    <img src={avatarImage} style={{ width: "300px", height: "300px" }} alt="avatar" />
                </div>
                <div className="inp1">
                    Name:
                </div>
                <input
                    type="text"
                    placeholder="Name"
                    className="inp2"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div className="inp1">
                    Phone:
                </div>
                <input
                    type="text"
                    placeholder="Phone"
                    className="inp2"
                    value={phone}
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <div className="inp1">
                    Email:
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    className="inp2"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    
                />

                <div className="inp1">
                    Password:
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    className="inp2"
                    id="pass"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />

                <div className="inp1">
                    Confirm Password:
                </div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="inp2"
                    value={cpassword}
                    id="cpass"
                    onChange={(e) => setCpass(e.target.value)}
                    required
                />
                <div className="i3">
                    <button type="submit" className="button1 inp3" onClick={post}>
                        Submit
                    </button>
                </div>
            </div>
            </form>
        </>
    );
}

export { Register };
