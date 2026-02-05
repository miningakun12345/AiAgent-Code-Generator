"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmbeddingJob = addEmbeddingJob;
exports.processQueue = processQueue;
const queue = [];
function addEmbeddingJob(snippetId, content) {
    queue.push({
        id: `job_${Date.now()}`,
        data: { snippetId, content }
    });
    console.log(`Added embedding job for snippet ${snippetId}`);
}
function processQueue(handler) {
    setInterval(async () => {
        if (queue.length > 0) {
            const job = queue.shift();
            if (job) {
                try {
                    await handler(job);
                }
                catch (err) {
                    console.error('Job failed:', err);
                }
            }
        }
    }, 1000);
}
