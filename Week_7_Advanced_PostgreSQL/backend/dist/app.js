"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({
        message: "Week 7 Advanced PostgreSQL API",
    });
});
app.use("/api/departments", department_routes_1.default);
app.use("/api/employees", employee_routes_1.default);
app.use("/api/projects", project_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map