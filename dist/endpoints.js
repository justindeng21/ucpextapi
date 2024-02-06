"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backend_1 = require("./backend");
let test;
test = new backend_1.Server();
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
test.app.get('/js/:fileName', backend_1.jsonParser, (req, res) => {
    let fileName = req.params.fileName;
    res.sendFile('js/' + fileName, { root: __dirname });
});
test.app.get('/html/:fileName', backend_1.jsonParser, (req, res) => {
    let fileName = req.params.fileName;
    res.sendFile('html/' + fileName, { root: __dirname });
});
test.app.get('/redirects/:fileName', backend_1.jsonParser, (req, res) => {
    let fileName = req.params.fileName;
    res.sendFile('redirects/' + fileName, { root: __dirname });
});
test.app.get('/css/:fileName', backend_1.jsonParser, (req, res) => {
    let fileName = req.params.fileName;
    res.sendFile('css/' + fileName, { root: __dirname });
});
test.app.get('/home', backend_1.jsonParser, (req, res) => {
    res.sendFile('html/texteditor.html', { root: __dirname });
});
test.app.post('/backup', backend_1.jsonParser, (req, res) => {
    test.writeFile(`${req.body.id}.json`, JSON.stringify(req.body));
    res.sendStatus(204);
});
