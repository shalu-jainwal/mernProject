import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  let name, value;

  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value }); //getting all the values of user using spread operator and all the dynamic data he enters.
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { username, phone, email, password, role } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        phone,
        email,
        password,
        role, //name:name, email:email........
      }),
    });

    const data = await res.json(); //verifying response or data coming from server and to not to show our response in a pending state

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration!");
      console.log("Invalid Registration!");
    } else {
      window.alert("Registration Successful!");
      console.log("Registration Successful!");

      navigate("/login");
    }
  };

  return (
    <div className="container col-lg-6 pt-10">
      <h2>Register</h2>
      <form method="POST">
        <div className="form-outline mb-4">
          <input
            type="name"
            name="username"
            value={user.username}
            onChange={handleInput}
            className="form-control"
          />
          <label className="form-label">Username</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
            className="form-control"
            maxLength="10"
          />
          <label className="form-label">Phone</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            className="form-control"
          />
          <label className="form-label">Email</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            className="form-control"
          />
          <label className="form-label">Password</label>
        </div>

        <div className="form-outline mb-4">
          
          <select className="custom-select" name="role" value={user.role} onChange={handleInput}>
            <option selected>Select your role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
          <br/>
          <label className="form-label">Role</label>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          onClick={PostData}
        >
          Register
        </button>

        <div className="text-center">
          <p>
            Already a member? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
