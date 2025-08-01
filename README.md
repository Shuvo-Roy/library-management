# Library Management API

This project implements a Library Management System using **Express**, **TypeScript**, and **MongoDB** (via Mongoose). It allows users to manage books, track borrowings, and generate summaries of borrowed books with MongoDB's aggregation pipeline.


## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **TypeScript**: Typed superset of JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **ZOD**: For input validation

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or later
- [MongoDB](https://www.mongodb.com/) instance running locally or use MongoDB Atlas
- [Postman](https://www.postman.com/) or similar tool to test API endpoints

### Steps to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/library-management-api.git
   cd library-management-api
2. **Install Dependencies**
```npm install```

3. **Set Up Environment Variables**
Create a .env file in the root directory and add your MongoDB connection string:
```MONGODB_URI=mongodb://localhost:27017/library```
```PORT=5000```

4. **Run the Application**
```npm run dev```
The server will start running on http://localhost:5000.

5. **Test the API**
You can use Postman or any HTTP client to test the following API endpoints.

API Endpoints
1. Create Book
POST /api/books
Request Body:
json
```
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
Response:
json
```
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
2. **Get All Books**
GET /api/books
Response:
json
```
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```
3. **Get Book by ID**
GET /api/books/:bookId
Response:

json
```
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
4. **Update Book**
PUT /api/books/:bookId
Request Body:
json
```
{
  "copies": 50
}
```
Response:
json
```
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

5. **Delete Book**
DELETE /api/books/:bookId
Response:
json
```
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

6. **Borrow a Book**
POST /api/borrow
Request Body:
json
```
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
Response:
json
```
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```


7. **Borrowed Books Summary**
GET /api/borrow
Response:
json
```
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```
