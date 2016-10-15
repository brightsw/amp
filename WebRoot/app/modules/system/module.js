define(['angular',
    'angular-couch-potato',
    'angular-ui-router','angular-file-upload'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.system', ['ui.router','ngFileUpload']);


    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.system', {
                abstract: true,
                data: {
                    title: '全局设置'
                }
            })

            .state('app.system.user', {
                url: '/system/user',
                data: {
                    title: '用户管理'
                },
                views: {
                    "content@app": {
                        templateUrl: "app/modules/system/views/user.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/system/controllers/UserCtrl',
                                'modules/system/controllers/UserGroupCtrl',
                                'modules/system/service/UserService',
                                'modules/system/directives/userForm',
                                'modules/system/directives/UserGroupForm'
                            ])
                        }

                    }
                }
            })
            
	    	.state('app.system.log', {
	            url: '/system/log',
	            data: {
	                title: '日志管理'
	            },
	            views: {
	                "content@app": {
	                    templateUrl: "app/modules/system/views/log.html"
	
	                }
	            }
	        })
	        .state('app.system.log.operatelog', {
	        	url: '/system/log/operatelog',
	        	views: {
	        		"": {
	        			templateUrl: "app/modules/system/views/operatelog.html",
	                    resolve: {
	                        deps: $couchPotatoProvider.resolveDependencies([
                                'modules/system/controllers/LogCtrl'
	                        ])
	                    }
	        				
	        		}
	        	}
	        })
	        .state('app.system.log.runninglog', {
	        	url: '/system/log/runninglog',
	        	views: {
	        		"": {
	        			templateUrl: "app/modules/system/views/runninglog.html",
	                    resolve: {
	                        deps: $couchPotatoProvider.resolveDependencies([
                                'modules/system/controllers/LogCtrl'
	                        ])
	                    }
	        				
	        		}
	        	}
	        })
    });


    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });
    return module;

});
