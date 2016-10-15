define(['angular',
    'angular-couch-potato',
    'angular-ui-router','angular-file-upload'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.account', ['ui.router','ngFileUpload']);


    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.account', {
	            url: '/system/account',
	            data: {
	                title: '账目管理'
	            },
	            views: {
	                "content@app": {
	                    templateUrl: "app/modules/account/views/account.html"
	
	                }
	            }
	        })
    });


    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });
    return module;

});
