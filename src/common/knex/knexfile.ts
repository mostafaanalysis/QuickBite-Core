import { env } from "../config/env.js";
import type { Knex } from "knex";
import path from "path";

const projectRoot = path.resolve(__dirname, "../../../");

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
  },
  pool: {
    max: env.db.poolMax,
  },
  migrations: {
    directory: path.resolve(projectRoot, env.db.migrationDirectory),
    extension: env.db.migrationExtension,
  },
};
export default config;
console.log("MIGRATIONS DIR:", path.resolve(projectRoot, env.db.migrationDirectory));
