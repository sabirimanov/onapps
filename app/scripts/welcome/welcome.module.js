(function() {
	'use strict';

	angular
		.module('restaurant.welcome', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('welcome', {
					url: '/welcome',
					templateUrl: 'scripts/welcome/welcome.html',
					controller: 'WelcomeController as vm'
				});
		});
})();
