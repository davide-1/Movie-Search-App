/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// Handler that runs inside the worker thread
const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};
