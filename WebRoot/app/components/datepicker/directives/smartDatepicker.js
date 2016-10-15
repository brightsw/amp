define(['components/datepicker/module', 'jquery-ui'], function (module) {
    "use strict";

    return module.registerDirective('smartDatepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope,tElement, tAttributes,ngModelCtrl) {
                tElement.removeAttr('smartDatepicker');

                var onSelectCallbacks = [];
                if (tAttributes.minRestrict) {
                    onSelectCallbacks.push(function (selectedDate) {
                        $(tAttributes.minRestrict).datepicker('option', 'minDate', selectedDate);
                    });
                }
                if (tAttributes.maxRestrict) {
                    onSelectCallbacks.push(function (selectedDate) {
                        $(tAttributes.maxRestrict).datepicker('option', 'maxDate', selectedDate);
                    });
                }
                
                onSelectCallbacks.push(function (selectedDate) {
                	 scope.$apply(function(){
                         ngModelCtrl.$setViewValue(selectedDate);
                     });
                });

                var options = {
            		dateFormat:'yy-mm-dd',
    			    changeMonth: true,
    			    numberOfMonths: 1,
    			    prevText: '<i class="fa fa-chevron-left"></i>',
    			    nextText: '<i class="fa fa-chevron-right"></i>',
                    onSelect: function (selectedDate) {
                        angular.forEach(onSelectCallbacks, function (callback) {
                            callback.call(this, selectedDate)
                        })
                    }
                };


                if (tAttributes.numberOfMonths) options.numberOfMonths = parseInt(tAttributes.numberOfMonths);

                if (tAttributes.dateFormat) options.dateFormat = tAttributes.dateFormat;

                if (tAttributes.defaultDate) options.defaultDate = tAttributes.defaultDate;

                if (tAttributes.changeMonth) options.changeMonth = tAttributes.changeMonth == "true";


                tElement.datepicker(options);
                /*
                if(tAttributes["modelName"]){
                	scope.$watch('param.startdateEnd', function (newVal) {
                		if(newVal == ""){
                			 $(tAttributes.minRestrict).datepicker('option', 'minDate', '');
                			 $(tAttributes.maxRestrict).datepicker('option', 'maxDate', '');
                		}
                	}, true);
                }
                */
            }
        }
    })
});