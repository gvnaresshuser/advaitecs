// npm install express

import express from "express";
const app = express();
const PORT = 5000;
// Hello World endpoint
// GET http://localhost:5000/api/hello
app.get("/api/hello", (req, res) => {
  res.status(200).json({
    message: "Hello World!Express JS",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
/*

Client Request
      ↓
app.get("/api/hello", ...)
      ↓
Does URL match /api/hello?
      │
   ┌──┴───┐
   │      │
  YES     NO
   │      │
   ↓      ↓
Response  app.use((req, res) => {
             404 Response
          })
*/
/*
------------------------------------------
// 404 - Route not found - This is middleware in Express:
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
}); 
------------------------------------------
*/
/*
ES Modules (import/export) are the modern standardized JavaScript module system, 
while CommonJS (require/module.exports) is Node.js's older, traditional module system.
| Feature                 | ES Module                         | CommonJS                         |
| ----------------------- | --------------------------------- | -------------------------------- |
| package.json            | `"type": "module"`                | `"type": "commonjs"`             |
| Import                  | `import`                          | `require()`                      |
| Export                  | `export`                          | `module.exports`                 |
| Standard                | Modern JS standard                | Node.js traditional system       |
| React/Vite similarity   | ⭐⭐⭐⭐⭐                             | ⭐⭐                               |
| Modern Node.js          | ✅                                 | ✅                                |
| Dynamic loading         | `import()`                        | `require()`                      |
| File extension behavior | Often `.js` explicitly in imports | Usually extension can be omitted |
| Older Node.js code      | Less common                       | Very common                      |

Frontend                     Backend
────────────────────────────────────────
React/Vite                   Node/Express
     ↓                            ↓
import                         import
export                         export
     ↓                            ↓
ES Modules                    ES Modules
*/
/*
const app = express(); creates the Express application object, 
and this app object provides methods for handling all the major HTTP operations.
| HTTP Method | Express method | Example                         |
| ----------- | -------------- | ------------------------------- |
| GET         | `app.get()`    | `app.get("/users", ...)`        |
| POST        | `app.post()`   | `app.post("/users", ...)`       |
| PUT         | `app.put()`    | `app.put("/users/:id", ...)`    |
| PATCH       | `app.patch()`  | `app.patch("/users/:id", ...)`  |
| DELETE      | `app.delete()` | `app.delete("/users/:id", ...)` |

const express = require("express");

const app = express();

app.use(express.json());

// GET
app.get("/api/users", (req, res) => {
  res.json({ message: "GET - Fetch users" });
});

// POST
app.post("/api/users", (req, res) => {
  res.json({ message: "POST - Create user" });
});

// PUT
app.put("/api/users/:id", (req, res) => {
  res.json({ message: "PUT - Replace user" });
});

// PATCH
app.patch("/api/users/:id", (req, res) => {
  res.json({ message: "PATCH - Update part of user" });
});

// DELETE
app.delete("/api/users/:id", (req, res) => {
  res.json({ message: "DELETE - Delete user" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
*/
