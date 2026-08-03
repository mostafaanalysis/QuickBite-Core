import { Router } from "express";

import { bingDB } from "../../common/knex/knex.js";

export const route_health = Router();

route_health.get("/", async (req, res) => {
  try {
    await bingDB();
    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send({
      message: "db down",
    });
  }
});
