"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.login = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_util_1 = require("../utils/logger.util");
let token;
exports.token = token;
//@desc    Authenticate with receiver app
const login = () => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        name: process.env.USER_NAME || "Diluksha",
        password: process.env.PASSWORD || "123456",
    };
    try {
        const response = yield axios_1.default.post(process.env.RECEIVER_LOGIN_URL ||
            "http://localhost:5001/api/v1/auth/login", body);
        if (response.status == 200 && response.data.success) {
            exports.token = token = response.data.token;
            logger_util_1.logger.info(`Status: ${response.status}, ${response.data.data}`);
        }
        else {
            logger_util_1.logger.error(`Status: ${response.status}, ${response.data.error}`);
        }
    }
    catch (error) {
        logger_util_1.logger.error("Error occured while calling login API, ", error.message);
    }
});
exports.login = login;
