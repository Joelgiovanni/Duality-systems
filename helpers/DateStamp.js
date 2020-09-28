// Function to return filtered Date
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newDate = month + "/" + day + "/" + year;

module.exports = newDate;
