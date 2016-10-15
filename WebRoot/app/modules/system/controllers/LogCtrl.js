define(['modules/system/module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('LogCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {
    	$scope.param = {};

        $scope.searchData = function(){
            console.log($scope.param.regcode);
        };
    	$scope.getServerDate = function(){
    		httpService.get("getServerDate.do")
	     		.then(function(data){
	     			$scope.param.createtime = data;
	     		},function(data){
	     			
	     		});
    	};
    	
    	$scope.exportLog = function(){
    		$("#exportForm").submit();
    		/*httpService.post("exportLog.do",$scope.param)
	     		.then(function(data){
	     			
	     		},function(data){
	     			
	     		});*/
    	};

    	$scope.clearData = function(){
    		httpService.get("getServerDate.do")
     		.then(function(data){
     			$scope.param.createtime = data;
     		},function(data){
     			
     		});
    		$scope.param.regcode = "";
    		$scope.param.ipaddress = "";
    		$scope.param.logcontent = "";
    		$scope.param.loglevel = "";
    		$scope.param.operatoruser = "";
    	};
    	
        $scope.tableOptions2 = {
            	"bDetail":false,
                "sAjaxSource": 'operateLogListJson.do',
                "fnServerParams" : function (aoData) {
                	aoData.push({
                        "name" : "createtime",
                        "value" : $scope.param.createtime
                    });
                    aoData.push({
                        "name" : "ipaddress",
                        "value" : $scope.param.ipaddress
                    });
                    aoData.push({
                        "name" : "logcontent",
                        "value" : $scope.param.logcontent
                    });
                    aoData.push({
                        "name" : "loglevel",
                        "value" : $scope.param.loglevel
                    });
                    aoData.push({
                        "name" : "operatoruser",
                        "value" : $scope.param.operatoruser
                    });
                },
                "oTableTools": {
                    "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
                    "aButtons": [
                         {
							sExtends: "text",
							sButtonText: $rootScope.format("system.logmanage.export"),
							fnClick: function ( nButton, oConfig, oFlash ) {
								$scope.param.logtype=2;
								$scope.exportLog();
							},
							fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
							    
							},
							sButtonClass: "mytable_button_add"
                         }
                    ]
                },
                "aoColumns": [
                  	{
                        "sTitle" : $rootScope.format("common.table.no"),
                        "mData" : "",
                        "sWidth": "30px",
                        "bSortable" : false,
                        "sDefaultContent":""
                    }, 
                    {"mData": "componentname", "sTitle": $rootScope.format("system.sysstate.compname")}, 
                    {"mData": "createtime", "sTitle": $rootScope.format("system.subsystem.param.date")}, 
                    {"mData": "loglevel", "sTitle": $rootScope.format("system.logmanage.level"),"mRender": function (data, display, row) {
                        if (data == "4") {
                            return $rootScope.format("system.logmanage.deadly");
                        } else if (data == "3") {
                            return $rootScope.format("system.logmanage.serious");
                        } else if (data == "2") {
                            return $rootScope.format("system.logmanage.warning");
                        } else if (data == "1") {
                            return $rootScope.format("system.logmanage.info");
                        } else if (data == "0") {
                            return $rootScope.format("system.logmanage.debug");
                        }
                    }}, 
                    {"mData": "ipaddress", "sTitle": $rootScope.format("system.sysstate.ipaddress")}, 
                    {"mData": "operatoruser", "sTitle": $rootScope.format("system.logmanage.user")}, 
                    {"mData": "logcontent", "sTitle": $rootScope.format("system.logmanage.content")}
                ]

            };
        $scope.tableOptions1 = {
            	"bDetail":false,
                "sAjaxSource": 'runningLogListJson.do',
                "fnServerParams" : function (aoData) {
                	aoData.push({
                        "name" : "createtime",
                        "value" : $scope.param.createtime
                    });
                    aoData.push({
                        "name" : "regcode",
                        "value" : $scope.param.regcode
                    });
                    aoData.push({
                        "name" : "ipaddress",
                        "value" : $scope.param.ipaddress
                    });
                    aoData.push({
                        "name" : "logcontent",
                        "value" : $scope.param.logcontent
                    });
                    aoData.push({
                        "name" : "loglevel",
                        "value" : $scope.param.loglevel
                    });
                },
                "oTableTools": {
                    "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
                    "aButtons": [
                         {
 							sExtends: "text",
 							sButtonText: $rootScope.format("system.logmanage.export"),
 							fnClick: function ( nButton, oConfig, oFlash ) {
 								$scope.param.logtype=1;
 								$scope.exportLog();
 							},
 							fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
 							    
 							},
 							sButtonClass: "mytable_button_add"
                          }
                    ]
                },
                "aoColumns": [
                  	{
                        "sTitle" : $rootScope.format("common.table.no"),
                        "mData" : "",
                        "sWidth": "30px",
                        "bSortable" : false,
                        "sDefaultContent":""
                    }, 
                    {"mData": "componentname", "sTitle": $rootScope.format("system.sysstate.compname")}, 
                    {"mData": "createtime", "sTitle": $rootScope.format("system.subsystem.param.date")}, 
                    {"mData": "loglevel", "sTitle": $rootScope.format("system.logmanage.level"),"mRender": function (data, display, row) {
                        if (data == "4") {
                            return $rootScope.format("system.logmanage.deadly");
                        } else if (data == "3") {
                            return $rootScope.format("system.logmanage.serious");
                        } else if (data == "2") {
                            return $rootScope.format("system.logmanage.warning");
                        } else if (data == "1") {
                            return $rootScope.format("system.logmanage.info");
                        } else if (data == "0") {
                            return $rootScope.format("system.logmanage.debug");
                        }
                    }}, 
                    {"mData": "ipaddress", "sTitle": $rootScope.format("system.sysstate.ipaddress")}, 
                    {"mData": "logcontent", "sTitle": $rootScope.format("system.logmanage.content")}
                ]

            };
    }]);

});
