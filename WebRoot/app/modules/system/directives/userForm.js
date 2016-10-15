define(['modules/system/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('userFormValidator', function($rootScope){

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
        				loginname : {
        					group : '.col-md-6',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required'),
        						},
        						stringLength : {
        							max : 40,
        							message : $rootScope.format("system.subsystem.valid.maxlength40char")
        						},
        						regexp: {
        							regexp: /^[a-zA-Z0-9\u4e00-\u9fa5-_()\[\]\:.]+$/,
        							message: $rootScope.format("common.valid.cnname")
        						}
        					}
        				},
        				username : {
        					group : '.col-md-6',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.button.add'),
        						},
        						stringLength : {
        							max : 10,
        							message : $rootScope.format("common.valid.max10char")
        						},
        						regexp: {
        							regexp: /^[a-zA-Z0-9\u4e00-\u9fa5-_()\[\]\:.]+$/,
        							message: $rootScope.format("common.valid.cnname")
        						}
        					}
        				},
        				password : {
        					group : '.col-md-6',
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
        					group : '.col-md-6',
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
        				telephone : {
        					group : '.col-md-6',
        					validators : {
        						regexp: {
        							regexp: /^[\d-\d|\d]+$/,
        							message: $rootScope.format("system.user.valid.telinvalid")
        						}
        					}
        				},
        				mobilephone : {
        					group : '.col-md-6',
        					validators : {
        						regexp: {
        							regexp: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,
        							message: $rootScope.format("system.user.valid.mobileinvalid")
        						}
        					}
        				},
        				email : {
        					group : '.col-md-6',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						emailAddress: {
        							message: $rootScope.format("system.notify.emailerror")
        						}
        					}
        				},
        				startstandardip : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						ip : {
        							message: $rootScope.format("system.subsystem.valid.invalidip")
        						}
        					}
        				},
        				endstandardip : {
        					group : '.col-md-12',
        					validators : {
        						notEmpty : {
        							message : $rootScope.format('common.valid.required')
        						},
        						ip : {
        							message: $rootScope.format("system.subsystem.valid.invalidip")
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