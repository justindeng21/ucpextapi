"use strict";
function test(username, password) {
    fetch('https://privacyapi.evidon.com/api/v3/sitenotice/96210', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${btoa(username + ':' + password)}`
        }
    }).then((response) => response.text())
        .then((body) => {
        return body;
    });
}
