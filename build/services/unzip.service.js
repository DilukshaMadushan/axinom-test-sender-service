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
exports.unZip = void 0;
const jszip_1 = __importDefault(require("jszip"));
const unZip = (zipFile) => __awaiter(void 0, void 0, void 0, function* () {
    const unzipper = new jszip_1.default();
    const result = yield unzipper.loadAsync(zipFile);
    const keys = Object.keys(result.files);
    const unZippedDataJson = {
        folderName: "",
        content: [],
    };
    const fileArr = [];
    for (let key of keys) {
        const item = result.files[key];
        if (!item.dir) {
            fileArr.push(objectToJson(item, item.dir));
        }
        else {
            const pathArr = key.split("/");
            if (pathArr.length == 2) {
                unZippedDataJson.folderName = pathArr[0];
            }
        }
    }
    unZippedDataJson.content = fileArr;
    return unZippedDataJson;
});
exports.unZip = unZip;
const objectToJson = (object, isDir) => {
    const jsonObj = {
        name: "",
        isDir: false,
        data: "",
    };
    jsonObj.name = object.name;
    jsonObj.isDir = object.dir;
    if (!isDir) {
        jsonObj.data = object._data.compressedContent.toString("base64");
    }
    return jsonObj;
};
