import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {

  const navigate = useNavigate();  

  const[addProduct, setAddProduct]  = useState({
    pname:"",
    pprice:"",
    pdesc:"",
    icount:"",
  });

  const{ pname, pprice, pdesc, icount } = addProduct; 

  const onInputChange = e => {
    console.log(e.target.value);
    setAddProduct({...addProduct,[e.target.name]: e.target.value})
  }

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", addProduct);
    navigate("/products");
  };

  return (
    <div className="container col-lg-6 mt-5">
     <h2>Add A Product</h2>
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

            <button className="btn btn-primary w-100">Add Product</button>
        </form>
    </div>
  )
}

export default AddProduct