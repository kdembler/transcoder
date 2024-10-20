import { ChainWorker } from "./chain-worker";
import { handleRequest } from "./handlers";
import { HashingWorker } from "./hashing-worker";
import { TranscodingWorker } from "./transcoding-worker";
import { UploadWorker } from "./upload-worker";

const server = Bun.serve({
  port: 3001,
  fetch: handleRequest,
});

const hashingWorker = new HashingWorker();
hashingWorker.start();

const transcodingWorker = new TranscodingWorker();
transcodingWorker.start();

const chainWorker = await ChainWorker.init();
chainWorker.start();

const uploadWorker = new UploadWorker();
uploadWorker.start();

console.log(`API server running at http://localhost:${server.port}`);
