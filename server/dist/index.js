"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const projects_1 = __importDefault(require("./routes/projects"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const users_1 = __importDefault(require("./routes/users"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const database_1 = require("./config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("./models");
require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/tasks', tasks_1.default);
app.use('/api/users', users_1.default);
app.use('/api/dashboard', dashboard_1.default);
const port = process.env.PORT || 5000;
const demoUsers = [
    { name: 'Admin', email: 'admin@test.com', role: 'admin' },
    { name: 'Admin', email: 'admin@example.com', role: 'admin' },
    { name: 'Member 1', email: 'member1@test.com', role: 'member' },
];
const seedDemoUsers = async () => {
    const passwordHash = await bcrypt_1.default.hash('TaskFlow123!', 10);
    for (const demoUser of demoUsers) {
        const existing = await models_1.User.findOne({ where: { email: demoUser.email } });
        if (existing) {
            await existing.update({
                name: demoUser.name,
                role: demoUser.role,
                password: passwordHash,
            });
            continue;
        }
        await models_1.User.create({
            name: demoUser.name,
            email: demoUser.email,
            password: passwordHash,
            role: demoUser.role,
        });
    }
};
const start = async () => {
    try {
        await database_1.sequelize.authenticate();
        await database_1.sequelize.sync();
        await seedDemoUsers();
        app.listen(port, () => console.log(`Server started on ${port}`));
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
