"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// errror validation
const errorHandler = (err, _req, res, _next) => {
    res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: err,
    });
};
exports.errorHandler = errorHandler;
