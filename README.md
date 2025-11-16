🚀 Tech Stack
Frontend

React.js
Axios
CSS / Bootstrap


Backend

Node.js
Express.js
MySQL
Multer
Nodemon (for development)

🛠️ Features

✔ Create Recipe
✔ Read Recipe List
✔ Update Recipe Details
✔ Delete Recipe
✔ Upload Recipe Images
✔ MySQL Database Integration

🗄️ Database Setup (MySQL Workbench)

1.Open MySQL Workbench
2.Connect to your MySQL server
3.Open the file:
backend/recipeStructure.sql
4.Run the SQL script to create the database & tables.

🖥️ How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/your-username/recipe-project.git
cd recipe-project


🎨 Frontend Setup
cd frontend
npm install
npm start

This will start your React app on:
👉 http://localhost:3000



🔧 Backend Setup
cd backend
npm install

Run in development (requires Nodemon):
npm run dev

OR run normally with Node
node server.js

Backend runs on:
👉 http://localhost:4000



🧪 API Endpoints
| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | /recipes     | Get all recipes |
| POST   | /recipes     | Create recipe   |
| PUT    | /recipes/:id | Update recipe   |
| DELETE | /recipes/:id | Delete recipe   |
