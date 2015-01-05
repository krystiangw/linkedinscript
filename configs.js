
var configs = (function () {
	return {
		EMAIL: process.env.EMAIL,
		PASSWORD: process.env.PASSWORD,
		LINKEDIN_BASE_URL: 'https://www.linkedin.com/'
	};

})();

module.exports = configs;

