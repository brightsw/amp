define(['modules/report/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('reportFormValidator', function($rootScope){

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
                    	taskschedulername : {
        					group : '.col-md-4',
        					validators : {
        						notEmpty : {
        							message : "必填项"
        						},
        						regexp: {
        							regexp: /^[a-zA-Z0-9\u4e00-\u9fa5-_()\[\]\:.]+$/,
        							message: "只能包括中文字、英文字母、数字和以下符号"+"- _ ( ) [ ] : ."
        						},
        						stringLength : {
        							max : 10,
        							message : "最长不超过10个字符"
        						}
        					}
        				},
        				startdate : {
        					group : '.col-md-4',
        					validators : {
        						callback: {
        	                            message: "必填项",
        	                            callback: function (value, validator, $field) {
        									if(value == ""){
        										if($("#taskschedulertype").val() > 1){
        									    	return false;
        										}else{
        											return true;
        										}
        									}else{
        										return true;
        									}
        	                            }
        	                    }
        					}
        				},
        				enddate : {
        					group : '.col-md-4',
        					validators : {
        						callback: {
    	                            	message: "必填项",
        	                            callback: function (value, validator, $field) {
        									if(value == ""){
        										if($("#taskschedulertype").val() > 2){
        									    	return false;
        										}else{
        											return true;
        										}
        									}else{
        										return true;
        									}
        	                            }
        	                    }
        					}
        				},
        				exectime : {
        					group : '.col-md-4',
        					validators : {
        						callback: {
    	                            	message: "必填项",
        	                            callback: function (value, validator, $field) {
        									if(value == ""){
        										if($("#taskschedulertype").val() > 1){
        									    	return false;
        										}else{
        											return true;
        										}
        									}else{
        										return true;
        									}
        	                            }
        	                    }
        					}
        				},
        				policyname : {
        					group : '.col-md-4',
        					validators : {
        						notEmpty : {
        							message : "必填项"
        						}
        					}
                    	},
                    	responsor : {
        					group : '.col-md-4',
        					validators : {
        						notEmpty : {
        							message : "必填项"
        						}
        					}
                    	},
                    	otherresponsor : {
                    		group : '.col-md-4',
							validators : {
        						stringLength : {
        							max : 200,
        							message : $rootScope.format("common.valid.max200char")
        						},
        						callback: {
    	                            message: "一个或多个邮箱地址不合法",
    	                            callback: function (value, validator, $field) {
    	                            	if(value != null && value != ""){
    	                            		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+[a-zA-Z0-9]{2,4}$/;
    	                            		if(value.indexOf(",")==0){
    	                            			return false;
    	                            		}
    	                            		if(value.indexOf(",,")>-1){
    	                            			return false;
    	                            		}
    	                    				var mailArr = value.split(",");
    	                    	        	for(var i=0;i<mailArr.length;i++){
    	                    	        		if(mailArr[i].length > 32){
    	                    	        			return false;
    	                    	        		}
    	                    	        		if (mailArr[i]!=""&&!filter.test(mailArr[i])) {
    	                    	        			return false;
    	                    	        		}
    	                            		}
    	                    	        	return true;
    	                            	}else{
    	                            		return true;
    	                            	}
    	                            }
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