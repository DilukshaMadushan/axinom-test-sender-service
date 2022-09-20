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
exports.callReceiver = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_util_1 = require("../utils/logger.util");
const auth_service_1 = require("./auth.service");
const callReceiver = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(process.env.RECEIVER_UPLOAD_URL ||
            "http://localhost:5001/api/v1/zip-content", body, {
            headers: {
                Authorization: "Bearer " + auth_service_1.token,
            },
        });
        logger_util_1.logger.info(`Status: ${response.status}`);
        logger_util_1.logger.info(response.data.data);
        return response.status;
    }
    catch (error) {
        logger_util_1.logger.error("Error occured while calling receiver app, ", error.message);
        return 500;
    }
});
exports.callReceiver = callReceiver;
