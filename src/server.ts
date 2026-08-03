import http from "http";

import { createapp } from "./app.js";

import { env } from "./common/config/env.js";

import { db } from "./common/knex/knex.js";

const app = createapp();

const server = http.createServer(app);

server.listen(env.port, () => {
  console.log(`server listen on port ${env.port}`);
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
