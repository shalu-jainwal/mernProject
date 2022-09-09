import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,    //email:email
        password  //password:password
      })
    });

    //getting pending state data
    const data = res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid Credentials!");
    }else{
      window.alert("Login Successful!");
      navigate("/products");
    }

  }

  return (
    <div className="container col-lg-6 mt-5">
    <h2>Log in</h2>
      <form method="POST">
        <div className="form-outline mb-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value) } className="form-control" />
          <label className="form-label">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value) } className="form-control" />
          <label className="form-label">
            Password
          </label>
        </div>

        <button type="button" className="btn btn-primary btn-block mb-4" onClick={loginUser} >
          Log in
        </button>

        <div className="text-center">
          <p>
            Not a member? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
