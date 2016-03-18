const React = require('react');
const Api = require('../utils/api');
const Reflux = require('reflux');

module.exports = Reflux.createStore({
  startZones(body) {   
      Api.put('zone/start_multiple', body)
        .then(function(response) {
          // If request was valid
          if(response.ok === true) {
            this.triggerChange();
          }
        }.bind(this));
  },
  triggerChange() {
    this.trigger('change');
  }
})
 



