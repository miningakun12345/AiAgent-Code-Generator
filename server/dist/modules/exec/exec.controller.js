"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execRouter = void 0;
const express_1 = require("express");
const exec_service_1 = require("./exec.service");
exports.execRouter = (0, express_1.Router)();
exports.execRouter.post('/run', async (req, res) => {
    const { language, code } = req.body;
    try {
        const out = await (0, exec_service_1.runCode)(language || 'javascript', code);
        res.json(out);
    }
    catch (err) {
        res.status(500).json({ error: String(err) });
    }
});
