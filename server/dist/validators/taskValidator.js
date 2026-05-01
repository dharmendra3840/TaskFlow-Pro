"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidator = void 0;
const express_validator_1 = require("express-validator");
exports.taskValidator = [
    (0, express_validator_1.body)('title').isLength({ min: 3, max: 300 }).withMessage('Title length invalid'),
    (0, express_validator_1.body)('priority').isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority'),
    (0, express_validator_1.body)('projectId').notEmpty().withMessage('projectId required'),
];
