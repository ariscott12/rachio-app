const React = require('react');
const Api = require('../utils/api');
const Reflux = require('reflux');

module.exports = Reflux.createStore({
  startSingleZone(id,duration) {
      this.id = id;
      this.duration = duration;

      // Takes optional 3rd argument to set url
      Api.put(id,duration)
        .then(function(response) {
          // If request was valid
          if(response.ok === true) {
            this.triggerStartSingle()
          }
        }.bind(this));
  },
  triggerStartSingle() {
    this.trigger('startSingle', this.id, this.duration);
  }
})
 



