define(['modules/system/module', 'lodash', 'jquery', 'domReady'], function(module, _, $, domReady) {

    'use strict';

    module.registerController('UserGroupCtrl', ['$scope','$rootScope', '$modal', '$log', 'httpService', 'userService','dialogs', function($scope,$rootScope, $modal, $log, httpService, userService,dialogs) {
        domReady(function() {
        	var rootNode = [{
        			"usergroupid": "0",
        			"groupname": $rootScope.format("system.user.all"),
        			"pid": null,
        			"open": true
        	}];
        	
            httpService.get('getUsergroups.do')
                .then(function(data) {
                    data = _.union(rootNode,data);
                    $scope.treeData = data;
                }, function(data) {
                    $log.debug("getUsergroups error" + data);
                })

            $scope.setting = {
                view: {
                    showLine: true,
                    showIcon: true,
                    dblClickExpand: false,
                    selectedMulti: false
                },
                data: {
                    key: {
                        name: "groupname"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "usergroupid",
                        pIdKey: "pid",
                        rootPid: ""
                    }
                },
                callback: {
                    onClick: onClick,
                    onDblClick: onDblClick,
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
                if (treeNode.isParent) {
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    zTree.expandNode(treeNode);
                }
                userService.groupId = treeNode.usergroupid;
                $("#searchBut").click();
                //$scope.$apply();
            }

            $scope.addGroup = function(treeNode) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/modules/system/views/addGroup.html',
                    controller: function($scope, treeNode) {
                        $scope.save = function() {
                            var zTree = $.fn.zTree.getZTreeObj("tree");
                            //var myTreeNode = zTree.getSelectedNodes()[0];
                            //var myTreeNode = getRoot();
                            var myTreeNode = zTree.getNodeByParam("usergroupid","0",null);
                            httpService.post('addGroup.do',$scope.group)
                            .then(function(data){
                            	 var node = {};
                            	 if(data != null && data != ''){
                   		            var retMsg = data.split('|');
                   		            if(retMsg[0] == "success"){
                   		            	node.usergroupid = retMsg[1];
                       		            node.groupname=$scope.group.groupname;
                       		            node.pid=rootNode[0].usergroupid;
                       		            treeNode = zTree.addNodes(myTreeNode, node)[0];
                                        modalInstance.close($scope.treeNode);
                   		            }else{
    					        		dialogs.notify($rootScope.format('system.parameter.errormsg'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
                   		            }
                            	 }
                            },function(data){
                            	//error
                            });
                        };
                        $scope.cancel = function() {
                            modalInstance.dismiss('cancel');
                        };
                    },
                    resolve: {
                        treeNode: function() {
                            return $scope.treeNode;
                        }
                    }
                });
                modalInstance.result.then(function() {}, function() {});
            };

            $scope.delGroup = function() {
    			var dlg = dialogs.confirm($rootScope.format('system.user.delgroup'),$rootScope.format("system.user.delgroup.confirm"),{size:'sm',windowClass: 'dia-custom-top'});
    			dlg.result.then(function(btn){
	                var zTree = $.fn.zTree.getZTreeObj("tree");
	                var treeNode = zTree.getSelectedNodes()[0];
	                
	                if (_.isUndefined(treeNode)) {
	                	return;
	    			}
	
	                var param = {
	                		groupid: treeNode.usergroupid
	                };
	                httpService.post('deleteGroup.do', param, function(data) {
		               	 if(data != null && data != ''){
		    		            var retMsg = data.split('|');
		    		            if(retMsg[0] == "success"){
		    		            	zTree.removeNode(treeNode);
		    		            }else{
					        		dialogs.notify($rootScope.format('system.parameter.errormsg'),retMsg[1],{size:'sm',windowClass: 'dia-custom-top'});
		    		            	$log.debug("error");
		    		            }
		             	 }else{
		             		 //error
		             		 $log.debug("error");
		             	 }
	                });
    			},function(btn){
    				// confirmed "No."
    			});
            };

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
            
            function getRoot() {
                var treeObj = $.fn.zTree.getZTreeObj("tree");
               var node = treeObj.getNodesByFilter(function (node) { return node.usergroupid == '0' }, true);
            }

            function onDblClick(e, treeId, treeNode) {
    			var zTree = $.fn.zTree.getZTreeObj("tree");
            	if(treeNode.children != null){
    				var node = treeNode.children[0];
    	        	zTree.selectNode(node);//选择点  
    	        	zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件  
    			}else{
    				zTree.selectNode(treeNode);//选择点  
    	        	zTree.setting.callback.onClick(null, zTree.setting.treeId, treeNode);//调用事件  
    			}
            }
        });
    }]);

});
