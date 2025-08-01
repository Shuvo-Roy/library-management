"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("../controllers/borrow.controller");
const validate_request_1 = require("../middlewares/validate.request");
const borrow_validation_1 = require("../validations/borrow.validation");
const router = express_1.default.Router();
router.post('/', (0, validate_request_1.validateRequest)(borrow_validation_1.borrowBookSchema), borrow_controller_1.borrowBook);
router.get('/', borrow_controller_1.getBorrowSummary);
exports.default = router;
