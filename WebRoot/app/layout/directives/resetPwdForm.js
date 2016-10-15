define(['modules/system/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('resetPwdFormValidator', function($rootScope){

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
        				username : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						}
        					}
        				},
        				email : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						emailAddress: {
        							message: $rootScope.format("system.notify.emailerror")
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