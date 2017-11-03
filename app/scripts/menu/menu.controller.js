(function() {
	'use strict';

	angular
		.module('restaurant.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['categories', 'loginService', '$ionicHistory', '$state'];

	/* @ngInject */
	function MenuController(categories, loginService, $ionicHistory, $state) {
		var vm = angular.extend(this, {
			categories: categories,
			logout: logout
		});

		function logout() {
			loginService.logout();

			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});

			$state.go('welcome');
		}
	}
})();