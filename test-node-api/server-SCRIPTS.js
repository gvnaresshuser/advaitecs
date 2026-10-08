//npm install express
//npm install -g nodemon
import express from "express";
const app = express();
//http://localhost:3000
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/firstendpoint", (req, res) => {
  res.send("Hello from first endpoint!");
});
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
/*
The difference is because start is a special npm lifecycle script, 
while dev is a custom script.
*/

/*
-----------------------------------------------
npm run start
npm start
npm run dev
npm run naressh
-----------------------------------------------
*/
/*
-----------------------------------------------
dev → npm run dev
dev is a custom script.
Therefore:
npm dev
❌ does not work.
You need:
npm run dev
because run tells npm:
"Run a script from the scripts section of package.json."
-----------------------------------------------
*/
