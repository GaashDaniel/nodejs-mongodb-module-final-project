import chalk from "chalk";
import cors from "cors";
import morgan from "morgan";
import { logErrorToFile } from "./file-logger.js";
import { toLocalISOString } from "./helpers.js";

export const corsMiddleware = cors({
    origin: [
        "http://localhost:3000",
    ],
});

export const loggerMiddleware = morgan(function (tokens, req, res) {
    const now = toLocalISOString(new Date(), { milliseconds: false });
    let message = `[${now}] ${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens["response-time"](req, res)} ms`;
    const isError = res.statusCode >= 400;
    logErrorToFile(message);
    const color = isError ? 'redBright' : 'cyanBright';
    message = chalk[color](message);
    return message;
});