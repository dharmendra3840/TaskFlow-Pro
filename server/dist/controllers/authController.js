"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
dotenv_1.default.config();
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await models_1.User.findOne({ where: { email } });
        if (existing)
            return res.status(400).json({ message: 'Email already in use' });
        const hash = await bcrypt_1.default.hash(password, 10);
        const user = await models_1.User.create({ name, email, password: hash, role });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await models_1.User.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });
        const valid = await bcrypt_1.default.compare(password, user.password);
        if (!valid)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.login = login;
const me = async (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ message: 'Unauthorized' });
    return res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
};
exports.me = me;
