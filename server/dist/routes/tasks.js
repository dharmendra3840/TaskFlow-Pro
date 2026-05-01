"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const taskController_1 = require("../controllers/taskController");
const taskValidator_1 = require("../validators/taskValidator");
const handleValidation_1 = __importDefault(require("../middleware/handleValidation"));
const router = (0, express_1.Router)();
router.get('/', auth_1.authMiddleware, taskController_1.listTasks);
router.post('/', auth_1.authMiddleware, (0, roleCheck_1.roleCheck)('admin'), taskValidator_1.taskValidator, handleValidation_1.default, taskController_1.createTask);
router.put('/:id', auth_1.authMiddleware, (0, roleCheck_1.roleCheck)('admin'), taskController_1.updateTask);
router.delete('/:id', auth_1.authMiddleware, (0, roleCheck_1.roleCheck)('admin'), taskController_1.deleteTask);
exports.default = router;
