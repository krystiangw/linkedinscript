var q = require('q');
var configs = require('./../configs.js');

var Linkedin = (function () {

	function Linkedin(page) {
		this.page = page;
		this.configs = configs;
		this.baseUrl = configs.LINKEDIN_BASE_URL;
		
		this.emailInput = 'input[name="session_key"]';
		this.passwordInput = 'input[name="session_password"]';
		this.signinButton = 'input[name="signin"]';
		this.loginForm = 'form[name="login"]';
		this.logoutBtn = '.account-submenu-split-link';
		this.loggedName = '.act-set-name-split-link';
		// Data from profiles
		this.jobTitleClass = '.title';
		this.fullName = '.full-name';
		this.currentCompany = '.current-position > div > header > h5 > span';
	};


	Linkedin.prototype.login = function() {
		var vm = this;
		var page = vm.page;
		var deferred = q.defer();
		page.open(vm.baseUrl, function (status) {
			if (status === "fail") {
				deferred.reject('Login error');
			} else {
				page.evaluate(function (vm) {
					$(vm.emailInput).val(vm.configs.EMAIL);
					$(vm.passwordInput).val(vm.configs.PASSWORD);
					return $(vm.loginForm).submit();
				}, function (result) {
					setTimeout(function(){
						deferred.resolve(vm.configs.EMAIL);
					}, 6000);
				}, vm);
			}
		});

		return deferred.promise;
	};

	Linkedin.prototype.logout = function() {
		var vm = this;
		vm.logoutBtn.click();
	};

	Linkedin.prototype.isLoggedin = function() {
		var vm = this;
		var page = vm.page;
		var deferred = q.defer();

		page.open('https://www.linkedin.com/nhome/', function (status) {
			page.evaluate(function (vm) {
				return $(vm.loggedName).text();
			}, function (result) {
				if (result === "") {
					deferred.reject();
				} else {
					deferred.resolve(result)
				}
			}, vm);
		});

		return deferred.promise;
	};

	Linkedin.prototype.getJobTitle = function(url) {
		var vm = this;
		var page = vm.page;

		var deferred = q.defer();
		page.open(url, function (status) {
			if (status === 'fail') {
				deferred.reject("Unable to open a page");
			} else {
				page.evaluate(function (vm) { 
					var results = {
						results: 'OK',
						jobTitle: $(vm.jobTitleClass).text(),
						fullName: $(vm.fullName).text(),
						companyName: $(vm.currentCompany).text() 
					};
					return results;
				}, function (results) {
					deferred.resolve(results);
				}, vm);
			}
		});

		return deferred.promise;
	};

	return Linkedin;

})();

module.exports = Linkedin;
