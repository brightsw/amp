define(['components/core/module',
    'jquery',
    'ztree',
    'domReady'
], function (module,$,ztree,domReady) {

    'use strict';
    
    return module.registerDirective('polyTree', function ($parse,$compile) {
    	return {
            restrict: 'AE',
            scope:{
            	display:"@",
            	treedata:"=",
            	setting:"=",
            	id:"@"
            },
            link: function (scope, element, attrs) {
                domReady(function() {
                	scope.$watch('treedata',function(treedata) {
                		if(angular.isDefined(treedata)) {
                			$.fn.zTree.init(element, scope.setting, treedata);
                			var zTree = $.fn.zTree.getZTreeObj(scope.id);
                			var node = zTree.getNodes()[0];
                			if(scope.display == "child"){
                				if(zTree.getNodes()[0].children != null && zTree.getNodes()[0].children.length > 0){
                					var node = zTree.getNodes()[0].children[0];
                					zTree.selectNode(node);//选择点  
                					zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件  
                				}else if(zTree.getNodes()[1] != undefined && zTree.getNodes()[1].children != null && zTree.getNodes()[1].children.length > 0){
                					var node = zTree.getNodes()[1].children[0];
                					zTree.selectNode(node);//选择点  
                					zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件  
                				}
                			}else{
                				zTree.setting.callback.onDblClick(null, zTree.setting.treeId, node);
                			}
                		}
                	});
                });
            }
        };

    });
});
