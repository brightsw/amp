define(['modules/report/module', 'lodash', 'jquery','domReady'], function (module, _,$,domReady) {

    'use strict';

    module.registerController('ReportContentCtrl', ['$rootScope', '$scope', '$modal', '$state', '$stateParams', '$timeout', 'httpService', 'reportService', 'Upload', 'Utils','dialogs',function ($rootScope, $scope, $modal, $state, $stateParams, $timeout, httpService, reportService, Upload, Utils,dialogs) {
    	$scope.params = {};
    	$scope.type = $stateParams.type;
		$scope.granularity = $stateParams.granularity;
		$scope.templateid = $stateParams.templateid;
		$scope.params = Utils.caclReportDate(parseInt($scope.granularity));
   		var aoColumns = $stateParams.aoColumns;
   		
   		var action = "getReportTempalteListJson.do";
   		if($scope.type == '1'){
   			action = "getReportInstanceListJson.do";
   		}
   		
   		$scope.tableOptions = {
        	"bDetail":false,
            "sAjaxSource": action,
            "fnServerParams" : function (aoData) {
            	aoData.push({
                    "name": "type",
                    "value": $scope.type
                });
                aoData.push({
                    "name": "templateid",
                    "value": $scope.templateid
                });
                aoData.push({
                	"name": "instanceid",
                	"value": $scope.templateid
                });
                aoData.push({
                    "name": "starttime",
                    "value": $scope.params.starttime
                });
                aoData.push({
                    "name": "endtime",
                    "value": $scope.params.endtime
                });
            },
            "oTableTools": {
                "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
                "aButtons": [
                ]
            },
            "aoColumns": aoColumns
        };

		$scope.exportChart = function(type){
    		var chart = $("#container").highcharts();
        	var reportid = $scope.templateid;
        	chart.exportChart({
        		type : type,
        		url : "export.do?flag="+$scope.type+"&reportid="+reportid+"&type="+type+"&starttime="+$scope.params.starttime+"&endtime="+$scope.params.endtime
        	});
    	};
    	
    	$scope.createByTemplate = function () {
    		$state.go("app.report.template.add",{"type":$scope.type, "templateid":$scope.templateid,"granularity":$scope.granularity,"aoColumns":aoColumns});
        };
        
        $scope.modifyInstance = function(){
        	$state.go("app.report.instance.modify",{"type":$scope.type, "templateid":$scope.templateid,"granularity":$scope.granularity,"aoColumns":aoColumns});
        };
        
        $scope.removeInstance = function(){
			var dlg = dialogs.confirm('删除报表',"确定删除所选报表吗?",{size:'sm',windowClass: 'dia-custom-top'});
			dlg.result.then(function(btn){
        		httpService.post("removeReport.do",{"instanceid":$scope.templateid}).then(function(data){
	                var zTree = $.fn.zTree.getZTreeObj("tree");
	                var treeNode = zTree.getNodeByParam("typeid",$scope.templateid);
	                if (_.isUndefined(treeNode)) {
	                	return;
	    			}
	                zTree.removeNode(treeNode);
        			if(zTree.getNodes()[0].children != null && zTree.getNodes()[0].children.length > 0){
        				var node = zTree.getNodes()[0].children[0];
        	        	zTree.selectNode(node);//选择点  
        	        	zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件  
        			}else if(zTree.getNodes()[1].children != null && zTree.getNodes()[1].children.length > 0){
        				var node = zTree.getNodes()[1].children[0];
        	        	zTree.selectNode(node);//选择点  
        	        	zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件  
        			}else{
        				$state.go("app.report.instance",{});
        			}
        		},function(data){
        			
        		})
			},function(btn){
				// confirmed "No."
			});
        	
        };
        
    }]);

});

