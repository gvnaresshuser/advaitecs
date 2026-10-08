//npm install express
const express = require("express");
const app = express();
const PORT = 5000;
// Hello World endpoint
// GET http://localhost:5000/api/hello
app.get("/api/hello", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});
// 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
