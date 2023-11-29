"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const backend_1 = require("./backend");
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
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
test.app.get('/', backend_1.jsonParser, (req, res) => {
    res.sendFile('js/createTags.js', { root: __dirname });
});
test.app.get('/js/:fileName', backend_1.jsonParser, (req, res) => {
    var fileName = req.params.fileName;
    res.sendFile('js/' + fileName, { root: __dirname });
});
test.app.post('/backup', backend_1.jsonParser, (req, res) => {
    var fileName = makeid(20);
    fs_1.default.writeFile(`subRoutines/${req.body.id.toString()}.json`, JSON.stringify(req.body), (err) => {
        if (err) {
            console.log('There was an error');
            return;
        }
    });
    (0, child_process_1.exec)(`python subRoutines/backup.py ${fileName}.json`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(stdout);
        }
    });
    res.send(204);
});
