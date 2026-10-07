"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_js_1 = require("./config/env.js");
const join_routes_js_1 = __importDefault(require("./routes/join.routes.js"));
const not_found_middleware_js_1 = require("./middleware/not-found.middleware.js");
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const app = (0, express_1.default)();
// ============================================================
// MIDDLEWARE
// ============================================================
app.use((0, cors_1.default)({
    origin: env_js_1.env.frontendUrl,
}));
app.use(express_1.default.json());
// ============================================================
// ROOT
// ============================================================
app.get("/", (_req, res) => {
    res.json({
        message: "PostgreSQL JOIN Demonstration API",
    });
});
// ============================================================
// JOIN ROUTES
// ============================================================
app.use("/api/joins", join_routes_js_1.default);
// ============================================================
// 404
// ============================================================
app.use(not_found_middleware_js_1.notFoundMiddleware);
// ============================================================
// ERROR HANDLING
// ============================================================
app.use(error_middleware_js_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map