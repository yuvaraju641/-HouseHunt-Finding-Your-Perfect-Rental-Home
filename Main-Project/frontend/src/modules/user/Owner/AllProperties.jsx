import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProperties = () => {
   const [image, setImage] = useState(null);
   const [editingPropertyId, setEditingPropertyId] = useState(null);
   const [editingPropertyData, setEditingPropertyData] = useState({
      propertyType: '',
      propertyAdType: '',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });
   const [allProperties, setAllProperties] = useState([]);
   const [show, setShow] = useState(false);

   const handleClose = () => {
      setShow(false);
      setEditingPropertyId(null);
   };

   const handleShow = (propertyId) => {
      const propertyToEdit = allProperties.find(property => property._id === propertyId);
      if (propertyToEdit) {
         setEditingPropertyId(propertyId);
         setEditingPropertyData(propertyToEdit);
         setShow(true);
      }
   };

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error('Something went wrong');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingPropertyData({ ...editingPropertyData, [name]: value });
   };

   const saveChanges = async (propertyId) => {
      try {
         const formData = new FormData();
         formData.append('propertyType', editingPropertyData.propertyType);
         formData.append('propertyAdType', editingPropertyData.propertyAdType);
         formData.append('propertyAddress', editingPropertyData.propertyAddress);
         formData.append('ownerContact', editingPropertyData.ownerContact);
         formData.append('propertyAmt', editingPropertyData.propertyAmt);
         formData.append('additionalInfo', editingPropertyData.additionalInfo);
         if (image) formData.append('propertyImage', image);

         const res = await axios.patch(
            `http://localhost:8001/api/owner/updateproperty/${propertyId}`,
            formData,
            { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }
         );
         if (res.data.success) {
            message.success(res.data.message);
            handleClose();
            getAllProperty();
         }
      } catch (error) {
         console.log(error);
         message.error('Failed to save changes');
      }
   };

   return (
      <div className="table-container">
         <table>
            <thead>
               <tr>
                  <th>Property ID</th>
                  <th>Property Type</th>
                  <th>Property Ad Type</th>
                  <th>Property Address</th>
                  <th>Owner Contact</th>
                  <th>Property Amt</th>
                  <th>Availability</th>
               </tr>
            </thead>
            <tbody>
               {allProperties.length === 0 ? (
                  <tr>
                     <td colSpan="8" style={{ textAlign: 'center', color: '#8a9aa8' }}>
                        No properties found
                     </td>
                  </tr>
               ) : (
                  allProperties.map((property) => (
                     <tr key={property._id}>
                        <td>{property._id}</td>
                        <td>{property.propertyType}</td>
                        <td>{property.propertyAdType}</td>
                        <td>{property.propertyAddress}</td>
                        <td>{property.ownerContact}</td>
                        <td>{property.propertyAmt}</td>
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

         {/* DARK THEMED MODAL */}
         {show && (
            <div style={{
               position: 'fixed',
               top: 0, left: 0,
               width: '100%', height: '100%',
               background: 'rgba(0,0,0,0.7)',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               zIndex: 1000
            }}>
               <div style={{
                  background: '#0f2027',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '30px',
                  width: '600px',
                  maxWidth: '90%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: '0 0 40px rgba(0,0,0,0.8)'
               }}>
                  {/* Modal Header */}
                  <div style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     marginBottom: '25px',
                     borderBottom: '1px solid rgba(255,255,255,0.1)',
                     paddingBottom: '15px'
                  }}>
                     <h4 style={{ color: 'white', margin: 0 }}>Edit Property</h4>
                     <button onClick={handleClose} style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '24px',
                        cursor: 'pointer',
                        lineHeight: 1
                     }}>×</button>
                  </div>

                  {/* Modal Body */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>

                     <div>
                        <label style={{ color: '#8a9aa8', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
                           Property Type
                        </label>
                        <select name='propertyType' value={editingPropertyData.propertyType} onChange={handleChange}>
                           <option value="" disabled>Choose...</option>
                           <option value="residential">Residential</option>
                           <option value="commercial">Commercial</option>
                           <option value="land/plot">Land/Plot</option>
                        </select>
                     </div>

                     <div>
                        <label style={{ color: '#8a9aa8', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
                           Property Ad Type
                        </label>
                        <select name='propertyAdType' value={editingPropertyData.propertyAdType} onChange={handleChange}>
                           <option value="" disabled>Choose...</option>
                           <option value="rent">Rent</option>
                           <option value="sale">Sale</option>
                        </select>
                     </div>

                     <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ color: '#8a9aa8', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
                           Property Full Address
                        </label>
                        <input
                           type="text"
                           placeholder="Address"
                           name='propertyAddress'
                           value={editingPropertyData.propertyAddress}
                           onChange={handleChange}
                        />
                     </div>

                     <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ color: '#8a9aa8', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
                           Property Image
                        </label>
                        <input type="file" accept='image/*' name='image' onChange={handleImageChange} />
                     </div>

                     <div>
                        <label style={{ color: '#8a9aa8', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
                           Owner Contact No.
                        </label>
                        <input
                           type="tel"
                           placeholder="Contact number"
                           name='ownerContact'
                           value={editingPropertyData.ownerContact}
                           onChange={handleChange}
                        />
                     </div>

                     <div>
                        <label style={{ color: '#8a9aa8', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
                           Property Amt.
                        </label>
                        <input
                           type="number"
                           placeholder="Amount"
                           name='propertyAmt'
                           value={editingPropertyData.propertyAmt}
                           onChange={handleChange}
                        />
                     </div>

                     <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ color: '#8a9aa8', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
                           Additional Details
                        </label>
                        <textarea
                           placeholder="Additional details for the Property"
                           name='additionalInfo'
                           value={editingPropertyData.additionalInfo}
                           onChange={handleChange}
                           style={{ minHeight: '100px' }}
                        />
                     </div>
                  </div>

                  {/* Modal Footer */}
                  <div style={{
                     display: 'flex',
                     justifyContent: 'flex-end',
                     gap: '10px',
                     marginTop: '20px',
                     borderTop: '1px solid rgba(255,255,255,0.1)',
                     paddingTop: '15px'
                  }}>
                     <button onClick={handleClose} style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                     }}>
                        Cancel
                     </button>
                     <button
                        className="primary-btn"
                        onClick={() => saveChanges(editingPropertyId)}
                     >
                        Update
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default AllProperties;