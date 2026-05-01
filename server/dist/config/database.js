"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: path_1.default.resolve(__dirname, '../../taskflow.db'),
    logging: false,
});
exports.default = exports.sequelize;
