import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../App.css";

const Products = () => {

  const navigate = useNavigate();
  const[userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);

  const callProductPage = async () => {
    try{
      const res = await fetch("/productlist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err) {
      console.log(err);
      navigate("/login");
    }
  }

  useEffect(() => {
    callProductPage();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUsers(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  return (
    <>

    <Link to={userData.role === "Admin" ? "/users/add" : "/products"}>
        <button className="btn btn-outline-primary add-product-btn">Add A Product</button>
      </Link>
    <div className="container">
        <table className="table caption-top border shadow">
          <caption><h1>List of  Products</h1></caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Product Description</th>
              <th scope="col">Inventory Count</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{userData._id}</td>
                <td>{user.pname}</td>
                <td>{user.pprice}</td>
                <td>{user.pdesc}</td>
                <td>{user.icount}</td>
                
                <td>
                  <Link to={((userData.role === "Admin") || (userData.role === "Manager")) && `/users/${user.id}`}>
                    <button
                      type="button"
                      className="btn btn-outline-primary link-button"
                    >
                      View
                    </button>
                  </Link>

                  <Link to={((userData.role === "Admin") || (userData.role === "Manager")) && `/users/edit/${user.id}`}>
                    <button
                      type="button"
                      className="btn btn-outline-primary link-button"
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="btn btn-danger link-button"
                    onClick={ () => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products