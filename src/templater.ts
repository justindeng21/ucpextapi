import fs from 'fs'


class htmlTemplater{
    
    getTextEditor(folder: string, fileName: string){
        fs.readFile(`${__dirname}/${folder}/${fileName}`, 'utf8', (error, data) => {
            const body = `<form action="/save/${folder}/${fileName}" name="textEditorForm" method="post" class="textEditorForm"><textarea id="textEditor" class="" name="code" rows="15" cols="100" placeholder="">${data}</textarea><input type="submit" value="Save" class="submitButton"></form>`
        })
    }

}