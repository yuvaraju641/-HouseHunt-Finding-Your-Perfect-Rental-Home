import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/getallproperties",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load properties");
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <div className="admin-wrapper">
      <div className="admin-card">
        <h2 className="admin-title">All Properties</h2>

        <div className="admin-table-header">
          <span>Property ID</span>
          <span>Owner ID</span>
          <span>Type</span>
          <span>Ad Type</span>
          <span>Address</span>
          <span>Contact</span>
          <span>Amount</span>
        </div>

        {allProperties.map((property) => (
          <div key={property._id} className="admin-table-row">
            <span>{property._id}</span>
            <span>{property.ownerId}</span>
            <span>{property.propertyType}</span>
            <span>{property.propertyAdType}</span>
            <span>{property.propertyAddress}</span>
            <span>{property.ownerContact}</span>
            <span>₹{property.propertyAmt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperty;
