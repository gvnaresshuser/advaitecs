//const express = require("express");//type="commonjs" - in package.json
//npm install nodemon -D

import express from "express"; //type="module" - in package.json

const app = express();

const PORT = 5000;
//http://localhost:5000
//http://localhost:5000/userdetails
app.get("/userdetails", (req, res) => {
  res.send("Hello Express!this is a test");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
