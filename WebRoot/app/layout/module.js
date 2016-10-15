define(['angular',
    'angular-couch-potato',
    'angular-ui-router'], function (ng, couchPotato) {
    "use strict";


    var module = ng.module('app.layout', ['ui.router']);


    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {


        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/layout/layout.tpl.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'components/graphs/directives/inline/sparklineContainer',
                                'layout/controllers/MenuCtrl',
                                'layout/service/MenuService',
                                'components/inbox/directives/unreadMessagesCount',
                                'components/chat/api/ChatApi',
                                'components/chat/directives/asideChatWidget',
                                'layout/directives/selfForm',
                                'layout/directives/changePwdForm',
                                'layout/directives/resetPwdForm'
                            ])
                        }
                    }
                }
            });
        $urlRouterProvider.otherwise('/system/user');

    });

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });

    return module;

});
