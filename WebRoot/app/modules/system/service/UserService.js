define(['modules/system/module'], function (module) {

    'use strict';

    module.registerFactory('userService', function ($http, $q,httpService) {
    	var service = {};
    	
    	service.groupId = "";
    	

    	service.deleteUser = function(data){
	        var dfd = $q.defer();
	        $http({
	        	method:"POST",
	        	url:"removeUser.do",
	        	params:{"userIds":data},
	        }).success(function(data){
	        	dfd.resolve(data);
	        }).error(function(){
	        	dfd.reject("错误")
	        })
	        return dfd.promise;
		};

    	return service;

    });
});
