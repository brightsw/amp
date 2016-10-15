define(['components/backButton/module', 'jquery-ui'], function (module) {
    "use strict";

    return module.registerDirective('backButton', function () {
        return {
            restrict: 'A',
            link:function(scope, element, attrs) {
                element.bind('click', goBack);

                function goBack() {
                  history.back();
                }
            }
        }
    })
});