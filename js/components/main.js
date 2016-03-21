const React = require('react');
const Reflux = require('reflux');
const ZoneStore = require('../stores/zone-store');
const Zones = require('./zones');
const DashBoard = require('./dashboard');


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
  },
  render() {  
    return <div>
      <h1 className = "bg-blue app-title">Rachio App</h1>
      <div  className = "contain">
        {this.state.zones ? this.renderDashboard() : null}   
      </div>
    </div>
  },
  renderDashboard() {
    return <DashBoard zoneData = {this.state.zones} />
  }
});

