"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRouter = void 0;
const express_1 = require("express");
const agent_service_1 = require("./agent.service");
exports.agentRouter = (0, express_1.Router)();
exports.agentRouter.post('/query', async (req, res) => {
    const { query, language } = req.body;
    try {
        const out = await (0, agent_service_1.handleQuery)(req.app.locals.db, query, language || 'javascript');
        res.json(out);
    }
    catch (err) {
        res.status(500).json({ error: String(err) });
    }
});
