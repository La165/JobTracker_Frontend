# 💼 Job Tracker Frontend

A modern and responsive **Job Tracking Application Frontend** built using React. This app helps users manage job applications efficiently with authentication and job tracking features.

---

## 🚀 Live Demo

🔗 https://job-tracker-frontend-orpin.vercel.app

---

## 🔗 Backend Repository

Backend API is available here:
👉 https://github.com/La165/JobTracker_Backend

Live API:
👉 https://jobtracker-backend-znvo.onrender.com

---

## 🛠️ Tech Stack

* ⚛️ React.js
* 🎨 CSS
* 🌐 Axios (API communication)
* 🧑‍💻 VS Code (Development Environment)
* ☁️ Vercel (Deployment)

---

## 📂 Folder Structure

```
src/
│
├── App.js
├── App.css
│
├── components/
│   ├── AddJob.js
│   ├── AddJob.css
│   ├── JobList.js
│   ├── JobList.css
│
├── pages/
│   ├── Login.js
│   ├── Register.js
│   ├── Auth.css
│   ├── Dashboard.js
│   ├── Dashboard.css
│
├── services/
│   └── api.js
```

---

## ✨ Features

* 🔐 User Authentication (Login & Register)
* 📋 Add and Manage Job Applications
* 🔍 Search and Filter Jobs
* 🧾 View Job Listings
* 🔄 Dynamic data fetching from backend APIs
* 🔒 Secure API calls using JWT Token

---

## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/<frontend-repo>
   cd job-tracker-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://jobtracker-backend-znvo.onrender.com
```

Update `src/services/api.js`:

```js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default API;
```

---

## 🔐 Authentication Flow

* User registers or logs in
* JWT token is received from backend
* Token is stored in localStorage
* Token is sent in headers for protected APIs

Example:

```js
Authorization: Bearer <token>
```

---

## 🚀 Deployment

This frontend is deployed using **Vercel**:

* Push code to GitHub
* Import repository in Vercel
* Deploy automatically

---

## 📸 Screenshots

*Add screenshots here (optional but recommended)*

---

## 📌 Future Enhancements

* 📊 Dashboard analytics
* ✏️ Edit/Delete job functionality
* 📱 Improved mobile responsiveness
* 🌙 Dark mode

---

## 👩‍💻 Author

**Lalitha**

---

