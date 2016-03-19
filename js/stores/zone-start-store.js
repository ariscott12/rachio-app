const React = require('react');
const Api = require('../utils/api');
const Reflux = require('reflux');
const utils = require('../utils/utils')


module.exports = Reflux.createStore({
  zoneData: [],

  updateZone(id,val) {
    let index = utils.findObj(this.zoneData, id);
    this.zoneData[index].duration = val * 60;
  },
  // called when <Zone /> component is activated
  activateZone(id,val) {
      let index = utils.findObj(this.zoneData, id);
      // if activated push it onto the array, otherwise remove it
      if(index === -1) {
        this.zoneData.push({
          'id': id,
          'duration' : val * 60,
          'sortOrder' : 1
        });
      } else {
        this.zoneData.splice(index,1);
      } 
  },
  startAllZones(data) {
   this.zoneData = [];
   for (let i = 0; i < data.length; i++) {
     this.zoneData[i] = {
       'id' : data[i].id,
       'duration' : 1,
       'sortOrder': i + 1,
     }
   }
  },
  getActiveZones() {
    return this.zoneData.length;
  },
  getTotalTime() {
    let val = 0;
    for (var i = 0; i < this.zoneData.length; i++) {
      val += this.zoneData[i].duration;
    }
    return val;
  },
  startZones(body) {   
      let zones = {
        'zones': this.zoneData
      }
      Api.put('zone/start_multiple', zones)
        .then(function(response) {
          // If request was valid
          if(response.ok === true) {
            this.zoneData = [];
            this.triggerChange();
          }
        }.bind(this));
  },
  triggerChange() {
    this.trigger('change');
  }
})
 



