define(['components/core/module'], function(module) {

    'use strict';

    module.registerFactory('httpService', ['$http', '$q','$rootScope', function($http, $q,$rootScope) {
        var service = {

            post: function(url, param, callback) {
                var deferred = $q.defer();
                try {
                    $http({
                        method:"post",
                        url:url,
                        params:param
                    }).success(function(data,status,headers,config){
                        if (angular.isFunction(callback)) {
                            callback(data);
                        }
                        deferred.resolve(data);
                    }).error(function(){
                        deferred.reject($rootScope.format('common.tip.errinfo'))
                    })
                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            },

            get: function(url, param, callback) {
                var deferred = $q.defer();
                try {
                    $http({
                        method:"get",
                        url:url,
                        params:param
                    }).success(function(data,status,headers,config){
                        if (angular.isFunction(callback)) {
                            callback(data);
                        }
                        deferred.resolve(data);
                    }).error(function(){
                        deferred.reject($rootScope.format('common.tip.errinfo'))
                    })
                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            },

            all: function(params) {
                var promises = [];

                angular.forEach(params, function(param){

                    var deffered  = $q.defer();

                    $http({
                        url : param.url,
                        method: param.method,
                        params:param.data
                    }).
                        success(function(data){
                            deffered.resolve(data);
                        }).
                        error(function(error){
                            deffered.reject();
                        });

                    promises.push(deffered.promise);

                })

                return $q.all(promises);
            }
        };

        return service;
    }]);
});
