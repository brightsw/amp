define(['modules/account/module', 'lodash', 'jquery','domReady'], function (module, _,$,domReady) {

    'use strict';

    module.registerController('AccountTypeCtrl', ['$scope','$rootScope','$modal','$log','httpService','dialogs','Language',function ($scope,$rootScope,$modal,$log,httpService,dialogs,Language) {
        
         domReady(function() {
             $scope.searchData = function(){
                 //console.log("search");
             };

            $scope.tableOptions = {
                    "bDetail":false,
                    "sAjaxSource": 'accountTypeListJson.do',
                    "fnServerParams" : function (aoData) {
                    },
                    "oTableTools": {
                        "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
                        "aButtons": [
                             {
                                sExtends: "text",
                                sButtonText: "新增",
                                fnClick: function ( nButton, oConfig, oFlash ) {
                                    $scope.addAccountType();
                                },
                                fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
                                    
                                },
                                sButtonClass: "mytable_button_add"
                             },
                             {
                                sExtends: "text",
                                sButtonText: "删除",
                                fnClick: function ( nButton, oConfig, oFlash ) {
                                    $scope.deleteAccountType(2);
                                },
                                fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
                                    
                                },
                                sButtonClass: "mytable_button_add"
                             }  
                        ]
                    },
                    "aoColumns": [
                        {
                            "sTitle" : "序号",
                            "mData" : "",
                            "sWidth": "30px",
                            "bSortable" : false,
                            "sDefaultContent":""
                        }, 
                        {
                            "sTitle" : "<input type='checkbox'/>",
                            "mData" : "typeid",
                            "bSortable" : false,
                            "sWidth": "15px",
                            "mRender" : function(data, type, row) {
                                return "<input type='checkbox' name='ids' value='"+data+"'/>";
                            }
                        }, 
                        {"mData": "typename", "sTitle": "类别名称"},
                        {"mData": "capitaluse", "sTitle": "资金","mRender": function (data, display, row) {
                            if (data == "0") {
                                return "否";
                            } else if (data == "1") {
                                return "是";
                            } else{
                            	return "";
                            }
                        }},
                        {"mData": "incomeuse", "sTitle": "收入","mRender": function (data, display, row) {
                            if (data == "0") {
                                return "否";
                            } else if (data == "1") {
                                return "是";
                            } else{
                            	return "";
                            }
                        }},
                        {"mData": "spenduse", "sTitle": "支出","mRender": function (data, display, row) {
                            if (data == "0") {
                                return "否";
                            } else if (data == "1") {
                                return "是";
                            } else{
                            	return "";
                            }
                        }},
                        {"mData": "description", "sTitle": "描述"},
                        { "sTitle" : "操作","mData": "gid","sWidth" : "250px","bSortable" : false,"mRender": function (data, display, row) {
                            var str = "";
                            str += "<a href='javascript:void(0);' onclick=\"angular.element(this).scope().deleteAccount(1,'"+data+"')\">删除</a>";
                            return str;  
                        }}
                    ]

                };
             
             
             
         });

         $scope.deleteAccountType = function(type,typeid){
            var dlg = dialogs.confirm("删除类别","确认删除所选类别吗？",{size:'sm',windowClass: 'dia-custom-top'});
            dlg.result.then(function(btn){
                var selectids = new Array();
                if(type == 1){
                	selectids.push(typeid);
                }else{
	                $("#mytable tbody input:checkbox").each(function(){
	                    if($(this).is(":checked")){
	                        selectids.push($(this).val());
	                    }
	                });
                }
                if(selectids.length > 0){
                	httpService.post('removeAccountType.do',{"typeids":selectids})
                    .then(function(data){
                        if(data != null && data != ''){
                          var retMsg = data.split('|');
                          if(retMsg[0] == "success"){
                              $("#searchBut").click();
                          }else{
                             dialogs.notify("删除类别失败",retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                          }
                        }else{
                        	dialogs.notify("删除类别失败","删除类别失败",{size:'sm',windowClass: 'dia-custom-top'});              
                        }
                    },function(data){
                        
                    });
                }
            },function(btn){
                // confirmed "No."
            });
         };
         
        $scope.clearData = function(){
            $scope.acctypeSch = "";
            $scope.accdateBegin = "";
            $scope.accdateEnd = "";
            $scope.moneyBegin = "";
            $scope.moneyEnd = "";
        }

        $scope.addAccountType = function () {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/account/views/addaccounttype.html',
                controller: AddModalCtrl
            });

            modalInstance.result.then(function (account) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
            
        };
        
        var AddModalCtrl = function ($scope, $modalInstance) { 
            $scope.accounttype = {};
            $scope.accounttype.capitaluse = 0;
            $scope.accounttype.incomeuse = 0;
            $scope.accounttype.spenduse = 0;
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
             
            $scope.ok = function(){
                httpService.post('addAccountType.do',$scope.accounttype)
                .then(function(data){
                  if(data != null && data != ''){
                    var retMsg = data.split('|');
                    if(retMsg[0] == "success"){
                        $modalInstance.close();
                        $("#searchBut").click();
                    }else{
                       var dlg = dialogs.notify("新增类别",retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                         
                    }
                  }else{
                       var dlg = dialogs.notify("新增类别","新增类别失败",{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                        
                  }
                },function(data){
                    
                });
            } 
        }; 
    }]);

});
