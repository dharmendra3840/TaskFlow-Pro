"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
dotenv_1.default.config();
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ message: 'Unauthorized' });
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'secret';
        const payload = jsonwebtoken_1.default.verify(token, secret);
        const user = await models_1.User.findByPk(payload.id);
        if (!user)
            return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
