(function() {
	'use strict';

	angular
		.module('restaurant.welcome')
		.controller('WelcomeController', WelcomeController);

	WelcomeController.$inject = ['$state', '$ionicHistory', 'loginService', '$scope', 'welcomeService'];

	/* @ngInject */
	function WelcomeController($state, $ionicHistory, loginService, $scope, welcomeService) {
		var vm = angular.extend(this, {
			login: login,
			loginWithFB: loginWithFB,
			loginWithGoogle: loginWithGoogle,
			slides: null,
			options: {
				loop: true,
				autoplay: 2000,
				speed: 1000
			}
		});

		// *****************************************************************
		(function active() {
			getSlides();
		})();

		function getSlides() {
			welcomeService.getSlides().then(function(images) {
				vm.slides = images;
			})
		}

		function login() {
			$ionicHistory.nextViewOptions({
				disableAnimate: true
			});
			$state.go('app.home');
		}

		function loginWithFB() {
			loginService.login('facebook').then(function() {
				$state.go('app.home');
			});
		};

		function loginWithGoogle() {
			loginService.login('google').then(function() {
				$state.go('app.home');
			});
		};

		$scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
			if (data.slider.swipeDirection) {
				data.slider.startAutoplay();
			}
		});
	}
})();
