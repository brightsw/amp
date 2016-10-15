'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-animate',
    'angular-bootstrap',
    'angular-translate',
    'angular-translate-loader-static-files',
    'smartwidgets',
    'base64',
    'angular-dialog-service',
    'dialogs-default-translations',
    'notification',
    'language'
], function (ng, couchPotato) {

    var app = ng.module('app', [
        'ngSanitize',

        'scs.couch-potato',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'dialogs.main',
        'dialogs.default-translations',
        'pascalprecht.translate',
        'app.language',
        // App

        'app.layout',
        'app.chat',
        'app.calendar',
        'app.inbox',
        'app.graphs',
 
        'app.forms',
        
        'app.widgets',

        'app.select2',
        'app.clockpicker',
        'app.datepicker',
        'app.tagsinput',
        'app.tables',
        'app.core',
        'app.backButton',
        //email
        'app.system',
        'app.account'
    ]);

    couchPotato.configureApp(app);

    app.config(['$provide', '$httpProvider',function ($provide, $httpProvider) {
    	function notifyClick(){
    		window.top.location.replace("./login.html");
    	}
    	
        function notifyInfo(message) {
        	$.SmartMessageBox({
        		title: '',
        		content: message,
        		color: "#C46A69",
                NormalButton: void 0,
                ActiveButton: void 0,
                buttons: '[确定]',
                input: void 0,
                inputValue: void 0,
                placeholder: "",
                options: void 0            		
        	},notifyClick);
        }
    	
    	$.ajaxSetup({
  	      contentType:"application/x-www-form-urlencoded;charset=utf-8",
  	      complete:function(XMLHttpRequest,textStatus){
  	        try{
  	          var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
  	          if(sessionstatus=="sessionOut"){
            	  if(!isAlert){
            		  notifyInfo("会话失效,请重新登录");
         	  	  		isAlert=true;
              	  }
			 	 //window.top.location.replace("./login.html");
  	          }
  	        }catch(e){}
  	      }
  	    });
    	var isAlert = false;
        $provide.factory('ErrorHttpInterceptor', function ($q) {
            var errorCounter = 0;
            
            function notifyError(rejection) {
                $.bigBox({
                    title: rejection.status + ' ' + rejection.statusText,
                    content: rejection.data,
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    number: ++errorCounter,
                    timeout: 6000
                });
            }

            return {
                requestError: function (response) {
                    // show notification
                    notifyError(response);

                    // Return the promise rejection.
                    return $q.reject(response);
                },

                responseError: function (response) {
                	if (response.status === 401) {
                	  if(!isAlert){
                		notifyInfo("会话失效,请重新登录");
           	  	  		isAlert=true;
                	  }
				 	 // window.top.location.replace("./login.html");
                	}
                    return $q.reject(response);
                }
                
                ,
                request: function(config){
                	config.headers['X-Requested-With'] ="XMLHttpRequest";
                	return config;
                },
                
                response: function(response) {
            	 try{
            		 var sessionstatus =response.headers('sessionstatus');
            		 if(!_.isUndefined(sessionstatus)){
						 if(sessionstatus=="sessionOut"){
		                	  if(!isAlert){
		                		  	notifyInfo("会话失效,请重新登录");
		             	  	  		isAlert=true;
		                  	  }
						 	 //window.top.location.replace("./login.html");
						 }else{
							  
						 }
            		 }
        	      }catch(e){}
        	      return response;
                }
            };
        });

        $httpProvider.interceptors.push('ErrorHttpInterceptor');

    }]);
    
    
    app.run(function ($couchPotato, $rootScope, $state, $stateParams,Language,$translate) {
        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        Language.getLocale(function(language){
            $rootScope.currentLanguage = language;
            $translate.use(language.language);
            Language.getLang(language.language,function(data){
                $rootScope.lang = data;
            });
            var theme = _.find(appConfig.themes, {name: appConfig.theme})
            Language.getTheme(theme.url,function(themedata){
            	$rootScope.theme = themedata;
            });
            if($rootScope.currentLanguage.language=="zh-CN"){
	    		$.fn.select2.defaults = $.extend($.fn.select2.defaults,  {
	    	        formatNoMatches: function () { return '没有匹配记录'; },
	    	        formatInputTooShort: function (input, min) { var n = min - input.length; return eval("至少输入 " + n + " 个字符"); },
	    	        formatInputTooLong: function (input, max) { var n = input.length - max; return eval("最多只能输入 " + n + " 个字符"); },
	    	        formatLoadMore: function (pageNumber) { return "加载..."; },
	    	        formatSearching: function () { return "搜索.."; },
	    	    });
            }            
        });
        
        
        $rootScope.format = function(key){
            if(angular.isDefined($rootScope.lang[key])){
                return $rootScope.lang[key];
            }
            else {
                return key;
            }
        }
    });
    

    return app;
});
