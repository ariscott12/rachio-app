const React = require('react');
const Reflux = require('reflux');
const ZoneStore = require('../stores/zone-store');


module.exports = React.createClass({
  mixins: [
    // listens for any events that are coming from ZoneStore, 
    // call onChange function when event triggered by store
    Reflux.listenTo(ZoneStore, 'onChange')
  ],
  
  getInitialState() {
    // Set initial state to empty array so no content rendered
    return {
      zones: []
    }
  },
  componentWillMount() {
    // Retrieve zone data from zone store using API
    ZoneStore.getData();
  },
  render() {
    return <div>
     {this.renderZones()}
    </div>
  },
  // Triggered when data is received from API
  onChange(event,zones) {
    this.setState({
      zones:zones
    })
  },
  renderZones() {
    return this.state.zones.map(function(zone) {
      return <p key = {zone.id}>Zone # {zone.zoneNumber}</p>
    });
  }
});

