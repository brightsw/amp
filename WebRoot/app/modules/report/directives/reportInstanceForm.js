define(['modules/report/module','bootstrap-validator'], function(module){

    "use strict";


    module.registerDirective('reportInstanceFormValidator', function(){

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
                    	instancename : {
	    					group : '.col-md-6',
	    					validators : {
	    						notEmpty : {
	    							message : "必填项"
	    						},
	    						regexp: {
	    							regexp: /^[a-zA-Z0-9\u4e00-\u9fa5-_()\[\]\:.]+$/,
	    							message: "只能包括中文字、英文字母、数字和以下符号"+"- _ ( ) [ ] : ."
	    						},
	    						stringLength : {
	    							max : 20,
	    							message : "最长不超过20个字符"
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