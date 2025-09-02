THE TECH HUB: A MERN Stack E-commerce Platform
Overview
THE TECH HUB is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). It features a modern, responsive user interface and a robust backend for managing products, users, and orders. The application includes advanced features like AI-powered product recommendations using a vector database.

Live Demo
You can view the live version of this project here:
Live Site: [Your Live Website URL Here]

Key Features
User Authentication: Secure user registration, login, and profile management.

Product Catalog: A comprehensive list of products with detailed descriptions and images.

Shopping Cart: Users can add, remove, and update items in their shopping cart.

Product Search: A powerful search functionality to find products quickly.

Order Management: Users can view their order history and track the shipping status of their purchases.

AI-Powered Recommendations: The "Recommended For You" feature uses a vector database to provide personalized product suggestions.

Technology Stack
Frontend
React: A JavaScript library for building user interfaces.

Material-UI: A popular React UI framework for creating sleek and responsive designs.

React Router: For handling client-side routing.

Redux (or Context API): For state management.

Backend
Node.js: A JavaScript runtime for building the server-side application.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

MongoDB: A NoSQL document database for storing application data.

Mongoose: An object data modeling (ODM) library for MongoDB and Node.js.

Other Services
Weaviate Cloud: An AI-native vector database for semantic search and product recommendations.

MongoDB Atlas: A cloud-based database service for hosting MongoDB.

Getting Started
Prerequisites
Node.js (v18 or higher)

npm (v8 or higher)

Git

Installation
Clone the repository:

git clone [https://github.com/Adhithya017/THE-TECH-HUB-MERN.git](https://github.com/Adhithya017/THE-TECH-HUB-MERN.git)
cd THE-TECH-HUB-MERN

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../client
npm install

Environment Variables
Create a .env file in the backend directory and add the following variables.

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
WEAVIATE_HOST=your_weaviate_host_url
WEAVIATE_API_KEY=your_weaviate_api_key
GOOGLE_AI_API_KEY=your_google_ai_key

Running the Application
Start the backend server (from the backend directory):

npm start

Start the frontend application (from the client directory in a new terminal):

npm start

The application will be available at http://localhost:3000.

Author
Adhithya

[Your LinkedIn Profile URL]

[Your GitHub Profile URL]
