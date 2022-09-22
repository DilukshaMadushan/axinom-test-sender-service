"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const options = {
    file: {
        level: "info",
        filename: `./logs/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    },
    console: {
        level: "info",
        handleExceptions: true,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.simple()),
    },
};
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File(options.file),
        new winston_1.default.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});
exports.logger = logger;
