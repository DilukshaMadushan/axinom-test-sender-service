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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractZipFile = void 0;
const unzip_service_1 = require("../services/unzip.service");
const api_service_1 = require("../services/api.service");
const auth_service_1 = require("../services/auth.service");
const extractZipFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const outputArr = [];
    const output = {
        uploadOwner: req.body.uploadOwner,
        zipFiles: [],
    };
    for (let zipFile of files.file) {
        const unZuppedRes = yield (0, unzip_service_1.unZip)(zipFile.data);
        outputArr.push(unZuppedRes);
    }
    output.zipFiles = outputArr;
    let resCode;
    resCode = yield (0, api_service_1.callReceiver)(output);
    if (resCode == 401) {
        yield (0, auth_service_1.login)();
        resCode = yield (0, api_service_1.callReceiver)(output);
    }
    res.setHeader("Content-Type", "application/json");
    if (resCode == 200) {
        res.status(200).json({
            success: true,
            data: "Operation successfull",
        });
    }
    else {
        res.status(resCode).json({
            success: false,
            data: "Operation Failed",
        });
    }
});
exports.extractZipFile = extractZipFile;
