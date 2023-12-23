"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class htmlTemplater {
    getTextEditor(folder, fileName) {
        fs_1.default.readFile(`${__dirname}/${folder}/${fileName}`, 'utf8', (error, data) => {
            const body = `<form action="/save/${folder}/${fileName}" name="textEditorForm" method="post" class="textEditorForm"><textarea id="textEditor" class="" name="code" rows="15" cols="100" placeholder="">${data}</textarea><input type="submit" value="Save" class="submitButton"></form>`;
        });
    }
}
