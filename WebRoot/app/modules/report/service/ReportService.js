define(['modules/report/module'], function (module) {

    'use strict';

    module.registerFactory('reportService', function ($http, $q) {
    	var service = {};
    	service.groupid="";
    	
    	service.createByTemplate = function(instance){
    		var dfd = $q.defer();
			$http({
				method : 'post',
				url : 'createByTemplate.do',
				params : instance
			}).success(function(data) {
				dfd.resolve(data);
			}).error(function(data, status, headers, config) {
				dfd.reject(data);
			});
			return dfd.promise;
    	}; 
    	
    	service.deleteReport = function(selectids){
    		var dfd = $q.defer();
			$http({
				method : 'post',
				url : 'removePolicy.do',
				params : {"selectids":selectids}
			}).success(function(data) {
				dfd.resolve(data);
			}).error(function(data, status, headers, config) {
				dfd.reject(data);
			});
			return dfd.promise;
    	}; 
    	
    	return service;

    });
});
