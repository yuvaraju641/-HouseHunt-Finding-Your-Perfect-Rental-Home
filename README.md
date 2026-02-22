# 🏠 HouseHunt  
### Smart Rental Property Management Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to simplify property listing, searching, and booking.

---

## 🚀 Project Overview

HouseHunt is a rental property management platform that connects renters and property owners.  
It provides secure authentication, role-based access control, and an admin dashboard for monitoring platform activities.

---

## 🎯 Features

### 👤 Renter
- User Registration & Login (JWT Authentication)
- Browse available properties
- View property details
- Book rental properties
- View booking history

### 🏢 Owner
- Add new property listings
- Update/Delete properties
- View bookings for owned properties

### 🛡 Admin
- Manage users
- Monitor properties
- Track all bookings
- Maintain system integrity

---

## 🛠 Tech Stack

**Frontend**
- React.js
- HTML5
- CSS3
- JavaScript
- Axios

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Mongoose)

**Authentication**
- JSON Web Token (JWT)

---

## 📂 Project Structure

```
HouseHunt-Finding-Your-Perfect-Rental-Home/
│
├── project/
│   ├── backend/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── middlewares/
│   │   └── index.js
│   │
│   └── frontend/
│       ├── src/
│       ├── public/
│       └── App.js
│
├── Video/
├── Project-Documentation/
└── README.md
```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
https://github.com/yuvaraju641/-HouseHunt-Finding-Your-Perfect-Rental-Home


---

### 2️⃣ Backend Setup
cd project/backend
npm install
npm start


Runs on:
http://localhost:5000


---

### 3️⃣ Frontend Setup
cd project/frontend
npm install
npm start


Runs on:
http://localhost:3000


---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


⚠️ Do not upload `.env` to GitHub.

---

## 🎥 Demo Video

Add your YouTube or Google Drive demo link here.

---

## 🚀 Future Improvements

- Payment Gateway Integration
- Email Notifications
- Advanced Search Filters
- Property Reviews & Ratings
- Cloud Deployment (Render / Vercel)

---

## 👨‍💻 Author

HARIJANA YUVARAJU  
Full Stack MERN Developer

---

## ⭐ Conclusion

HouseHunt demonstrates real-world full-stack development using the MERN stack, including authentication, REST APIs, role-based access control, and modular architecture.
