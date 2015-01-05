var logger = (function () {
	var bunyan = require('bunyan');
	return bunyan.createLogger({name: 'linkedin_logs'});
})();

module.exports = logger;
