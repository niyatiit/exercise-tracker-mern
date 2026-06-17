# 🏃‍♂️ Exercise Tracker API

A full-stack Exercise Tracker built using **Node.js, Express, and MongoDB (Mongoose)**.  
This project allows users to be created, exercises to be logged, and full exercise history to be retrieved with optional filtering.
---

## 📌 Features

- Create new users
- Get all users
- Add exercises for a user
- Store description, duration, and date
- Auto date handling (default current date)
- Retrieve full exercise logs
- Filter logs using:
  - `from` date
  - `to` date
  - `limit`

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

---

## 📂 API Endpoints

### ➤ Create User

**Form Data:**

**Response:**
```json
{
"username": "fcc_test",
"\_id": "unique_id"
}

GET /api/users
[
{
"\_id": "id",
"username": "fcc_test"
}
]


POST /api/users/:_id/exercises

description: Running
duration: 30
date: 2026-01-01 (optional)

{
"\_id": "user_id",
"username": "fcc_test",
"date": "Mon Jan 01 2026",
"duration": 30,
"description": "Running"
}


Installation & Setup 
git clone https://github.com/your-username/exercise-tracker.git
cd exercise-tracker
npm install

Environments Variables
MONGO_URI=your_mongodb_connection_string
PORT=3000

Run Project
num run dev


---

If you want next, I can also:
✅ fix your Render error  
✅ improve project for FCC test passing 100%  
✅ or help you write resume project description (very important)
