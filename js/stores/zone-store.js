const React = require('react');
const Api = require('../utils/api');
const Reflux = require('reflux');
module.exports = Reflux.createStore({

    // Get person info, fetch zoneData once json data returned
    getData() {
        // fires ajax request using api module (api.js)
        return Api.get('person/info').then(function(json) {
            this.getZoneData(json);
        }.bind(this));
    },
    getZoneData(json) {
        return Api.get('person/' + json.id).then(function(json) {
            this.zones = json.devices[0].zones
            this.triggerData()
        }.bind(this));
    },
    triggerData() {
        this.trigger('change', this.zones);
    }
})