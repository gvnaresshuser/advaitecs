"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_js_1 = require("./config/env.js");
const pool_js_1 = require("./db/pool.js");
const app = (0, express_1.default)();
// ==========================================
// Security Middleware
// ==========================================
app.use((0, helmet_1.default)());
// ==========================================
// CORS
// ==========================================
app.use((0, cors_1.default)({
    origin: env_js_1.env.corsOrigin,
    credentials: env_js_1.env.corsCredentials,
}));
// ==========================================
// Body Parsers
// ==========================================
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ==========================================
// Cookie Parser
// ==========================================
app.use((0, cookie_parser_1.default)());
// ==========================================
// Health Check
// ==========================================
//http://localhost:5000/api/health
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "JWT Cookies API is running",
    });
});
//http://localhost:5000/api/health/db
app.get("/api/health/db", async (_req, res) => {
    try {
        const result = await pool_js_1.pool.query("SELECT NOW() AS current_time");
        res.status(200).json({
            success: true,
            message: "PostgreSQL connection successful",
            data: result.rows[0],
        });
    }
    catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({
            success: false,
            message: "PostgreSQL connection failed",
        });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map