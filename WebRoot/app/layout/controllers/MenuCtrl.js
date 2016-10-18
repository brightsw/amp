define(['layout/module'], function (module) {

    'use strict';

    // alert("qwe");

    module.registerController('MenuCtrl', ['$scope','$rootScope','$modal','$state','httpService','dialogs','$compile',function ($scope,$rootScope,$modal,$state, httpService,dialogs,$compile) {

        $scope.initMenu = function(){
        	$("#indextitle").html($rootScope.format('common.product.name'));
        	httpService.get("getSysMenu.do")
	    		.then(function(data){
	    			var menuhtml = "<ul data-smart-menu>";
	    			angular.forEach(data,function(menu,key){
	    				if(menu.subModule.length>0){
	    					menuhtml += "<li data-menu-collapse id='menu" + menu.modid + "'>"
	    						+"<a herf='#'>"
	    						+"<span class='menu-item-parent'>"
	    						+"<i class='fa fa-lg fa-fw " +  menu.iconName + "'></i>"
	    						+ menu.modname
	    						+ "</span>"
	    						+"</a><ul>";
	    					angular.forEach(menu.subModule,function(submenu,key){
	    						menuhtml += "<li data-ui-sref-active='active'>"
	    							+ "<a data-ui-sref='" + submenu.modCode + "'>" + submenu.modname + "</a>"
	    							+ "</li>"
	    					});
	    					menuhtml += "</ul></li>";
	    				}else{
	    					menuhtml += "<li data-ui-sref-active='active'>"
	    						+"<a herf='#' data-ui-sref='" + menu.modCode + "' >"
	    						+"<span class='menu-item-parent'>" 
	    						+"<i class='fa fa-lg fa-fw " +  menu.iconName + "'></i>"
	    						+ menu.modname+ "</span>"
	    						+"</a>"
	    						+"</li>";
	    				}
	    			});
	    			menuhtml += "</ul>";
	    			var content = angular.element(menuhtml);
	                var el = $compile(content)($scope);
	    			$('#menu-nav').html(content);
	    	        $scope.menus = data;
	    	        if(data[0].modCode != "app.dashboard"){
        				if(data[0].subModule != ''){
        					$state.go(data[0].subModule[0].modCode,{});
        				}else{
        					$state.go(data[0].modCode,{});
        				}
        			}
	    		},function(data){
	    			
	    		})
        };

        $scope.logout = function(){
        	httpService.get("logout.do")
    		.then(function(data){
    			window.location = "./login.html"
    		},function(data){
    			
    		})
        };
        
        $scope.getFooterInfo = function(){
        	httpService.get("getFooterInfo.do")
	    		.then(function(data){
	    	        $scope.productversion = data.productversion;
	    	        $scope.loginDisplayname = data.loginDisplayname;
	    	      /*  if(data.updatepwdcount == 0){
	    	        	$scope.changePwdFirst();
	    	        }*/
	    		},function(data){
	    			
	    		})
        };

        $scope.showAboutDialog = function(){
            var modalInstance = $modal.open({
                templateUrl: 'app/layout/partials/about.html',
                controller: AboutModalCtrl,
                size: "md"
            });

            $scope.changeVerify = function(){
            	
            };
            
            modalInstance.result.then(function (user) {
            	
            }, function () {
                
            });
        };
        
        var AboutModalCtrl = function ($scope, $modalInstance) { 
        	 httpService.get('showabout.do')
	     		.then(function(data){
	     			var html = "<div class='list-group no-margin'>";
	     			angular.forEach(data.contents,function(content,key){
	     				html += "<li class='list-group-item'>"
	     						+"<span class='pull-right'>"+content.content+"</span>" +content.name
	     						+"</li>";
	     			});
	     			html += "</div>";
	     			$scope.aboutcontent = html;
	     		},function(data){
	     			
	     		});
     		
            $scope.cancel = function(){
            	console.log("cancel");
            	$modalInstance.dismiss('cancel');
            }
        }; 

        $scope.changePwdFirst = function(){
            var modalInstance = $modal.open({
                templateUrl: 'app/layout/partials/changePwdFirst.html',
                controller: ChangePwdModalCtrl,
				backdrop : "static",
				keyboard : false
            });

            $scope.changeVerify = function(){
            	
            };
            
            modalInstance.result.then(function (user) {
            	
            }, function () {
                
            });
        };
        
        var ChangePwdModalCtrl = function ($scope, $modalInstance) { 
        	$scope.param = {};
        	 httpService.get('selfManage.do')
	     		.then(function(data){
	     			$scope.minPwdLength = data.minPwdLength;
	     			$scope.minFigureNum = data.minFigureNum;
	     			$scope.minSpCharNum = data.minSpCharNum;
	     			$scope.param.email = data.user.email;
	     		},function(data){
	     			
	     		});
     		
            $scope.cancel = function(){
            	console.log("cancel");
            	$modalInstance.dismiss('cancel');
            }
        	 
            $scope.ok = function(){
            	console.log("ok");
            	httpService.post('changeSelfPasswd.do',$scope.param)
                .then(function(data){
  		          if(data != null && data != ''){
  		            var retMsg = data.split('|');
  		            if(retMsg[0] == "success"){
  		            	$modalInstance.close();
  		            }else{
		        		dialogs.notify('错误信息',retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
		            }
		          }else{
		        		dialogs.notify('错误信息',data,{size:'sm',windowClass: 'dia-custom-top'});
		          }
                },function(data){
                	
                });
            } 
        }; 
        $scope.selfManage = function(){
        	$scope.user={};
            var modalInstance = $modal.open({
                templateUrl: 'app/layout/partials/selfmanage.html',
                controller: ModifyModalCtrl,
                resolve : {
                    user : function(){
                        return $scope.user;
                    }
                }
            });

            $scope.changeVerify = function(){
            	
            };
            
            modalInstance.result.then(function (user) {
            	
            }, function () {
                
            });
        };
        
        var ModifyModalCtrl = function ($scope, $modalInstance,user) { 
        	$scope.user = user;
        	$scope.user.verifyipaddr = 0;
        	 httpService.get('selfManage.do')
	     		.then(function(data){
	     			$scope.groups = data.groups;
	     			$scope.roles = data.roles;
	     			$scope.user = data.user;
	     			$scope.user.password = "";
	     			$scope.minPwdLength = data.minPwdLength;
	     			$scope.minFigureNum = data.minFigureNum;
	     			$scope.minSpCharNum = data.minSpCharNum;
	     		},function(data){
	     			
	     		});
     		
            $scope.cancel = function(){
            	console.log("cancel");
            	$modalInstance.dismiss('cancel');
            }
        	 
            $scope.ok = function(){
            	console.log("ok");
            	httpService.post('selfManage.do',$scope.user)
                .then(function(data){
  		          if(data != null && data != ''){
  		            var retMsg = data.split('|');
  		            if(retMsg[0] == "success"){
  		            	$modalInstance.close();
  		            }else{
		        		dialogs.notify('错误信息',retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
		            }
		          }else{
		        		dialogs.notify('错误信息',data,{size:'sm',windowClass: 'dia-custom-top'});
		          }
                },function(data){
                	
                });
            } 
        }; 

        $scope.showHelpDialog = function(){
        	function getUrl() {
 	           var url = location.protocol+'//' + location.hostname + (location.port ? ':'+location.port : '');
               if(url.substr(url.length - 1, 1) != '/') {
 	               url += '/'
 	           }
 	           return url
 	        }	
        	var windowAttrs = "width=787,height=600,resizable=yes,scrollbars=yes";
        	window.open (getUrl() +"garuda/manual/index.html", "帮助", windowAttrs);
        }

        $scope.skins = appConfig.skins;

        $scope.smartSkin = localStorage.getItem('sm-skin') || appConfig.smartSkin;


        $scope.setSkin = function (skin) {
            var $root = $('body');
            $scope.smartSkin = skin.name;
            appConfig.smartSkin = skin.name;
            $root.removeClass(_.pluck($scope.skins, 'name').join(' '));
            $root.addClass(skin.name);
            localStorage.setItem('sm-skin', skin.name);
            $("#logo img").attr('src', skin.logo);
        };


        if ($scope.smartSkin != "smart-style-0") {
            $scope.setSkin(_.find($scope.skins, {name: $scope.smartSkin}))
        }

    }]);

});