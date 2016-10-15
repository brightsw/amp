define(['components/widgets/module'], function (module) {

    "use strict";

    module.registerDirective('jarvisWidget', function ($rootScope,$timeout) {
        return {
            restrict: "A",
            link: function (scope,element, attributes) {
            	$timeout(function(){
	                element.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');
	                element.addClass('jarviswidget jarviswidget-sortable');
	                $rootScope.$emit('jarvisWidgetAdded', element)
            	})

            }
        }
    })
});