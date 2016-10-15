angular.module('loginApp', ['ui.bootstrap','dialogs.main','pascalprecht.translate','dialogs.default-translations','app.language'])

    .controller('LoginController', function ($scope,$rootScope, $http,$modal, $timeout,$location,$translate,dialogs,Language) {
        $rootScope.lang = {};

        $(function() {
            init();

            $("#username").focus();

            $("#subBut").click(function(){
                $.ajax({
                    type : "POST",
                    url : "./loginCheck.do",
                    data : "username=" + $("#username").val()
                    + "&password=" + encodeURIComponent($('#password').val())
                    //+ "&checkValidatecode=1"//注释后验证码失效
                    + "&validatecode=" + $("#validatecode").val(),
                    success : function(msg) {
                        if (msg.success == "true") {
                            window.location.href = "index.html";
                        } else if (msg.first == "true") {
                            window.location.href = "index.html";
                        } else {
                        	freshImg();
                            $("#validatecode").val("");
                            dialogs.notify($rootScope.format('login.login'),msg.errorMessage,{size:'sm',windowClass: 'dia-custom-top'});
                            //alert(msg.errorMessage);
                        }
                    }
                });
            });


            $("#validatecode").keydown(function(event) {
                if (event.keyCode == 13) {
                    $("#subBut").click();
                }
            });
            //$("#subBut").click();
            
        });

        function init(){
        	$("#username").val("sysadmin");
        	$('#password').val("admin");
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
        
        $scope.reloadImg = function(){
        	freshImg();
        }

        function freshImg() {
            var timenow = new Date().getTime();
            $("#imgRnd").attr("src", "operateValidateCode.do?id=" + timenow);
        }

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'resetPasswd.html',
                controller: AddModalCtrl
            });

            modalInstance.result.then(function (user) {
            }, function () {
                
            });
            
        };
        
        var AddModalCtrl = function ($scope, $modalInstance) { 
            $scope.param = {};

            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
             
            $scope.ok = function(){
            	$.ajax({
                    type : "POST",
                    url : "./resetPasswd.do",
                    data : "username=" + $("#resetuser").val()
                    + "&email=" + encodeURIComponent($('#email').val()),
                    success : function(data) {
                        if(data != null && data != ''){
	                        var retMsg = data.split('|');
	                        if(retMsg[0] == "success"){
	                            $modalInstance.close();
	                            dialogs.notify("",$rootScope.format('system.login.resetpwd.succ'),{size:'sm',windowClass: 'dia-custom-top'});
	                        }else{
	                           dialogs.notify("",retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
	                        }
	                      }else{
	                    	  dialogs.notify("",retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});                    
	                      }
                    }
                });
            } 
        }; 

        
});
