"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    port: Number(process.env.PORT) || 5000,
    databaseUrl: process.env.DATABASE_URL || "",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    nodeEnv: process.env.NODE_ENV || "development",
};
//# sourceMappingURL=env.js.map