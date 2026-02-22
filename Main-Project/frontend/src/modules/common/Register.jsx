import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { message } from 'antd';
const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!data?.name || !data?.email || !data?.password||! data?.type ) return alert("Please fill all fields");
    else {
      axios.post('http://localhost:8001/api/user/register', data)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            navigate('/login')

          } else {
            message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };


 return (
  <>
    <div className="auth-container">
      <div className="auth-card">

        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h2>Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Renter Full Name / Owner Name"
            value={data.name}
            onChange={handleChange}
          />

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

          <select
            name="type"
            value={data.type}
            onChange={handleChange}
          >
            <option value="">Select User Type</option>
            <option value="Renter">Renter</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="primary-btn">
            Sign Up
          </button>

        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <span style={{ color: "#ff4d4d" }}>
            Have an account?
          </span>{" "}
          <Link to="/login">Sign In</Link>
        </div>

      </div>
    </div>
  </>
);

}

export default Register
