"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const authValidator_1 = require("../validators/authValidator");
const handleValidation_1 = __importDefault(require("../middleware/handleValidation"));
const router = (0, express_1.Router)();
router.post('/register', authValidator_1.registerValidator, handleValidation_1.default, authController_1.register);
router.post('/login', authValidator_1.loginValidator, handleValidation_1.default, authController_1.login);
router.get('/me', auth_1.authMiddleware, authController_1.me);
exports.default = router;
