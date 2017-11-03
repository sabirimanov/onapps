(function() {
	'use strict';

	angular
		.module('restaurant.restaurant-delivery')
		.factory('deliveryDataService', deliveryDataService);

	deliveryDataService.$inject = ['localStorageService'];

	/* @ngInject */
	function deliveryDataService(localStorageService) {
		var takeAwayKey = 'take-away-data';
		var dineInKey = 'dine-in-data';
		var homeDeliveryKey = 'home-delivery-data';

		var service = {
			saveTakeAwayData: saveTakeAwayData,
			getTakeAwayData: getTakeAwayData,
			saveDineInData: saveDineInData,
			getDineInData: getDineInData,
			saveHomeDeliveryData: saveHomeDeliveryData,
			getHomeDeliveryData: getHomeDeliveryData
		};
		return service;

		// ************************************************************

		function saveDineInData(data) {
			localStorageService.set(dineInKey, data);
		}

		function saveTakeAwayData(data) {
			localStorageService.set(takeAwayKey, data);
		}

		function saveHomeDeliveryData(data) {
			localStorageService.set(homeDeliveryKey, data);
		}

		function getDineInData() {
			var socialUser = localStorageService.get('socialUser');
			var dineIn = localStorageService.get(dineInKey) || {};
			if (socialUser && !dineIn.email) {
				angular.extend(dineIn, {
					email: socialUser.email
				})
			}
			return dineIn;
		}

		function getTakeAwayData() {
			var socialUser = localStorageService.get('socialUser');
			var takeAway = localStorageService.get(takeAwayKey) || {};
			if (socialUser && !takeAway.email) {
				angular.extend(takeAway, {
					email: socialUser.email
				})
			}
			if (socialUser && !takeAway.fullname) {
				angular.extend(takeAway, {
					fullname: formatFullName(socialUser)
				})
			}
			return takeAway;
		}

		function formatFullName(socialUser) {
			return ((socialUser.firstName || '') + ' ' + (socialUser.lastName || '')).trim();
		}

		function getHomeDeliveryData() {
			var socialUser = localStorageService.get('socialUser');
			var homeDelivery = localStorageService.get(homeDeliveryKey) || {};
			if (socialUser && !homeDelivery.firstName) {
				angular.extend(homeDelivery, {
					firstName: socialUser.firstName
				})
			}
			if (socialUser && !homeDelivery.lastName) {
				angular.extend(homeDelivery, {
					lastName: socialUser.lastName
				})
			}
			if (socialUser && !homeDelivery.email) {
				angular.extend(homeDelivery, {
					email: socialUser.email
				})
			}
			return homeDelivery;
		}
	}
})();
