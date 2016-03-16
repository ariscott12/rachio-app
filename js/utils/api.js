const Fetch = require('whatwg-fetch');
const RootUrl =  'https://api.rach.io/1/public/';
const ApiKey = 'Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e';

module.exports = {
	get(url) {
		return fetch(RootUrl + url, {
			headers: {
				'Authorization' : ApiKey
			}
		})
		.then(function(response) {
			return response.json();
		})
	}
}