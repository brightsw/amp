define(['angular',
    'angular-couch-potato',
    'angular-ui-router'

], function (ng, couchPotato) {

    "use strict";

    var module = ng.module('app.backButton', []);

    couchPotato.configureApp(module)

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });
    return module;

});
