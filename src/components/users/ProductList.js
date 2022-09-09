import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [viewProduct, setViewProduct] = useState({
    pname:"",
    pprice:"",
    pdesc:"",
    icount:"",
  });
  
  const{ id } = useParams();

  useEffect(() => {
    loadUser();
  },[]);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setViewProduct(res.data);
  };

  return (
    <div className="container py-4">
        <Link to="/"><button className="btn btn-primary">Back To Home</button></Link>
        <h1 className="display-4">Product Id: {id}</h1>
        <hr />
        <ul className="list-group w-50">
            <li className="list-group-item">Product Name: {viewProduct.pname}</li>
            <li className="list-group-item">Product Price: {viewProduct.pprice}</li>
            <li className="list-group-item">Product Description: {viewProduct.pdesc}</li>
            <li className="list-group-item">Inventory Count: {viewProduct.icount}</li>
        </ul>
    </div>
  )
};

export default ProductList;
