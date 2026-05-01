"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidator = void 0;
const express_validator_1 = require("express-validator");
exports.projectValidator = [
    (0, express_validator_1.body)('name').isLength({ min: 3, max: 200 }).withMessage('Name must be 3-200 chars'),
];
exports.default = exports.projectValidator;
