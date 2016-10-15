define(['modules/system/module', 'lodash', 'jquery','domReady'], function (module, _,$,domReady) {

    'use strict';

    module.registerController('UserCtrl', ['$scope','$rootScope','$modal','$log','httpService','userService','dialogs','Language',function ($scope,$rootScope,$modal,$log,httpService,userService,dialogs,Language) {
        
         domReady(function() {
             $scope.groupId = userService.groupId;
             $scope.searchData = function(){
                 //console.log("search");
             };

             httpService.get('getRoles.do')
                .then(function(data){
                    $scope.roles = data;
                },function(data){
                    
            })
            
            $scope.tableOptions = {
                    "bDetail":true,
                    "sAjaxSource": 'userListJson.do',
                    "fnServerParams" : function (aoData) {
                        aoData.push({
                            "name": "groupId",
                            "value": userService.groupId
                        });
                        aoData.push({
                            "name": "loginName",
                            "value": $scope.loginNameSch
                        });
                        aoData.push({
                            "name": "userName",
                            "value": $scope.userNameSch
                        });
                        aoData.push({
                            "name": "roleId",
                            "value": $scope.roleId
                        });
                    },
                    "oTableTools": {
                        "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
                        "aButtons": [
                             {
                                sExtends: "text",
                                sButtonText: $rootScope.format('common.button.add'),
                                fnClick: function ( nButton, oConfig, oFlash ) {
                                    $scope.openModal();
                                },
                                fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
                                    
                                },
                                sButtonClass: "mytable_button_add"
                             },
                             {
                                sExtends: "text",
                                sButtonText: $rootScope.format('common.button.del'),
                                fnClick: function ( nButton, oConfig, oFlash ) {
                                    $scope.deleteUser();
                                },
                                fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
                                    
                                },
                                sButtonClass: "mytable_button_add"
                             }  
                        ]
                    },
                    "aoColumns": [
                        {
                            "sTitle" : "",
                            "mData" : "",
                            "sWidth" : "40px",
                            "bSortable" : false,
                            "sDefaultContent":""
                        },
                        {
                            "sTitle" : $rootScope.format('common.table.no'),
                            "mData" : "",
                            "sWidth": "30px",
                            "bSortable" : false,
                            "sDefaultContent":""
                        }, 
                        {
                            "sTitle" : "<input type='checkbox'/>",
                            "mData" : "userid",
                            "bSortable" : false,
                            "sWidth": "15px",
                            "mRender" : function(data, type, row) {
                            	if(row.issysdefault == 0){
                                    return "<input type='checkbox' name='ids' value='"+data+"'/>";
                            	}else{
                            		return "";
                            	}
                            }
                        }, 
                        {"mData": "loginname", "sTitle": $rootScope.format('system.user.loginname')},
                        {"mData": "username", "sTitle": $rootScope.format('system.user.username')},
                        {"mData": "rolename", "sTitle": $rootScope.format('system.user.rolename')},
                        {"mData": "groupname", "sTitle": $rootScope.format('system.user.usergroup')},
                        { "sTitle" : $rootScope.format('common.table.oper'),"mData": "userid","sWidth" : "250px","bSortable" : false,"mRender": function (data, display, row) {
                            var str = "";
                            if(row.issysdefault == 0){
                                str += "&nbsp;<input type='button' class='mybtn' value='" + $rootScope.format('common.button.modify')+ "' onclick=\"angular.element(this).scope().modifyUser('"+data+"')\">"
                                //str += "&nbsp;<input type='button' class='mybtn' value=' onclick=\"angular.element(this).scope().resetPwd('"+data+"')\">" + $rootScope.format('system.user.resetpwd')+ "</a>"
                            }
                            if(row.status == 3){
                                str += "&nbsp;<input type='button' class='mybtn' value='" + $rootScope.format('system.user.unlock')+ "' onclick=\"angular.element(this).scope().unlockUser('"+data+"')\">"
                            }
                            return str;  
                        }}
                    ]

                };
             
             
             
         });

         $scope.deleteUser = function(){
            var dlg = dialogs.confirm($rootScope.format('system.user.deluser'),$rootScope.format('system.user.delusertip'),{size:'sm',windowClass: 'dia-custom-top'});
            dlg.result.then(function(btn){
                var selectids = new Array();
                $("#mytable1 tbody input:checkbox").each(function(){
                    if($(this).is(":checked")){
                        selectids.push($(this).val());
                    }
                });
                if(selectids.length > 0){
                    userService.deleteUser(selectids)
                        .then(function(data){
                              if(data != null && data != ''){
                                    var retMsg = data.split('|');
                                    if(retMsg[0] == "success"){
                                        $("#searchBut").click();
                                    }else{
                                       dialogs.notify($rootScope.format('system.user.deluser'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                                    }
                                  }else{
                                       dialogs.notify($rootScope.format('system.user.deluser'),data,{size:'sm',windowClass: 'dia-custom-top'});
                                  }
                        },function(data){
                            
                        })
                }
            },function(btn){
                // confirmed "No."
            });
         };
         
        $scope.clearData = function(){
            $scope.loginNameSch = "";
            $scope.userNameSch = "";
            $scope.roleId = "";
        }

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/system/views/adduser.html',
                controller: AddModalCtrl
            });

            modalInstance.result.then(function (user) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
            
        };
        
        var AddModalCtrl = function ($scope, $modalInstance) { 
            $scope.user = {};
            $scope.user.verifyipaddr = 0;
            
             httpService.get('getUsergroups.do')
                .then(function(data){
                    $scope.groups = data;
                    $scope.user.usergroupid = 1;
                },function(data){
                    
                });
             
             httpService.get('getRoles.do')
                .then(function(data){
                    $scope.roles = data;
                    $scope.user.roleid = data[0].roleid;
                },function(data){
                    //
                })
            
            httpService.get("getUserPasswordPolicy.do")
                .then(function(data){
                    $scope.minPwdLength = data.minPwdLength;
                    $scope.minFigureNum = data.minFigureNum;
                    $scope.minSpCharNum = data.minSpCharNum;
                },function(data){
                    //
                })
            

            $scope.changeVerify = function(){
                 $scope.user.startstandardip="";
                 $scope.user.endstandardip="";
            };
                
                
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
             
            $scope.ok = function(){
                httpService.post('addUser.do',$scope.user)
                .then(function(data){
                  if(data != null && data != ''){
                    var retMsg = data.split('|');
                    if(retMsg[0] == "success"){
                        $modalInstance.close();
                        $("#searchBut").click();
                    }else{
                       var dlg = dialogs.notify($rootScope.format('system.user.add'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                         
                    }
                  }else{
                       var dlg = dialogs.notify($rootScope.format('system.user.add'),$rootScope.format('system.user.add.fail'),{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                        
                  }
                },function(data){
                    
                });
            } 
        }; 

        
        $scope.modifyUser = function (userid) {
            $scope.user={};
            $scope.user.userid=userid;
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/system/views/modifyuser.html',
                controller: ModifyModalCtrl,
                resolve : {
                    user : function(){
                        return $scope.user;
                    }
                }
            });

            modalInstance.result.then(function (user) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
            
        };
        
        var ModifyModalCtrl = function ($scope, $modalInstance,user) { 
            $scope.user = user;
            console.log(user.userid);
            var param = {"userid":$scope.user.userid};
             httpService.get('getUsergroups.do')
                .then(function(data){
                    $scope.groups = data;
                },function(data){
                    
                });
             
             httpService.get('getRoles.do')
                .then(function(data){
                    $scope.roles = data;
                },function(data){
                    
                })
            
            httpService.get("getUserPasswordPolicy.do")
                .then(function(data){
                    $scope.minPwdLength = data.minPwdLength;
                    $scope.minFigureNum = data.minFigureNum;
                    $scope.minSpCharNum = data.minSpCharNum;
                },function(data){
                    //
                })

            httpService.get('viewUser.do',param)
                .then(function(data){
                    $scope.user = data;
                    $scope.user.confirmPwd=$scope.user.password;
                },function(data){
                    
                });
         
            $scope.changeVerify = function(){
            	if($scope.user.verifyipaddr==0){
	                $scope.user.startstandardip="";
	                $scope.user.endstandardip="";
            	}
            };
                
            $scope.cancel = function(){
                console.log("cancel");
                $modalInstance.dismiss('cancel');
            }
             
            $scope.ok = function(){
                httpService.post('modifyUser.do',$scope.user)
                .then(function(data){
                  if(data != null && data != ''){
                    var retMsg = data.split('|');
                    if(retMsg[0] == "success"){
                        $modalInstance.close();
                        $("#searchBut").click();
                    }else{
                       var dlg = dialogs.notify($rootScope.format('system.user.modify'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                          
                    }
                  }else{
                       var dlg = dialogs.notify($rootScope.format('system.user.modify'),$rootScope.format('system.user.modify.fail'),{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                        
                  }
                },function(data){
                    
                });
            } 
        }; 

        $scope.resetPwd = function (userid) {
            httpService.post('resetUser.do',{"userid":userid})
                .then(function(data){
                      if(data != null && data != ''){
                        var retMsg = data.split('|');
                        if(retMsg[0] == "success"){
                           dialogs.notify($rootScope.format('system.user.resetpwd'),$rootScope.format('system.user.resetpwd.succ'),{size:'sm',windowClass: 'dia-custom-top'});
                        }else{
                           dialogs.notify($rootScope.format('system.user.resetpwd'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                        }
                      }else{
                          dialogs.notify($rootScope.format('system.user.resetpwd'),$rootScope.format('system.user.resetpwd.fail'),{size:'sm',windowClass: 'dia-custom-top'});
                      }
                },function(data){
                    
                })
        };

        $scope.unlockUser = function (userid) {
            httpService.post('unlockUser.do',{"userid":userid})
                .then(function(data){
                    $("#searchBut").click();
                },function(data){
                    
                })
        };
    }]);

});
