import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "logs.txt");

export const logger = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} from ${req.ip}\n`;
    console.log(log.trim());
    fs.appendFile(logFile, log, (err) => {
        if (err) console.error("Error writing log:", err);
    });
        next();
};

export const errorLogger = (err, req, res, next) => {
    const log = `[${new Date().toISOString()}] ERROR: ${err.message} at ${req.method} ${req.originalUrl}\n`;
    console.error(log.trim());
    fs.appendFile(logFile, log, (err2) => {
        if (err2) console.error("Error writing error log:", err2);
    });
        next(err);
};
