var phantom = require('phantom');
var Linkedin = require('./page_objects/linkedin_profile.js');
var logger = require('./logger.js');
var q = require('q');

init();

function init(){
	var systemInput = process.argv.slice(2);

	phantom.create(function (ph) {
		ph.createPage(function (page) {

			page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() {
				var profile = new Linkedin(page);
				profile.login()
				.then(function(result){
					setTimeout(function(){

						getResults(profile, systemInput, ph);
					}, 3000);
				}, function(){
					logger.error({
						error: 'Unable to login'
					});
				});
			});

		});
	});

};


function getResults(profile, systemInput, ph){
	if (systemInput.length > 0) {
		getSingleResult(profile, systemInput.pop())
		.then(function(){
			getResults(profile, systemInput, ph);
		});
	} else {
		ph.exit();
	}
};

function getSingleResult(profile, profileUrl){
	var deferred = q.defer();

	profile.getJobTitle(profileUrl)
	.then(function(results){

		logger.info(results);
		
		deferred.resolve();
	}, function(){
		logger.error({
			profile: profileUrl,
			error: 'No results'
		});
		deferred.resolve();
	});
	return deferred.promise;
};
