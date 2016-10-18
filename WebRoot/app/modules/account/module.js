define(['angular',
    'angular-couch-potato',
    'angular-ui-router','angular-file-upload'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.account', ['ui.router','ngFileUpload']);


    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
	        .state('app.account', {
	            abstract: true,
	            data: {
	                title: '账目管理'
	            }
	        })
            .state('app.account.capital', {
	            url: '/account/capital',
	            data: {
	                title: '资金管理'
	            },
	            views: {
	                "content@app": {
	                    templateUrl: "app/modules/account/views/account.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/account/controllers/AccountCtrl',
                                'modules/account/directives/accountForm'
                            ])
                        }
	
	                }
	            }
	        })
            .state('app.account.income', {
	            url: '/account/income',
	            data: {
	                title: '收入管理'
	            },
	            views: {
	                "content@app": {
	                    templateUrl: "app/modules/account/views/income.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/account/controllers/IncomeCtrl',
                                'modules/account/directives/incomeForm'
                            ])
                        }
	
	                }
	            }
	        })
            .state('app.account.spend', {
	            url: '/account/spend',
	            data: {
	                title: '支出管理'
	            },
	            views: {
	                "content@app": {
	                    templateUrl: "app/modules/account/views/spend.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/account/controllers/SpendCtrl',
                                'modules/account/directives/spendForm'
                            ])
                        }
	
	                }
	            }
	        })
            .state('app.account.type', {
	            url: '/account/type',
	            data: {
	                title: '支出管理'
	            },
	            views: {
	                "content@app": {
	                    templateUrl: "app/modules/account/views/type.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/account/controllers/AccountTypeCtrl',
                                'modules/account/directives/accountTypeForm'
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
