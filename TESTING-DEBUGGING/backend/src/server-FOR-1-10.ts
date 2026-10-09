
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Working endpoint
app.get("/api/users", (_req, res) => {
  res.json({
    success: true,
    users: [
      { id: 1, name: "Ravi Kumar", email: "ravi@example.com" },
      { id: 2, name: "Priya Sharma", email: "priya@example.com" },
      { id: 3, name: "Arjun Reddy", email: "arjun@example.com" },
    ],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Debugging API running at http://localhost:${PORT}`);
});
