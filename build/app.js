"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const unzip_route_1 = require("./routes/unzip.route");
const auth_service_1 = require("./services/auth.service");
const app = (0, express_1.default)();
const port = 5000;
//Accept json
app.use(express_1.default.json());
//File upload
app.use((0, express_fileupload_1.default)());
//Authenticate with receiver app
(0, auth_service_1.login)();
app.use("/api/v1", unzip_route_1.router);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
