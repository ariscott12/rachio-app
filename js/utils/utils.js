module.exports = {
    secsToDate(secs) {
        let t = new Date(secs);
        t = this.prettyDate(t);
        return t;
    },
    prettyDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getUTCMonth()] + ' ' + date.getUTCDate();
    },
    // find obj in array with  matching id
    findObj(array, id) {
        return array.map(function(x) {
            return x.id;
        }).indexOf(id);
    },
    sortArray(array) {
        array.sort(function(a, b) {
            // if they are equal, return 0 (no sorting)
            if (a.zoneNumber == b.zoneNumber) {
                return 0;
            }
            if (a.zoneNumber > b.zoneNumber) {
                return 1;
            } else {
                return -1;
            }
        });

        return array;
    }
}