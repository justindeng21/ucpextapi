"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backend_1 = require("./backend");
let test;
test = new backend_1.Server();
test.app.get('/', backend_1.jsonParser, (req, res) => {
    res.sendFile('js/createTags.js', { root: __dirname });
});
test.app.get('/noticeoperations.js', backend_1.jsonParser, (req, res) => {
    res.sendFile('js/noticeOperations.js', { root: __dirname });
});
