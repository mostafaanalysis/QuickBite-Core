import express from "express";
import { router } from "./route.js";
import { correlationId } from "./common/correlation/correlationId.js";
import { errorHandler } from "./common/error/errorHandler.js";

export function createapp() {
    const app = express();

    app.use(correlationId);
    app.use(express.json());

    app.use("/api", router);

    // يجب أن يكون آخر middleware
    app.use(errorHandler);

    return app;
}



