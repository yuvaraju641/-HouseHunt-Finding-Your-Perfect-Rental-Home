import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get(`http://localhost:8001/api/user/getAllProperties`);
         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
      <div className="table-container">
         <table>
            <thead>
               <tr>
                  <th>Property ID</th>
                  <th>Property Type</th>
                  <th>Ad Type</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Availability</th>
               </tr>
            </thead>
            <tbody>
               {allProperties.length === 0 ? (
                  <tr>
                     <td colSpan="6" style={{ textAlign: 'center', color: '#8a9aa8' }}>
                        No properties found
                     </td>
                  </tr>
               ) : (
                  allProperties.map((property) => (
                     <tr key={property._id}>
                        <td>{property._id}</td>
                        <td>{property.propertyType || 'N/A'}</td>
                        <td>{property.propertyAdType || 'N/A'}</td>
                        <td>{property.propertyAddress || 'N/A'}</td>
                        <td>{property.propertyAmt || 'N/A'}</td>
                        <td>
                           <span style={{
                              color: property.isAvailable ? '#00ff88' : '#ff4d4d',
                              fontWeight: '600'
                           }}>
                              {property.isAvailable ? 'Available' : 'Unavailable'}
                           </span>
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </div>
   );
};

export default AllProperty;