import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com" },
  { id: 2, name: "Priya Reddy", email: "priya@example.com" },
  { id: 3, name: "Arjun Kumar", email: "arjun@example.com" },
];

app.get("/api/users", (_req, res) => {
  res.json({
    success: true,
    users,
  });
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body as { name?: string };

  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  user.name = name.trim();

  return res.json({
    success: true,
    user,
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});