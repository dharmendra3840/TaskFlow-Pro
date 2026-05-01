"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', auth_1.authMiddleware, (0, roleCheck_1.roleCheck)('admin'), userController_1.listUsers);
exports.default = router;
