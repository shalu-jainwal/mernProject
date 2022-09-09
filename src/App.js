import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/users/ProductList";
import AddProduct from "./components/users/AddProduct";
import EditProduct from "./components/users/EditProduct";

const App = () => {
  return (
    <div>
      <>
        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/products" element={<Products />} />

          <Route exact path="/users/add" element={<AddProduct />} />

          <Route exact path="/users/edit/:id" element={<EditProduct />} />

          <Route exact path="/users/:id" element={<ProductList />} />

        </Routes>
      </>
    </div>
  );
};

export default App;
