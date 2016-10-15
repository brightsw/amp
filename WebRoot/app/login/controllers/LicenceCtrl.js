angular.module('licenceApp', ['ui.bootstrap','dialogs.main','pascalprecht.translate','dialogs.default-translations','app.language'])

    .controller('LicenceController', function ($scope,$rootScope, $http, $timeout,$location,$translate,dialogs,Language) {
        $rootScope.lang = {};
        
        $(function() {
            init();
			$.ajax({
	            type : "GET",
	            url : "./getHardwareid.do",
	            data : "",
	            success : function(msg) {
	            	$scope.hardwareid=msg.hardwareid;
	            }
	        });

	        $("#subBut").on("click",function(){
		       	$.ajaxFileUpload({
			          url:"updateLicence.do", 
			          secureuri : false,
			          fileElementId : 'file',
			          dataType : 'json',
			          success : function(data) {
		            	$("#alertLicDiv").html("");
						var tmp = data.split("|");
						if(tmp[0] == "success"){
							window.location.href="login.html";
						}else{
                            dialogs.notify($rootScope.format('login.licence'),tmp[1],{size:'sm',windowClass: 'dia-custom-top'});
						}
			          
			          }
		        });
	       	});
	       	
        });

        function init(){
            Language.getLocale(function(language){
                $rootScope.currentLanguage = language;
                Language.getLang(language.language,function(data){
                    $rootScope.lang = data;
                });
            });
        }

        $rootScope.format = function(key){
            if(angular.isDefined($rootScope.lang[key])){
                return $rootScope.lang[key];
            }
            else {
                return key;
            }
        }
    	
});
