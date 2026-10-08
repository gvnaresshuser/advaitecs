// npm install express

import express from "express";
import logger from "./middleware/logger.js";
const app = express();
const PORT = 5000;
// Register middleware
//app.use(logger);//LOGGER IS USED FOR EVERY REQUEST
// Hello World endpoint
// GET http://localhost:5000/api/hello
app.get("/api/hello", (req, res) => {
  res.status(200).json({
    message: "Hello World!Express JS",
  });
});
// logger is used only for this route
app.get("/api/hai", logger, (req, res) => {
  //LOGGER IS USED FOR THIS REQUEST
  res.status(200).json({
    message: "Hai World! Express JS",
  });
});
//--------------------------------------------------------------
// 404 - Route not found - This is middleware in Express:
/* app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
}); */
//----------------------------------------------------------------
/* app.use((req, res, next) => {
  console.log("Middleware 1 executed");
  next();
});

app.use((req, res) => {
  console.log("Middleware 2 executed");
  res.status(404).json({
    message: "Route not found",
  });
}); */
//----------------------------------------------------------------
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
