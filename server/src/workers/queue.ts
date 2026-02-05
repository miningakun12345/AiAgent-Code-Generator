import config from '../config';

// Simple in-memory queue for embedding jobs (replace with BullMQ if redis available)
interface EmbeddingJob {
  id: string;
  data: { snippetId: number; content: string };
}

const queue: EmbeddingJob[] = [];

export function addEmbeddingJob(snippetId: number, content: string) {
  queue.push({
    id: `job_${Date.now()}`,
    data: { snippetId, content }
  });
  console.log(`Added embedding job for snippet ${snippetId}`);
}

export function processQueue(handler: (job: EmbeddingJob) => Promise<void>) {
  setInterval(async () => {
    if (queue.length > 0) {
      const job = queue.shift();
      if (job) {
        try {
          await handler(job);
        } catch (err) {
          console.error('Job failed:', err);
        }
      }
    }
  }, 1000);
}

