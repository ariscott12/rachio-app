const Fetch = require('whatwg-fetch');
const RootUrl = 'https://api.rach.io/1/public/';
const config = require('../config.js');

module.exports = {
    get(url) {
        return fetch(RootUrl + url, {
            headers: {
                'Authorization': config.apiKey
            }
        }).then(function(response) {
            return response.json();
        });
    },
    put(url, body) {
    	body = JSON.stringify(body);
        return fetch(RootUrl + url, {
            method: 'PUT',
            headers: {
                'Authorization': config.apiKey
            },
            body: body
        }).then(function(response) {
        	return response;
        });
    }
}