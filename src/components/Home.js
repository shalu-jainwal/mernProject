import React from "react";

const Home = () => {
  return (
    <>
      <div className="container-fluid text-dark p-5 col-md-6">
        <div className="container p-5">
          <i className="fas fa-key fa-6x"></i>
          <h1 className="display-3">Hello, User</h1>
          <p className="lead">Please login or register!</p>
          <hr />
          <a className="btn btn-light btn-lg" href="/register" role="button">
            Register
          </a>
          <a className="btn btn-dark btn-lg" href="/login" role="button">
            Login
          </a>
        </div>
      </div>

      

      
    </>
  );
};

export default Home;
