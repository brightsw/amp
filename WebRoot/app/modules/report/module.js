define(['angular',
    'angular-couch-potato',
    'angular-ui-router','angular-file-upload'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.report', ['ui.router','ngFileUpload']);


    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider

            .state('app.report', {
                url: '/report',
                data: {
                    title: '内置报表'
                },
                views: {
                    "content@app": {
                    	controller: 'ReportCtrl',
                        templateUrl: "app/modules/report/views/report.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/report/controllers/ReportCtrl',
                                'modules/report/controllers/ReportContentCtrl',
                                'modules/report/directives/reportInstanceForm'
                            ])
                        }
                    }
                }
            })

            .state('app.report.content', {
                url: '',
                params:{
                	'templateid':null
                },
                views: {
					"rightFrame@app.report" : {
						controller: 'ReportContentCtrl',
						templateUrl : "app/modules/report/views/reportContent.html",
						resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/report/controllers/ReportContentCtrl',
                                'modules/report/service/ReportService',
                                'components/graphs/directives/highcharts/highChart'
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
