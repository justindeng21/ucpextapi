"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlencodedParser = exports.jsonParser = exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            next();
        });
        this.server = this.app.listen(process.env.PORT || 3400, () => console.log("server running"));
    }
    _closeServer() {
        this.server.close();
    }
}
exports.Server = Server;
exports.jsonParser = body_parser_1.default.json();
exports.urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
