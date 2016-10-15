define(['components/clockpicker/module', 'clockpicker'], function (module) {

    'use strict';

    return module.registerDirective('smartClockpicker', function () {
        return {
            restrict: 'A',
            compile: function (tElement, tAttributes) {
                tElement.removeAttr('smart-clockpicker data-smart-clockpicker');

                var options = {
                    placement: 'bottom'
                }

                tElement.clockpicker(options);
            }
        }
    });
});
