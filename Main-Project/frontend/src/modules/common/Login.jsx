import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return message.error("Please fill all fields");
    }

    axios.post("/api/user/login", data)
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          const user = res.data.user;

          if (user.type === "Admin") navigate("/adminhome");
          else if (user.type === "Owner") navigate("/ownerhome");
          else navigate("/renterhome");

        } else {
          message.error(res.data.message);
        }
      })
      .catch(() => {
        message.error("Login failed");
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />

          <button type="submit" className="primary-btn">
            Sign In
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <span style={{ color: "#ff4d4d" }}>Forgot Password?</span>{" "}
          <Link to="/forgotpassword">Click here</Link>
        </div>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <span style={{ color: "#ff4d4d" }}>Don't have an account?</span>{" "}
          <Link to="/register">Create an Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
