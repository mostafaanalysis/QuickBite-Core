import express from "express";
import { router } from "./route.js";
import { correlationId } from "./common/correlation/correlationId.js";
import { errorHandler } from "./common/error/errorHandler.js";
import cookieParser from 'cookie-parser';

export function createapp() {
    const app = express();
    
    app.use(cookieParser())
    app.use(correlationId);
    app.use(express.json());

    app.use("/api", router);


    app.use(errorHandler);

    return app;
}



