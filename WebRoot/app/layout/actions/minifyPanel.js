define(['layout/module'], function (module) {
    "use strict";

    module.registerDirective('minifyPanel', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var $body = $('body');
                var minifyPanel = function () {
                	$('#poly-left-panel').parent().toggleClass('hidden-panel');
                	if($('#poly-left-panel').parent().hasClass('hidden-panel')){
                		$('#poly-left-panel').find('#panelcontent').hide();
                		$('#poly-left-panel').find('.fa-arrow-circle-left').removeClass('fa-arrow-circle-left').addClass('fa-arrow-circle-right');
                	}else{
                		$('#poly-left-panel').find('#panelcontent').show();
                		$('#poly-left-panel').find('.fa-arrow-circle-right').removeClass('fa-arrow-circle-right').addClass('fa-arrow-circle-left');
                	}
                };

                element.on('click', minifyPanel);
            }
        }
    })

});

