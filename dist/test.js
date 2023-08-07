"use strict";
function saveNotice() {
    return fetch('http://localhost:3400/copyNotice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'justindeng555@gmail.com', password: 'Draven817678!', noticeId: '96210', newDomain: 'dg-ucp.herokuapp.com' })
    });
}
saveNotice();
