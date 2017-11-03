(function() {
	'use strict';

	angular
		.module('restaurant.welcome')
		.service('welcomeService', welcomeService);

	welcomeService.$inject = ['dataService'];

	/* @ngInject */
	function welcomeService(dataService) {

		var service = {
			getSlides: getSlides
		};

		return service;

		// ***************************************

		function getSlides() {
			return dataService.getWelcomeImages().then(function(images) {
				var items = [];
				for (var i = 0; i < images.length; i++) {
					items.push({
						image: images[i]
					});
				}
				return items;
			})
		}
	}
})();
