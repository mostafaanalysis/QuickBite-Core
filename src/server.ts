import http from "http";

import "reflect-metadata";

import { createapp } from "./app.js";

import { env } from "./common/config/env.js";

import { db } from "./common/knex/knex.js";

import { logger } from "./common/logger/logger.js";

const app = createapp();

const server = http.createServer(app);

server.listen(env.port, () => {
  logger.info(`server listen on port ${env.port}`);
});

async function shutdown() {
  server.close(async () => {
    console.log("server down");

    await db.destroy();

    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
