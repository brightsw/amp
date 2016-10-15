define(['modules/system/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('selfFormValidator', function(){

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
        							message : "必填项"
        						},
        						stringLength : {
        							max : 40,
        							message : "最长不超过40个字符"
        						},
        						regexp: {
        							regexp: /^[a-zA-Z0-9\u4e00-\u9fa5-_()\[\]\:.]+$/,
        							message: "只能包括中文字、英文字母、数字和以下符号- _ ( ) [ ] : ."
        						}
        					}
        				},
        				username : {
        					group : '.col-md-6',
        					validators : {
        						notEmpty : {
        							message : "必填项"
        						},
        						stringLength : {
        							max : 10,
        							message : "最长不超过10个字符"
        						},
        						regexp: {
        							regexp: /^[a-zA-Z0-9\u4e00-\u9fa5-_()\[\]\:.]+$/,
        							message: "只能包括中文字、英文字母、数字和特殊字符"+"- _ ( ) [ ] : ."
        						}
        					}
        				},
        				password : {
        					group : '.col-md-6',
        					validators : {
        						identical: {
        							field: 'confirmPwd',
        							message: "两次输入密码必须一致"
        						}
        					}
        				},
        				confirmPwd : {
        					group : '.col-md-6',
        					validators : {
        						identical: {
        							field: 'password',
        							message: "两次输入密码必须一致"
        						}
        					}
        				},
        				orginalpassword : {
        					group : '.col-md-6',
        					validators : {
        						notEmpty : {
        							message : "必填项"
        						}
        					}
        				},
        				telephone : {
        					group : '.col-md-6',
        					validators : {
        						regexp: {
        							regexp: /^[\d-\d|\d]+$/,
        							message: "电话号码格式错误"
        						}
        					}
        				},
        				mobilephone : {
        					group : '.col-md-6',
        					validators : {
        						regexp: {
        							regexp: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,
        							message: "手机号码格式错误"
        						}
        					}
        				},
        				email : {
        					group : '.col-md-6',
        					validators : {
        						notEmpty : {
        							message : "必填项"
        						},
        						emailAddress: {
        							message: "电子邮箱格式错误"
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