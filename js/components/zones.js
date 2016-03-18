const React = require('react');
const NumberPicker = require('react-widgets/lib/NumberPicker');
const numberLocalizer = require('react-widgets/lib/localizers/simple-number');
const Reflux = require('reflux');
const ZoneStartStore = require('../stores/zone-start-store');
numberLocalizer();


module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(ZoneStartStore, 'onChange')
  	],
  	onChange(event) {
		this.setState({
			active:false
		})
	},
	getInitialState() {
		return {
			duration:1,
			active: false
		}
	},
	handleChange(value) {
		this.setState({
        	duration: value
      	});

      	if(this.state.active) {
      		this.props.onUpdate(this.props.id, value);
      	}
	},
	toggleActive() {
			this.setState({
				active: !this.state.active
			});
		
		this.props.onActivate(this.props.id, this.state.duration);
	},
	renderForm() {
   		return <div>
	   		<NumberPicker  max={180} min={1} value={this.state.duration} onChange={this.handleChange}/>
	   		<p>Set Time (mins)</p>
   		</div>
	},
	render() {
		return <div>
			<div onClick={this.toggleActive}>Zone Number { this.props.zoneNumber }</div>
			{ this.state.active ? this.renderForm() : null }
		</div>
	}
})