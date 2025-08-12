# mern-expense-tracker
A web app where users can track their daily income and expenses, view charts, and set monthly budgets.

## Core Features
- User Authentication (JWT-based login/signup)
- Add / Edit / Delete Transactions
    - Fields: title, amount, type (income/expense), date, category
- View Monthly Summary
- Category-wise Pie Chart (e.g., Food, Travel, Rent) (Enhancement)
- Budget Warning (if spending exceeds budget)
- Responsive UI (mobile + desktop) (Enhancement)
- Add CSV export of transactions (Enhancement)

## Tech Stack
- Frontend: React (React Router, Axios)
- Backend: Node.js + Express.js
- Database: MongoDB (Mongoose ODM)
- Auth: JSON Web Token (JWT) + bcrypt

---

## API Endpoints

| Method | Endpoint                 | Description          |
|--------|--------------------------|----------------------|
| POST   | `/api/auth/register`      | Register user        |
| POST   | `/api/auth/login`         | Login user           |
| GET    | `/api/transactions`       | Get all user transactions |
| POST   | `/api/transactions`       | Add transaction      |
| PUT    | `/api/transactions/:id`   | Update transaction   |
| DELETE | `/api/transactions/:id`   | Delete transaction   |

---

## Database Schema
**User**
```
{
  username: String,
  email: String,
  password: String,
  budget: Number
}
```
**Transaction**
```
{
  userId: ObjectId,
  title: String,
  amount: Number,
  type: String, // 'income' or 'expense'
  category: String,
  date: Date
}
```

## Setup Instructions
### Prerequisites
- Node.js (v16+ recommended)
- npm / yarn
- MongoDB Atlas account or local MongoDB installation

### Clone the repository
```
git clone https://github.com/yourusername/mern-expense-tracker.git
cd mern-expense-tracker
```

### Backend Setup
1. Navigate to the backend folder
```
cd backend
```
2. Install dependencies:
```
npm install
```
3. Create a .env file by copying the example or create manually:
```
cp .env.example .env
```
4. Edit .env file
```
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
5. Start the backend server
```
npm run dev
```

### Frontend Setup
1. Navigate to the frontend folder
```
cd ../frontend
```
2. Install dependencies
```
npm install
```
3. Start the frontend dev server
```
npm run dev
```
4. Open your browser at http://localhost:5173 (or the URL shown in the terminal).

## Notes
- If you want to test locally without MongoDB Atlas, install MongoDB locally and update `MONGO_URI` accordingly.
- The JWT secret (`JWT_SECRET`) should be a strong random string to keep tokens secure.
- The project currently lacks field validations and some UI enhancements (see TODOs below).

## TODOs
- Add field validations
- Improve Login / Register UI and functionality
- Add icons
- Budget warning implementation
- CSV export feature
- Pie chart for category-wise summary
- Make UI fully mobile responsive
- Perform Unit Testing for code quality

## Folder Structure

```
mern-expense-tracker/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── transactionController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Transaction.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TransactionForm.jsx
    │   │   └── TransactionList.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```