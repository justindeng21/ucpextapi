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
class templateEngine {
    getPage(content, scripts) {
        const style = `<link rel="stylesheet" href="../css/textEditor.css">`;
        const head = `<head>${style}<script src="/js/tabs.js" defer></script>${scripts}</head>`;
        const body = `<body>${this.getContainer(content)}</body>`;
        const html = `<html>${head}${body}</html>`;
        return html;
    }
    getContainer(content) {
        return `<div class="container">${content}</div>`;
    }
    getTextEditor(folder, fileName, data) {
        const textEditor = `<h1 class="heading">Text Editor</h1>
        <form action="/save/${folder}/${fileName}" name="textEditorForm" method="post" class="textEditorForm">
            <input type="text" placeholder="test" class="filename" name="filename" value="${fileName}">
            <textarea spellcheck="false" class="textEditor" id="textEditor" rows="50"name="code">${data}</textarea>
            <input type="submit" value="Save" class="submitButton"><a class="viewButton" href="/${folder}/${fileName}">View</a>
        </form>`;
        return this.getPage(textEditor, '');
    }
    getNewFileEditor() {
        const textEditor = `<h1 class="heading">Text Editor</h1>
        <form action="/" name="textEditorForm" method="post" class="textEditorForm" id="textEditorForm">
            <input type="text" placeholder="test" id="filename" class="filename" name="filename" >
            <textarea spellcheck="false" class="textEditor" rows="50"name="code"></textarea>
            <input type="submit" value="Save" class="submitButton">
        </form>`;
        return this.getPage(textEditor, this.getScripts());
    }
    getScripts() {
        return `<script src="/js/textEditor.js" defer></script>`;
    }
}
let templater = new templateEngine();
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
    let style = `<link rel="stylesheet" href="/css/styles.css">`;
    let htmlString = `<head>${style}</head><div class="container">`;
    try {
        let redirectFiles = fs_1.default.readdirSync(__dirname + '/redirects');
        //htmlString+="<h2 class=\"heading\">Redirect Scripts</h2>"
        for (let i = 0; i < redirectFiles.length; i++) {
            htmlString += `<a href="editor/redirects/${redirectFiles[i]}">${redirectFiles[i]}</a>`;
        }
    }
    catch (error) { }
    try {
        let cssFiles = fs_1.default.readdirSync(__dirname + '/css');
        //htmlString+="<h2 class=\"heading\">CSS</h2>"
        for (let i = 0; i < cssFiles.length; i++) {
            htmlString += `<a href="editor/css/${cssFiles[i]}">${cssFiles[i]}</a>`;
        }
    }
    catch (error) { }
    try {
        let htmlFiles = fs_1.default.readdirSync(__dirname + '/html');
        //htmlString+="<h2 class=\"heading\">HTML</h2>"
        for (let i = 0; i < htmlFiles.length; i++) {
            htmlString += `<a href="editor/html/${htmlFiles[i]}">${htmlFiles[i]}</a>`;
        }
    }
    catch (error) { }
    htmlString += "</div>";
    res.send(htmlString);
});
test.app.get('/editor/:folder/:fileName', backend_1.jsonParser, (req, res) => {
    let fileName = req.params.fileName;
    let folder = req.params.folder;
    fs_1.default.readFile(`${__dirname}/${folder}/${fileName}`, 'utf8', (error, data) => {
        res.send(templater.getTextEditor(folder, fileName, data));
    });
});
test.app.get('/editor', backend_1.jsonParser, (req, res) => {
    res.send(templater.getNewFileEditor());
});
test.app.post('/save/:folder/:fileName', backend_1.jsonParser, (req, res) => {
    let fileName = req.params.fileName;
    let newName = req.body.filename;
    let folder = req.params.folder;
    let code = req.body.code;
    if (folder === 'new') {
        const fileType = fileName.split('.')[1];
        if (fileType === 'js') {
            folder = 'redirects';
        }
        else
            folder = fileType;
    }
    fs_1.default.writeFile(`${__dirname}/${folder}/${fileName}`, code, (err) => {
        if (err) {
            console.log('There was an error writting');
            return;
        }
    });
    if (fileName !== newName) {
        fs_1.default.rename(`${__dirname}/${folder}/${fileName}`, `${__dirname}/${folder}/${newName}`, (err) => {
            if (err) {
                console.log('There was an error');
                return;
            }
        });
    }
    res.sendStatus(204);
});
test.app.post('/save/:folder/:fileName', backend_1.jsonParser, (req, res) => {
    let fileName = req.params.fileName;
    let newName = req.body.filename;
    let folder = req.params.folder;
    let code = req.body.code;
    console.log(`${__dirname}/${folder}/${newName}`);
    fs_1.default.writeFile(`${__dirname}/${folder}/${fileName}`, code, (err) => {
        if (err) {
            console.log('There was an error');
            return;
        }
    });
    fs_1.default.rename(`${__dirname}/${folder}/${fileName}`, `${__dirname}/${folder}/${newName}`, (err) => {
        if (err) {
            console.log('There was an error');
            return;
        }
    });
    res.sendStatus(204);
});
test.app.get('/childprocess', (req, res) => {
    (0, child_process_1.exec)('python subRoutines/aggregateData.py', (error, stdout, stderr) => {
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
    res.send('hello');
});
test.app.post('/', backend_1.jsonParser, (req, res) => {
    fs_1.default.writeFile('data/' + makeid(20) + '.json', JSON.stringify(req.body), (err) => {
        if (err) {
            console.log('There was an error');
            return;
        }
    });
    res.end();
});
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
    fs_1.default.writeFile(`subRoutines/${req.body.id}.json`, JSON.stringify(req.body), (err) => {
        if (err) {
            console.log('There was an error');
            return;
        }
    });
    (0, child_process_1.exec)(`python subRoutines/backup.py ${req.body.id}.json`, (error, stdout, stderr) => {
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
