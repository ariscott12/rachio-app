module.exports = {
	secsToDate(secs) {
    	let t =new Date(secs);
    	t = this.prettyDate(t);
    	return t;
	},
	prettyDate(date) {
    	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    	return months[date.getUTCMonth()] + ' ' + date.getUTCDate();
	},
	// find obj in array with  matching id
	findObj(array, id) {
		return array.map(function(x) {
			return x.id; 
		}).indexOf(id);
	}
}