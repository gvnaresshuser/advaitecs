"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const notFoundMiddleware = (_req, res, _next) => {
    res.status(404).json({
        message: "Route not found",
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
//# sourceMappingURL=not-found.middleware.js.map