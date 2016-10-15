define(['modules/system/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('changePwdFormValidator', function($rootScope){

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
        				password : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						identical: {
        							field: 'confirmPwd',
        							message: $rootScope.format("system.user.valid.pwdconfirm")
        						}
        					}
        				},
        				confirmPwd : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						identical: {
        							field: 'password',
        							message: $rootScope.format("system.user.valid.pwdconfirm")
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