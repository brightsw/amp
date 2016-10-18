define(['modules/account/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('accounttypeFormValidator', function($rootScope){

        return {
            restrict: 'A',
            replace: false,
            scope: {
                callback: '&'
            },
            link: function(scope, form){
                form.bootstrapValidator({
                    feedbackIcons : {
                        valid : 'glyphicon glyphicon-ok',
                        invalid : 'glyphicon glyphicon-remove',
                        validating : 'glyphicon glyphicon-refresh'
                    },
                    fields : {
        				typename : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						}
        					}
        				},
        				description : {
        					group : '.col-md-12',
        					validators : {
        						stringLength : {
        							max : 200,
        							message : $rootScope.format("common.valid.max200char")
        						}
        					}
        				}
                    }
                }).on('success.form.bv',function(){
                	scope.callback();
                }).on('error.form.bv',function(){
                });

            }

        }

    })

});