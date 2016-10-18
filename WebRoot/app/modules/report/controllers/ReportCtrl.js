define(['modules/report/module', 'lodash', 'jquery', 'domReady'], function (module, _,$,domReady) {

    'use strict';

    module.registerController('ReportCtrl', ['$scope','$rootScope','$modal','$state','$stateParams','httpService','Upload','dialogs',function ($scope,$rootScope,$modal,$state,$stateParams, httpService,Upload,dialogs) {
    	$scope.param = {};
    	$scope.task = {};
    	
    	$scope.getReportTree = function(type){
    		var url = "";
    		var fieldurl = "";
    		var str = "";
			url = "getReportTemplateTree.do";
			str = "template";

    		var rootNode = [{
                "templateid": "0",
                "templatename": "全部",
                "title": "全部",
                "pid": null,
                "open": true
	        }];
    		
		    httpService.post(url)
		        .then(function(data) {
		            data = _.union(rootNode,data);
		            $scope.treeData = data;
		        }, function(data) {
		        });
		
		    $scope.setting = {
		        view: {
		            showLine: true,
		            showIcon: true,
		            dblClickExpand: false,
		            selectedMulti: false
		        },
		        data: {
		            key: {
		                name: "templatename"
		            },
		            simpleData: {
		                enable: true,
		                idKey: "templateid",
		                pIdKey: "pid",
		                rootPid: ""
		            }
		        },
		        callback: {
		            onClick: onClick,
		            beforeDrag: beforeDrag,
		            beforeDrop: beforeDrop
		        },
		        edit: {
		            enable: true,
		            showRemoveBtn: false,
		            showRenameBtn: false
		        }
		    };
		    $scope.treeNode = {};
		
		    function onClick(e, treeId, treeNode) {
		        $scope.treeNode = treeNode;
		        var zTree = $.fn.zTree.getZTreeObj("tree");
		        if (treeNode.isParent) {
		            zTree.expandNode(treeNode);
		        }else{
		        	if(treeNode.istemplate==-1){
		        		return false;
		        	}
		        	if(treeNode.istemplate==0){
		        		return false;
		        	}
		        	var aoColumns = [
	        		    {
	        		    "sTitle" : $rootScope.format('common.table.no'),
	     	            "mData" : "",
	     	            "sWidth": "30px",
	     	            "bSortable" : false
	        		    }
	        		];

   					$state.go("app.report.content",{"templateid":treeNode.templateid});
		        }
		    }

            function beforeDrag(treeId, treeNodes) {
                for (var i = 0, l = treeNodes.length; i < l; i++) {
                    if (treeNodes[i].drag === false) {
                        return false;
                    }
                }
                return true;
            }

            function beforeDrop(treeId, treeNodes, targetNode, moveType) {
                return targetNode ? targetNode.drop !== false : false;
            }
        };
        
        $scope.clearData = function(){
        	$scope.param.taskschedulername = "";
        	$scope.param.taskschedulertype = "";
        	$scope.param.startdateBegin = "";
        	$scope.param.startdateEnd = "";
        	$scope.param.taskobjectname = "";
        	$scope.param.enablestatus = "";
        	$scope.param.enddateBegin = "";
        	$scope.param.enddateEnd = "";
        	$('#startdateBegin').datepicker('option', 'maxDate', '');
        	$('#startdateEnd').datepicker('option', 'minDate', '');
        	$('#enddateBegin').datepicker('option', 'maxDate', '');
        	$('#enddateEnd').datepicker('option', 'minDate', '');
        }
        
        $scope.taskTableInit = function(){
	       	 httpService.get('getInstances.do')
		     		.then(function(data){
		     			$scope.instances = data;
		     		},function(data){
		     			
		     		});
	       	 
	       	 httpService.get('getTemplates.do')
		     		.then(function(data){
		     			$scope.templates = data;
		     		},function(data){
		     			
		     		});
	        $scope.tableOptions2 = {
	            	"bDetail":false,
	                "sAjaxSource": 'reportTaskListJson.do',
	                "fnServerParams" : function (aoData) {
	                	aoData.push({
	                        "name" : "taskschedulername",
	                        "value" : $scope.param.taskschedulername
	                    });
	                    aoData.push({
	                        "name" : "taskschedulertype",
	                        "value" : $scope.param.taskschedulertype
	                    });
	                    aoData.push({
	                        "name" : "startdateBegin",
	                        "value" : $scope.param.startdateBegin
	                    });
	                    aoData.push({
	                        "name" : "startdateEnd",
	                        "value" : $scope.param.startdateEnd
	                    });
	                    aoData.push({
	                        "name" : "taskobjectname",
	                        "value" : $scope.param.taskobjectname
	                    });
	                    aoData.push({
	                        "name" : "enablestatus",
	                        "value" : $scope.param.enablestatus
	                    });
	                    aoData.push({
	                        "name" : "enddateBegin",
	                        "value" : $scope.param.enddateBegin
	                    });
	                    aoData.push({
	                        "name" : "enddateEnd",
	                        "value" : $scope.param.enddateEnd
	                    });
	                },
	                "oTableTools": {
	                    "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
	                    "aButtons": [
	                         {
								sExtends: "text",
								sButtonText: $rootScope.format('common.button.add'),
								fnClick: function ( nButton, oConfig, oFlash ) {
							        $state.go("app.report.task.add");
								},
								fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
								    
								},
								sButtonClass: "mytable_button_add"
	                         }
	                    ]
	                },
	                "aoColumns": [
	                  	{
	                        "sTitle" : $rootScope.format('common.table.no'),
	                        "mData" : "",
	                        "sWidth": "30px",
	                        "bSortable" : false,
	                        "sDefaultContent":""
	                    }, 
	                    {"mData": "taskschedulername", "sTitle": $rootScope.format('report.task.name')}, 
	                    {"mData": "taskschedulertype", "sTitle": $rootScope.format('report.task.type'),"mRender": function (data, display, row) {
	                    	if (data == "1") {
	                            return  $rootScope.format('report.task.immdiate');
	                        } else if (data == "2") {
	                            return  $rootScope.format('report.task.once');
	                        }  else if (data == "3") {
	                            return  $rootScope.format('report.task.day');
	                        }  else if (data == "4") {
	                            return  $rootScope.format('report.task.week');
	                        }  else if (data == "5") {
	                            return  $rootScope.format('report.task.month');
	                        } 
	                    }}, 
	                    {"mData": "startdate", "sTitle":  $rootScope.format('report.task.starttime')}, 
	                    {"mData": "enddate", "sTitle":  $rootScope.format('report.task.endtime')}, 
	                    {"mData": "exectime", "sTitle":  $rootScope.format('report.task.exectime')}, 
	                    {"mData": "status", "sTitle":  $rootScope.format('report.task.status'),"mRender": function (data, display, row) {
	                    	if (data == "1") {
	                            return  $rootScope.format('report.task.normal');
	                        } else if (data == "2") {
	                            return  $rootScope.format('report.task.del');
	                        } else if (data == "3") {
	                            return  $rootScope.format('report.task.expired');
	                        } 
	                    }}, 
	                    {"mData": "enablestatus", "sTitle":  $rootScope.format('report.task.runstatus'),"mRender": function (data, display, row) {
	                    	if (data == "1") {
	                            return  $rootScope.format('report.task.start');
	                        } else if (data == "2") {
	                            return  $rootScope.format('report.task.stop');
	                        } 
	                    }}, 
	                    {"mData": "taskobjectname", "sTitle":  $rootScope.format('report.task.instance')}, 
						{ "sTitle" : "操作","mData": "taskschedulerid","bSortable" : false,"mRender": function (data, display, row) {
	                      	var str = "";
	                      	str += "&nbsp;<input type='button' class='mybtn' value='"+$rootScope.format("report.task.rpt")+"' onclick=\"angular.element(this).scope().goTaskReport('"+data+"')\">";
                    		str += "&nbsp;<input type='button' class='mybtn' value='"+$rootScope.format("common.button.modify")+"' onclick=\"angular.element(this).scope().goModifyTask('"+data+"')\">";
                    		str += "&nbsp;<input type='button' class='mybtn' value='"+$rootScope.format("common.button.del")+"' onclick=\"angular.element(this).scope().delTask('"+data+"')\">";
	                      	if(row.enablestatus=="2"){
	                      		str += "&nbsp;<input type='button' class='mybtn' value='"+$rootScope.format("report.task.start")+"' onclick=\"angular.element(this).scope().startTask('"+data+"')\">";
	                      	}else{
	                      		str += "&nbsp;<input type='button' class='mybtn' value='"+$rootScope.format("report.task.stop")+"' onclick=\"angular.element(this).scope().stopTask('"+data+"')\">";
	                      	}
	                      	return str;  
	                    }}
	                ]
	
	            };
    	};

        $scope.taskReportTableInit = function(){
	        $scope.tableOptions3 = {
	            	"bDetail":false,
	                "sAjaxSource": 'taskReportListJson.do',
	                "fnServerParams" : function (aoData) {
	                	aoData.push({
	                        "name" : "taskschedulerid",
	                        "value" : $stateParams.taskschedulerid
	                    });
	                },
	                "oTableTools": {
	                    "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
	                    "aButtons": [
	                         {
									sExtends: "text",
									sButtonText:  $rootScope.format('common.button.back'),
									fnClick: function ( nButton, oConfig, oFlash ) {
								        $state.go("app.report.task");
									},
									fnComplete: function ( nButton, oConfig, oFlash, sFlash ) {
									    
									},
									sButtonClass: "mytable_button_add"
	                         }
                         ]
	                },
	                "aoColumns": [
	                  	{
	                        "sTitle" :  $rootScope.format('common.table.no'),
	                        "mData" : "",
	                        "sWidth": "30px",
	                        "bSortable" : false,
	                        "sDefaultContent":""
	                    }, 
	                    {"mData": "filename", "sTitle":  $rootScope.format('report.task.filename')}, 
	                    {"mData": "execdate", "sTitle":  $rootScope.format('report.task.execdate')}, 
	                    {"mData": "exectime", "sTitle":  $rootScope.format('report.task.exectime')}, 
						{ "sTitle" :  $rootScope.format('common.table.oper'),"mData": "taskreportid","bSortable" : false,"mRender": function (data, display, row) {
	                      	var str = "";
                    		str += "&nbsp;<input type='button' class='mybtn' value='"+$rootScope.format("common.button.download")+"' onclick=\"angular.element(this).scope().downloadTaskReport('"+data+"')\">";
                    		str += "&nbsp;<input type='button' class='mybtn' value='"+$rootScope.format("common.button.del")+"' onclick=\"angular.element(this).scope().delTaskReport('"+data+"')\">";
	                      	return str;  
	                    }}
	                ]
	
	            };
    	};
    	
        $scope.changeType = function(event){
        	if($scope.task.taskschedulertype == 1){
            	$scope.task.startdate="";
            	$scope.task.enddate=null;
            	$scope.task.exectime="";
        	}else if($scope.task.taskschedulertype == 2){
            	$scope.task.enddate=null;
        	}
        	
        };
        
    	$scope.addTaskInit = function(){
    		$scope.task.taskschedulertype = 1;
	       	 httpService.get('getInstances.do')
		     		.then(function(data){
		     			$scope.instances = data;
		     		},function(data){
		     			
		     		});
	       	 
	       	 httpService.get('getTemplates.do')
		     		.then(function(data){
		     			$scope.templates = data;
		     		},function(data){
		     			
		     		});
	
	       	 httpService.get('getReportUsers.do')
		     		.then(function(data){
		     			$scope.users = data;
		     		},function(data){
		     			
		     		});
    	};
    	
        $scope.addTaskSub = function(event){
	        httpService.post('addTask.do',$scope.task)
	        .then(function(data){
		          if(data != null && data != ''){
		            var retMsg = data.split('|');
		            if(retMsg[0] == "success"){
		              $("#backBut").click();
		            }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
		            }
		          }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),data,{size:'sm',windowClass: 'dia-custom-top'});
		          }
	        },function(data){
	        	
	        });
        };

        $scope.goModifyTask = function(taskschedulerid){
	        $state.go("app.report.task.modify",{"taskschedulerid":taskschedulerid});
        }
        
        $scope.goTaskReport = function(taskschedulerid){
	        $state.go("app.report.task.report",{"taskschedulerid":taskschedulerid});
        }
        
    	$scope.modifyTaskInit = function(){

	       	 httpService.get('modifyTask.do',{"taskschedulerid":$stateParams.taskschedulerid})
		     		.then(function(data){
		     			$scope.instances = data.instances;
		     			$scope.templates = data.templates;
		     			$scope.users = data.users;
		     			$scope.task = data.task;
		     			
		     			var policynametmp = data.task.policyname.split(",");
		     			var policynameVal = [];
		     			for(var i=0;i<policynametmp.length;i++){
		     				policynameVal.push(policynametmp[i]);
		     			}
		     			$scope.task.policyname = policynameVal;
		     			
		     			var responsortmp = data.task.responsor.split(",");
		     			var responsorVal = [];
		     			for(var i=0;i<responsortmp.length;i++){
		     				responsorVal.push(responsortmp[i]);
		     			}
		     			$scope.task.responsor = responsorVal;
		     		},function(data){
		     			
		     		});
	       	 
    	};
    	
        $scope.modifyTaskSub = function(event){
	        httpService.post('modifyTask.do',$scope.task)
	        .then(function(data){
		          if(data != null && data != ''){
		            var retMsg = data.split('|');
		            if(retMsg[0] == "success"){
		            	$("#backBut").click();
		            }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
		            }
		          }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),data,{size:'sm',windowClass: 'dia-custom-top'});
		          }
	        },function(data){
	        	
	        });
        };

        $scope.delTask = function(taskschedulerid){
			var dlg = dialogs.confirm( $rootScope.format('report.task.deltask'), $rootScope.format('report.task.delconfirm'),{size:'sm',windowClass: 'dia-custom-top'});
			dlg.result.then(function(btn){
		        httpService.post('removeTask.do',{"taskschedulerid":taskschedulerid})
		        .then(function(data){
			          if(data != null && data != ''){
			            var retMsg = data.split('|');
			            if(retMsg[0] == "success"){
			            	$("#searchBut").click();
			            }else{
			        		dialogs.notify( $rootScope.format('common.tip.errinfo'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
			            }
			          }else{
			        		dialogs.notify( $rootScope.format('common.tip.errinfo'),data,{size:'sm',windowClass: 'dia-custom-top'});
			          }
		        },function(data){
		        	
		        });
    		},function(btn){
    			
    		})
        };

        $scope.delTaskReport = function(taskreportid){
			var dlg = dialogs.confirm( $rootScope.format('report.task.deltaskrpt'), $rootScope.format('report.task.delconfirm'),{size:'sm',windowClass: 'dia-custom-top'});
			dlg.result.then(function(btn){
		        httpService.post('removeTaskReport.do',{"taskreportid":taskreportid})
		        .then(function(data){
			          if(data != null && data != ''){
			            var retMsg = data.split('|');
			            if(retMsg[0] == "success"){
			            	$("#searchBut").click();
			            }else{
			        		dialogs.notify( $rootScope.format('common.tip.errinfo'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
			            }
			          }else{
			        		dialogs.notify( $rootScope.format('common.tip.errinfo'),data,{size:'sm',windowClass: 'dia-custom-top'});
			          }
		        },function(data){
		        	
		        });
    		},function(btn){
    			
    		});
        };

        $scope.downloadTaskReport = function(taskreportid){
        	$("#taskreportid").val(taskreportid);
        	$("#exportForm").submit(); 
        };

        $scope.startTask = function(taskschedulerid){
	        httpService.post('startTask.do',{"taskschedulerid":taskschedulerid})
	        .then(function(data){
		          if(data != null && data != ''){
		            var retMsg = data.split('|');
		            if(retMsg[0] == "success"){
		            	$("#searchBut").click();
		            }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
		            }
		          }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),data,{size:'sm',windowClass: 'dia-custom-top'});
		          }
	        },function(data){
	        	
	        });
        };

        $scope.stopTask = function(taskschedulerid){
	        httpService.post('stopTask.do',{"taskschedulerid":taskschedulerid})
	        .then(function(data){
		          if(data != null && data != ''){
		            var retMsg = data.split('|');
		            if(retMsg[0] == "success"){
		            	$("#searchBut").click();
		            }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
		            }
		          }else{
		        		dialogs.notify( $rootScope.format('common.tip.errinfo'),data,{size:'sm',windowClass: 'dia-custom-top'});
		          }
	        },function(data){
	        	
	        });
        };
    }]);

});

