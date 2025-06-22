# 📚 Book Search App
A full-stack MERN (MongoDB, Express, React, Node.js) web application for searching, viewing, and managing a list of books. Users can register, log in, search for books, and view book details in a secure environment using JWT-based authentication.
🔗 [Live Demo](https://booksearch-319j.onrender.com)  
📦 [GitHub Repository](https://github.com/Ganesh6811/Book-Search)
## 📂 Project Structure

## 🚀 Features
- 🔐 JWT-based authentication (login/signup)
- 🔎 Search books using custom backend or external APIs
- 📚 View book details
- 🍪 Authenticated session using cookies
- 🌐 Deployed on **Render**
## 🧰 Tech Stack
**Frontend:** React, Zustand (State Management), Axios, TailwindCSS  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), dotenv, cors, cookie-parser, body-parser
## ⚙️ Getting Started
1. Clone the Repository  
`git clone https://github.com/Ganesh6811/Book-Search.git`  
`cd Book-Search`
2. Setup Environment Variables  
Create a `.env` file inside the `/server` directory:  
`PORT=5000`  
`MONGO_URI=your_mongodb_connection_string`  
`JWT_SECRET=your_jwt_secret`
3. Install Dependencies  
Backend:  
`cd server`  
`npm install`  
Frontend:  
`cd ../client`  
`npm install`
4. Run the Application Locally  
Start Backend:  
`cd server`  
`npm run dev`  
Start Frontend:  
`cd ../client`  
`npm start`

## 📡 API Endpoints
Auth Routes:  
`POST /auth/signUp` – Register a new user  
`POST /auth/login` – Login user  
`GET /auth/checkAuth` – Check authentication status  
`GET /auth/logout` – Logout user  
Book Routes:  
`GET /books/getLatestBooks` – Get all books  
`GET /books/getBookById/:id` – Get book by ID  
`POST /books/searching` – Searhcing for the Books according to the search name and category
## 🙋‍♂️ Author
Made with ❤️ by Ganesh Sudhanagunta
