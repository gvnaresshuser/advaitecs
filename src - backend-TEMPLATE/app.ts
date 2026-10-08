import express from "express";
import cors from "cors";

import departmentRoutes from "./routes/department.routes";
import employeeRoutes from "./routes/employee.routes";
import projectRoutes from "./routes/project.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Week 7 Advanced PostgreSQL API",
  });
});

app.use(
  "/api/departments",
  departmentRoutes
);

app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

export default app;