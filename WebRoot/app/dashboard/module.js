define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource',
    'bootstrap-jeditable',
    'agile_carousel'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.dashboard', [
        'ui.router',
        'ngResource'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    "content@app": {
                        controller: 'DashboardCtrl',
                        templateUrl: 'app/dashboard/views/dashboard.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'dashboard/controllers/DashboardCtrl',
                                'dashboard/service/DashboardService',
                                'components/graphs/directives/echarts/echartChart',
                                'components/graphs/directives/d3/d3Chart',
                                'components/graphs/directives/inline/sparklineContainer'
                            ])
                        }
                    }
                },
                data: {
                    title: '仪表板'
                }
            });
    });

    couchPotato.configureApp(module);

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });

    return module;
});