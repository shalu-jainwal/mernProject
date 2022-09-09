import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const EditProduct = () => {

  const navigate = useNavigate();  
  const { id } = useParams();

  const[editProduct, setEditProduct]  = useState({
    pname:"",
    pprice:"",
    pdesc:"",
    icount:"",
  });

  const{ pname, pprice, pdesc, icount } = editProduct; 

  const onInputChange = e => {
    console.log(e.target.value);
    setEditProduct({...editProduct,[e.target.name]: e.target.value})
  }

  useEffect(() => {
    loadUser();
  },[]);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, editProduct);
    navigate("/products");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setEditProduct(result.data);
  };

  return (
    <div className="container col-lg-6 mt-5">
     <h2>Edit A User</h2>
        <form onSubmit={e => onSubmit(e)}>
        <div className="form-outline mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Product Name"
                    name="pname"
                    value={pname}
                    onChange={e => onInputChange(e)}
                />
            </div>
            <div className="form-outline mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Product Price"
                    name="pprice"
                    value={pprice}
                    onChange={e => onInputChange(e)}
                />
            </div>
            <div className="form-outline mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Product Description"
                    name="pdesc"
                    value={pdesc}
                    onChange={e => onInputChange(e)}
                />
            </div>
            <div className="form-outline mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Inventory Count"
                    name="icount"
                    value={icount}
                    onChange={e => onInputChange(e)}
                />
            </div>

            <button className="btn btn-primary w-100">Update Product</button>
        </form>
    </div>
  )
}

export default EditProduct