define(['angular',
    'angular-couch-potato',
    'angular-ui-router'

], function (ng, couchPotato) {

    "use strict";

    var module = ng.module('app.tagsinput', []);

    couchPotato.configureApp(module)

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });
    return module;

});
