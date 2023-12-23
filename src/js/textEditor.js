const input = document.getElementById("filename");


input.addEventListener("input", updateValue);

function updateValue(e) {
    let fileName = input.value
    const editorAction = document.getElementById("textEditorForm");
    editorAction.setAttribute('action',`/save/new/${fileName}`)
}



