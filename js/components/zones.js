const React = require('react');
const Reflux = require('reflux');

module.exports = React.createClass({
	getInitialState() {
		return {
			time: null
		}
	},
	render() {
		return <div>
			<p>Zone Number { this.props.zoneNumber }</p>
			{this.renderForm()}
		</div>
	},
	renderForm() {
		 let time = this.state.time;
   		 return <div>
   		 <input type="text" value={time} onChange={this.handleChange} />
   		 <button onClick={this.startZone}>Start Zone</button>
   		 </div>
	},
	startZone(event) {
		console.log(this.state.time);
		this.setState({
			time:null
		})
	},
	handleChange(event) {
		this.setState({
			time: event.target.value
		})
	}
})