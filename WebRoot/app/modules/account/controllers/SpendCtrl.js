define(['modules/account/module', 'lodash', 'jquery','domReady'], function (module, _,$,domReady) {

    'use strict';

    module.registerController('SpendCtrl', ['$scope','$rootScope','$modal','$log','httpService','dialogs','Language',function ($scope,$rootScope,$modal,$log,httpService,dialogs,Language) {
        
         domReady(function() {
             $scope.searchData = function(){
                 //console.log("search");
             };

             httpService.get('getAccountTypes.do',{"spenduse":1})
                .then(function(data){
                    $scope.acctypes = data;
                },function(data){
                    
            })
            
            $scope.tableOptions = {
                    "bDetail":false,
                    "sAjaxSource": 'spendListJson.do',
                    "fnServerParams" : function (aoData) {
                        aoData.push({
                            "name": "acctype",
                            "value": $scope.acctypeSch
                        });
                        aoData.push({
                            "name": "accdateBegin",
                            "value": $scope.accdateBegin
                        });
                        aoData.push({
                        	"name": "accdateEnd",
                            "value": $scope.accdateEnd
                        });
                        aoData.push({
                        	"name": "moneyBegin",
                            "value": $scope.moneyBegin
                        });
                        aoData.push({
                        	"name": "moneyEnd",
                            "value": $scope.moneyEnd
                        });
                    },
                    "oTableTools": {
                        "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
                        "aButtons": [
                             {
                                sExtends: "text",
                                sButtonText: "新增",
                                fnClick: function ( nButton, oConfig, oFlash ) {
                                    $scope.addSpend();
                                },
                                fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
                                    
                                },
                                sButtonClass: "mytable_button_add"
                             },
                             {
                                sExtends: "text",
                                sButtonText: "删除",
                                fnClick: function ( nButton, oConfig, oFlash ) {
                                    $scope.deleteSpend(2);
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
                            "mData" : "gid",
                            "bSortable" : false,
                            "sWidth": "15px",
                            "mRender" : function(data, type, row) {
                                return "<input type='checkbox' name='ids' value='"+data+"'/>";
                            }
                        }, 
                        {"mData": "accdate", "sTitle": "日期"},
                        {"mData": "typename", "sTitle": "类别"},
                        {"mData": "money", "sTitle": "金额"},
                        {"mData": "username", "sTitle": "记账人"},
                        {"mData": "description", "sTitle": "备注"},
                        { "sTitle" : "操作","mData": "gid","sWidth" : "250px","bSortable" : false,"mRender": function (data, display, row) {
                            var str = "";
                            str += "<a href='javascript:void(0);' onclick=\"angular.element(this).scope().modifySpend('"+data+"')\">修改</a>";
                            str += "&nbsp;<a href='javascript:void(0);' onclick=\"angular.element(this).scope().deleteSpend(1,'"+data+"')\">删除</a>";
                            return str;  
                        }}
                    ]

                };
             
             
             
         });

         $scope.deleteSpend = function(type,gid){
            var dlg = dialogs.confirm("删除资金明细","确认删除所选资金明细吗？",{size:'sm',windowClass: 'dia-custom-top'});
            dlg.result.then(function(btn){
                var selectids = new Array();
                if(type == 1){
                	selectids.push(gid);
                }else{
	                $("#mytable tbody input:checkbox").each(function(){
	                    if($(this).is(":checked")){
	                        selectids.push($(this).val());
	                    }
	                });
                }
                if(selectids.length > 0){
                	httpService.post('removeSpend.do',{"gids":selectids})
                    .then(function(data){
                        if(data != null && data != ''){
                          var retMsg = data.split('|');
                          if(retMsg[0] == "success"){
                              $("#searchBut").click();
                          }else{
                             dialogs.notify("删除资金明细失败",retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                          }
                        }else{
                        	dialogs.notify("删除资金明细失败","删除资金明细失败",{size:'sm',windowClass: 'dia-custom-top'});              
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

        $scope.addSpend = function () {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/account/views/addspend.html',
                controller: AddModalCtrl
            });

            modalInstance.result.then(function (spend) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
            
        };
        
        var AddModalCtrl = function ($scope, $modalInstance) { 
            $scope.spend = {};
			httpService.get('getAccountTypes.do',{"spenduse":1})
			    .then(function(data){
			        $scope.acctypes = data;
			        $scope.spend.acctype = data[0].typeid;
			    },function(data){
			        //
			    })
                
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
             
            $scope.ok = function(){
                httpService.post('addSpend.do',$scope.spend)
                .then(function(data){
                  if(data != null && data != ''){
                    var retMsg = data.split('|');
                    if(retMsg[0] == "success"){
                        $modalInstance.close();
                        $("#searchBut").click();
                    }else{
                       var dlg = dialogs.notify("新增资金明细",retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                         
                    }
                  }else{
                       var dlg = dialogs.notify("新增资金明细","新增资金明细失败",{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                        
                  }
                },function(data){
                    
                });
            } 
        }; 

        
        $scope.modifySpend = function (gid) {
            $scope.spend={};
            $scope.spend.gid=gid;
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/account/views/modifyspend.html',
                controller: ModifyModalCtrl,
                resolve : {
                    spend : function(){
                        return $scope.spend;
                    }
                }
            });

            modalInstance.result.then(function (spend) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
            
        };
        
        var ModifyModalCtrl = function ($scope, $modalInstance,spend) { 
            $scope.spend = spend;
            var param = {"gid":$scope.spend.gid};

			httpService.get('getAccountTypes.do',{"spenduse":1})
			    .then(function(data){
			        $scope.acctypes = data;
			    },function(data){
			        //
			    })
                

            httpService.get('viewSpend.do',param)
                .then(function(data){
                    $scope.spend = data;
                },function(data){
                    
                });
            $scope.cancel = function(){
                console.log("cancel");
                $modalInstance.dismiss('cancel');
            }
             
            $scope.ok = function(){
                httpService.post('modifySpend.do',$scope.spend)
                .then(function(data){
                  if(data != null && data != ''){
                    var retMsg = data.split('|');
                    if(retMsg[0] == "success"){
                        $modalInstance.close();
                        $("#searchBut").click();
                    }else{
                       var dlg = dialogs.notify("修改资金明细",retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                       dlg.result.then(function(btn){
                         $("input")[0].focus();
                       },function(btn){
                       });                          
                    }
                  }else{
                       var dlg = dialogs.notify("修改资金明细","修改资金明细失败",{size:'sm',windowClass: 'dia-custom-top'});
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
