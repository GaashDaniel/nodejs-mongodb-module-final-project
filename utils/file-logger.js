import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { toLocalISOString } from "./helpers.js";

// ניהול נתיב הקובץ
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

export const logErrorToFile = (message) => {
    const date = toLocalISOString(new Date()).slice(0, 10);
    const fileName = `${date}.log`;
    const logFilePath = path.join(logDirectory, fileName);
    message += '\n';
    fs.appendFile(logFilePath, message, (err) => {
        if (err) {
            console.error("Failed to write to error log:", err);
        }
    });
};