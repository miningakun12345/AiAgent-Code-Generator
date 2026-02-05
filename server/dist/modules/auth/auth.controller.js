"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', async (req, res) => {
    // TODO: Implement login
    res.json({ message: 'Login endpoint' });
});
exports.authRouter.post('/register', async (req, res) => {
    // TODO: Implement register
    res.json({ message: 'Register endpoint' });
});
