(function() {
	'use strict';

	angular
		.module('restaurant.login')
		.factory('loginService', loginService);

	loginService.$inject = ['localStorageService', 'oauthService'];

	/* @ngInject */
	function loginService(localStorageService, oauthService) {
		var service = {
			login: login,
			logout: logout,
			getUser: getUser
		};
		return service;

		function getUser() {
			return localStorageService.get('socialUser');
		}

		function login(source) {
			return oauthService.login(source).then(saveAuthUser);
		}

		function logout() {
			localStorageService.remove('socialUser');
		}

		function saveAuthUser() {
			return oauthService.getProfile().then(function(data) {
				var user = {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email
				};
				localStorageService.set('socialUser', user);
			});
		}
	}
})();
