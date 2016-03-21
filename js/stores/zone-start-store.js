const React = require('react');
const Api = require('../utils/api');
const Reflux = require('reflux');
const utils = require('../utils/utils')
module.exports = Reflux.createStore({

    zoneData: [],
    updateZone(id, val) {
        let index = utils.findObj(this.zoneData, id);
        this.zoneData[index].duration = val * 60;
    },
    toggleZone(id, val) {
        let index = utils.findObj(this.zoneData, id);
        // If id not found push onto array, otherwise remove it
        if (index === -1) {
            this.zoneData.push({
                'id': id,
                'duration': val * 60,
                'sortOrder': 1
            });
        } else {
            this.zoneData.splice(index, 1);
        }
    },
    getActiveZones() {
        return this.zoneData.length;
    },
    // Loop through zoneData array and get total duration of all zones
    getTotalTime() {
        let duration = 0;
        for (var i = 0; i < this.zoneData.length; i++) {
            duration += this.zoneData[i].duration;
        }
        return duration;
    },
    startZones() {
        let zones = {
            'zones': this.zoneData
        }
        Api.put('zone/start_multiple', zones).then(function(response) {
            // If request was valid
            if (response.ok === true) {
                this.triggerChange();
                this.zoneData = [];
            } else {
              throw new Error("Invalid Request Api.put()");
            }
        }.bind(this));
    },
    // Build zoneData array for all zones
    startAllZones(data, duration) {
        // Set array to empty in case there is data already set
        this.zoneData = [];
        for (let i = 0; i < data.length; i++) {
            this.zoneData[i] = {
                'id': data[i].id,
                'duration': duration * 60,
                'sortOrder': i + 1,
            }
        }
        this.startZones();
    },
    triggerChange() {
      this.trigger('change', this.getTotalTime());
    }
})