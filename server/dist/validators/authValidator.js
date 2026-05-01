"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),
    (0, express_validator_1.body)('role').isIn(['admin', 'member']).withMessage('Invalid role'),
];
exports.loginValidator = [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').exists()];
