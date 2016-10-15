define(['modules/system/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('usergroupFormValidator', function($rootScope){

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
        				groupname : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						regexp: {
        							regexp: /^[a-zA-Z0-9\u4e00-\u9fa5-_()\[\]\:.]+$/,
        							message : $rootScope.format("common.valid.cnname")
        						},
        						stringLength : {
        							max : 40,
        							message : $rootScope.format("system.subsystem.valid.maxlength40char")
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