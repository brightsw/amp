define(['layout/module'], function (module) {

    'use strict';

    module.registerFactory('menuService', function ($http, $q) {
    	var service = {};
    	service.getSysMenu = function(){
            var dfd = $q.defer();
            $http({
            	method:"GET",
            	url:"getSysMenu.do",
            }).success(function(data){
            	dfd.resolve(data);
            }).error(function(){
            	dfd.reject("错误")
            })
            return dfd.promise;
    	}

    	service.logout = function(){
    		var dfd = $q.defer();
            $http({
            	method:"GET",
            	url:"logout.do",
            }).success(function(data){
            	dfd.resolve(data);
            }).error(function(){
            	dfd.reject("错误")
            })
            return dfd.promise;
    	}
    	return service;

    });
});
