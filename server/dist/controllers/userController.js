"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = void 0;
const models_1 = require("../models");
const listUsers = async (req, res) => {
    try {
        const where = {};
        if (req.query.role)
            where.role = req.query.role;
        const users = await models_1.User.findAll({
            where,
            attributes: ['id', 'name', 'email', 'role'],
            order: [['name', 'ASC']],
        });
        return res.json(users);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.listUsers = listUsers;
