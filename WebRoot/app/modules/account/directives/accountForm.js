define(['modules/account/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('accountFormValidator', function($rootScope){

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
        				accdate : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						}
        					}
        				},
        				money : {
        					group : '.col-md-6',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						digis : {
        							message : "必须为正整数"
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