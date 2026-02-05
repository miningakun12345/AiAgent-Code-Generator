"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestRouter = void 0;
const express_1 = require("express");
const ingest_service_1 = require("./ingest.service");
exports.ingestRouter = (0, express_1.Router)();
exports.ingestRouter.post('/snippet', async (req, res) => {
    const { language, filename, content } = req.body;
    try {
        const out = await (0, ingest_service_1.ingestSnippet)(req.app.locals.db, { language, filename, content });
        res.json(out);
    }
    catch (err) {
        res.status(500).json({ error: String(err) });
    }
});
