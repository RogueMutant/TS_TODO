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
require("dotenv").config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const not_found_1 = __importDefault(require("./middleware/not_found"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const routes_1 = __importDefault(require("./routers/routes"));
const auth_1 = __importDefault(require("./routers/auth"));
const auth_2 = __importDefault(require("./middleware/auth"));
const connectDB = require("./db/connect");
const app = (0, express_1.default)();
app.use(express_1.default.static("./public"));
app.use(express_1.default.json());
app.use("/home/auth", auth_1.default);
app.use("/home/todo", auth_2.default, routes_1.default);
app.use(not_found_1.default);
app.use(errorHandler_1.default);
const port = process.env.PORT || 3000;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectDB();
            app.listen(port, () => console.log(`Server is listening port ${port}...`));
        }
        catch (error) {
            console.log(error);
        }
    });
}
start();
