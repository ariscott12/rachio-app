const React = require('react');
const Reflux = require('reflux');
const ZoneStore = require('../stores/zone-store');
const Zones = require('./zones');
const ZonesAll = require('./zones-all');


module.exports = React.createClass({
  mixins: [
    // listens for any events that are coming from ZoneStore, 
    // call onChange function when event triggered by store
    Reflux.listenTo(ZoneStore, 'onChange')
  ],
  
  getInitialState() {
    // Set initial state to empty array so no content rendered
    return {
      zones: null
    }
  },
  componentWillMount() {
    // Retrieve zone data from zone store using API
    ZoneStore.getData();
  },

  // Triggered when data is received from API
  onChange(event,zones) {
    this.setState({
      zones:zones
    })
  //  console.log(this.state.zones);
  },
   render() {
   // console.log('test');
  
    return <div>
      {this.state.zones ? this.renderZones() : null}   
    </div>
  },
 
  renderZones() {
    return <ZonesAll zoneData = {this.state.zones} />
  }
});

