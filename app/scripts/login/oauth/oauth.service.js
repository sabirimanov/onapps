(function() {
	'use strict';

	angular
		.module('restaurant.login')
		.factory('oauthService', oauthService);

	oauthService.$inject = ['$injector', '$q'];

	/* @ngInject */
	function oauthService($injector, $q) {
		var oauthToken = null;
		var service = {
			login: login,
			getProfile: getProfile
		};
		return service;

		function login(source) {
			return getOAuthService(source).login().then(function(accessToken) {
				if (!accessToken) {
					return $q.reject();
				}

				oauthToken = {
					accessToken: accessToken,
					source: source
				};
			});
		}

		function getProfile() {
			if (!oauthToken) {
				alert('You are not authorized');
				return $q.reject();
			}

			var oauthService = getOAuthService();
			return oauthService.getProfile(oauthToken.accessToken);
		}

		function getOAuthService(source) {
			source = source || oauthToken.source;
			switch (source) {
				case 'facebook':
					return $injector.get('oauthFacebookService');
				case 'google':
					return $injector.get('oauthGoogleService');
			}
			throw new Error('Source \'' + source + '\' is not valid');
		}
	}
})();
