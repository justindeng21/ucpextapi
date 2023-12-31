// document.getElementById('textEditor').addEventListener('keydown', function(e) {
//     if (e.key == 'Tab') {
//       e.preventDefault();
//       var start = this.selectionStart;
//       var end = this.selectionEnd;
  
//       // set textarea value to: text before caret + tab + text after caret
//       this.value = this.value.substring(0, start) +
//         "\t" + this.value.substring(end);
  
//       // put caret at right position again
//       this.selectionStart =
//         this.selectionEnd = start + 1;
//     }
// });

function enableTab(id) {
    var el = document.getElementById(id);
    el.onkeydown = function(e) {
        if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;

        }
    };
}


enableTab('textEditor')