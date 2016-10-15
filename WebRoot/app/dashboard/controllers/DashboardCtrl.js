define(['dashboard/module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('DashboardCtrl', function ($rootScope, $scope, $log, dashboardService, httpService, $http,$state, $timeout, $compile, Utils,dialogs) {
    	
    	$rootScope.dashboardid = -1;
    	
    	if($rootScope.timeType==undefined){
			$rootScope.timeType = 1;
        	$rootScope.time = Utils.caclDate($rootScope.timeType);
		}else{
			$rootScope.time = Utils.caclDate($rootScope.timeType);
		}
    	
    	
    	$scope.setTimeType = function(type){
    		$rootScope.timeType = type;
    		$rootScope.time = Utils.caclDate($rootScope.timeType);
        	$scope.loadDashboard($scope.currDashboardid);
    	};
    	
    	$scope.loadDashboard = function(dashboardid){
    		$rootScope.$emit('jarvisWidgetDestory', $('#widget-grid'));
			$http.get('getDashboard.do?dashboardid='+dashboardid).success(function(data){
				$scope.dashboards = data;
				$scope.currDashboardid = data[0].dashboardid;
	            //$scope.loadTaskData();
			});
    	};
    	
    	$scope.loadWidgetPage = function(){
    		$http.get('getWidgetPage.do').success(function(data){
    			$scope.dsbWidgetPageTypeList = data;
    		});
    	};
    	
        $scope.initDashboard = function(){
            $http.get('getDashboardTab.do').success(function(data){
                $scope.dashboardTabs = data;
                for(var i in data){
                	if(data[i].dsbDashboardPrivilege.isdisplay==1){
                		$scope.loadDashboard(data[i].dashboardid);
                		return false;
                	}
                }
            });
        };
        
        $scope.loadTaskData = function(){
        	var time = Utils.caclDate($rootScope.timeType);
        	if($scope.currDashboardid==2||$scope.currDashboardid==3||$scope.currDashboardid==4||$scope.currDashboardid==5){
        		var params = {"datatype":$scope.currDashboardid,"type":$rootScope.timeType,"starttime":time.starttime,"endtime":time.endtime};
            	httpService.get('loadTaskData.do',params).then(function(data){
            		$scope.total = {};
            		var name = data[0].key;
            		if(name=="domain"){
            			name = $rootScope.format('dashboard.fw.domain');
            		}else if(name=="file"){
            			name = $rootScope.format('dashboard.fw.file');
            		}
            		$scope.total.name = name;
            		$scope.total.commit = data[0].doc_count;
            		$scope.total.file = data[1].doc_count;
            		$scope.total.risk = data[3].doc_count;
            		$scope.total.security = data[2].doc_count;
                });
        	}
        };
        

        
        $scope.updateTabOrder = function() {
        	var order = 1;
            $(".priorder").each(function(index) {
                if ($scope.isNotEmpty($(this).html())) {
                    $(this).find(".tabdisplayorder").val(order++);
                }
            });
            httpService.post('updateTabOrder.do',{"serial":encodeURIComponent($("#priorderForm").serialize())}).then(function(resp){
            });
        };
        
        $scope.switchTab = function(domobj){
        	var dashboardid = $(domobj).find(".tabdashboardid").val();
        	if(dashboardid != ""){
        		$(".dashboardTabContent.add").remove();
        		$scope.loadDashboard(dashboardid);
        	}
        };
        
        $scope.doConfig = function(){
        	var dashcfgTmp = $(".fa.fa-2x.fa-plus").is(":visible");
        	if(!dashcfgTmp){
        		$scope.loadWidgetPage();
        		$scope.enableEdit = true;
        		$("#dashAdd").children("i").removeClass("hide");
        		$(".fa.fa-lg.fa-trash-o.hide").removeClass("hide");
        		$(".fa.fa-lg.fa-eye.hide").removeClass("hide");
        		$("#dashboardTab").find('.eye-close').removeClass("hide");
        		$scope.enableDashTabOrder();
        		$scope.enableDashRowOrder();
        		$scope.bindEvent();
        	}else{
        		$scope.enableEdit = false;
        		$("#dashAdd").children("i").addClass("hide");
        		$(".fa.fa-lg.fa-trash-o").addClass("hide");
        		$(".fa.fa-lg.fa-eye").addClass("hide");
        		$("#dashboardTab").find('.eye-close').addClass("hide");
        		$(".layoutAdd.only").parent().remove();
        		$scope.doFirst();
        		$scope.disableDashTabOrder();
        		$scope.disableDashRowOrder();
        	}
        };
        
        $scope.bindEvent = function(){
        	$(".self-define").unbind();
        	$(".self-define").editable($scope.submitTagEdit, {
    	        indicator: "saving...",
    	        tooltip  : $rootScope.format('dashboard.fw.dbclicktip'),
    	        event    : "dblclick",
    	        style    : "inherit",
    	        width    : "62px",
    	        height   : "18px",
    	        onblur   : "submit" },function() {
    	        	$scope.enableDashTabOrder();
    			}
    	    );
        };
        
        $scope.doEye = function(domobj){
        	if($(domobj).prev().children().length==1){
        		return false;
        	}
    		var clazz = $(domobj).attr("class");
        	if(clazz.indexOf("fa-eye-slash")>0){
        		$(domobj).removeClass("fa-eye-slash");
        		$(domobj).parent().removeClass().addClass("eye-open");
        		$(domobj).parent().prev().val("1");
        	}else{
        		if($("#dashboardTab li").find('[class="eye-open"]').length==1){
            		dialogs.notify($rootScope.format('dashboard.fw.hideerr'),$rootScope.format('dashboard.fw.hideerrtip'),{size:'sm',windowClass: 'dia-custom-top'});
            		return false;
            	}
        		$(domobj).addClass("fa-eye-slash");
        		$(domobj).parent().removeClass().addClass("eye-close");
        		$(domobj).parent().prev().val("0");
        	}
        	$scope.updateTabOrder();
        };
        
        $scope.doTrash = function(domobj){
        	if($(domobj).next().children().length==1){
        		return false;
        	}
        	var dashboardid = $(domobj).next().attr("dashid");
			var dlg = dialogs.confirm($rootScope.format('dashboard.fw.del'),$rootScope.format('dashboard.fw.deltip'),{size:'sm',windowClass: 'dia-custom-top'});
			dlg.result.then(function(btn){
        		$(domobj).parent().parent().remove();
        		httpService.post('deleteDashborad.do',{"dashID":dashboardid}).then(function(data){
        			$scope.doFirst();
        		});
			},function(btn){
				// confirmed "No."
			});
        };
        
        $scope.doFirst = function(){
        	var domobj = $("#dashboardTab li").find('[class="eye-open"]').eq(0).parent();
        	$("#dashboardTab li").removeClass("active");
        	domobj.addClass("active");
        	$scope.switchTab(domobj);
        }

        $scope.enableDashTabOrder = function () {
        	$("#dashboardTab").sortable().disableSelection();
        	$("#dashboardTab").sortable({
        		start: function(event, ui) {
        			var curentItem = ui.item;
        			$("#dashboardTab li").removeClass("active");
        			$(curentItem).addClass("active");
        		},
				beforeStop: function(event, ui) {
					$scope.updateTabOrder();
				}
        	});
        };
        
        $scope.disableDashTabOrder =  function() {
        	$("#dashboardTab").sortable({cancel: ".disable-sort"});
            $("#dashboardTab").sortable("destroy").disableSelection();
        }

        $scope.disableDashRowOrder = function (){
        	$(".dashboardTabContent").sortable({cancel: ".disable-sort"});
        	$(".dashboardTabContent").sortable("destroy").disableSelection();
        };
        
        $scope.enableDashRowOrder = function(){
        	if($("#issysdefault").val()=="0"){
        		$(".dashboardTabContent").sortable().disableSelection();
        		$(".dashboardTabContent").sortable({
        			beforeStop: function(event, ui) {
        				$scope.updateContentOrder();
        			}
        		});
        	}
        };
        
        $scope.updateContentOrder = function(){
        	var order = 1;
            $(".dashboardTabContent").find(".row").each(function(index) {
            	if ($scope.isNotEmpty($(this).html())) {
            		$(this).children().attr("roworder",order++);
                }
            });

            var curRowIdx = "";
            var curColumIdx = "";
            var curRowId = "";
            var curColumId = "";
            var curPageId = "";
            var curDashId = $scope.currDashboardid;
            
            var subData = "<form id='tempForm' target='post'>";
            
            $(".dashboardTabContent").find("article").each(function(index) {
            	curRowIdx = $(this).attr("roworder");
            	curColumIdx = $(this).attr("columnorder");
            	curPageId = $(this).attr("pageid");
            	curRowId = $(this).attr("rowid");
            	curColumId = $(this).attr("columnid");
            	subData += "<input type='hidden' name='dashBoardWidgetPageList["+index+"].columnorder' value='"+curColumIdx+"'/>"
            	+ "<input type='hidden' name='dashBoardWidgetPageList["+index+"].roworder' value='"+curRowIdx+"'/>"
            	+ "<input type='hidden' name='dashBoardWidgetPageList["+index+"].dashboardid' value='"+curDashId+"'/>"
            	+ "<input type='hidden' name='dashBoardWidgetPageList["+index+"].pageid' value='"+curPageId+"'/>"
            	+ "<input type='hidden' name='dashBoardWidgetPageList["+index+"].columnid' value='"+curColumId+"'/>"
             	+ "<input type='hidden' name='dashBoardWidgetPageList["+index+"].rowid' value='"+curRowId+"'/>"
            });
            subData += "</form>";
            $("#widget-grid").append(subData);
            $timeout(function () {
	            $.ajax({
	                type : "post",
	                url : "saveLayoutAndPage.do",
	                data : "dashboardid="+curDashId+"&serial="+encodeURIComponent($("#tempForm").serialize()),
	                success : function(resp) {
	                	$("#tempForm").remove();
	                }
	            });
            },500);
        };
        
        $scope.isNotEmpty = function(obj){ 
        	return typeof(obj) != "undefined" && $.trim(obj) != ""&&obj!=null&&obj!='null'; 
        };
        
        $scope.submitTagEdit =  function(value, settings) {
        	var dashID = $(this).attr('dashID');
            var li = $(this).parents("li");
            var that = this;
            var msg;
            $.ajax({
        		type : "POST",
        		url : "saveOrUpdateDashborad.do",
        		data : "dashName=" + value + "&dashID="+ dashID,
        		success : function(resp) {
        			msg = resp;
        		}
        	});
            $timeout(function () {
            	if (msg != null && msg != '') {
    				var retMsg = msg.split('|');
    				if (retMsg[0] == "success") {
    					$scope.currDashboardid = retMsg[1];
    					$(that).parents("li").find(".tabdashboardid").val(retMsg[1]);
    					$(that).parents("li").attr("id",retMsg[1]);
                        $(that).attr('dashid',retMsg[1]);
    					if(retMsg[2]=="-1" && retMsg[2]!="null"){
    						value = $(that).attr("name");
    						$(that).html($(that).attr("name"));
    						dialogs.notify($rootScope.format('dashboard.fw.nameerr'),$rootScope.format('dashboard.fw.nameerrtip'),{size:'sm',windowClass: 'dia-custom-top'});
    					}else{
    						$scope.currLayoutid = retMsg[2];
    						$(this).parent().attr("layoutid",retMsg[2]);
    					}
    				} else {
                        return this.revert;
    				}
    			}
            },500);
	     	return value;
        };
        
        $scope.deleteRow = function(domobj){
        	if($(".dashboardTabContent").children().length==2){
        		var appendHtml = '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
				        			+'<div class="layoutAdd only">'
					        			+'<a href="" onclick="angular.element(this).scope().selectLayout(this);">'
						        			+'<span class="fa fa-plus"></span>'
						        			+'<div>'+ $rootScope.format('dashboard.fw.addlayout') +'</div>'
					        			+'</a>'
				        			+'</div>'
			        			+'</div></div>';
        		$(".dashboardTabContent").append(appendHtml);
        	}else{
        		$(domobj).parent().parent().parent().prev().find(".rowAdd.hide").removeClass("hide");
        	}
        	$(domobj).parent().parent().parent().remove();
        	$scope.updateContentOrder();
        };
        
        $scope.addRow = function(domobj){
        	var appendHtml = '<div class="row">'
				+'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
	    			+'<div class="layoutAdd">'
	        			+'<a href="" onclick="angular.element(this).scope().selectLayout(this);">'
		        			+'<span class="fa fa-plus"></span>'
		        			+'<div>'+ $rootScope.format('dashboard.fw.addlayout') +'</div>'
	        			+'</a>'
	    			+'</div>'
	    			+'<div class="rowDel">'
		    			+'<a href="" onclick="angular.element(this).scope().deleteRow(this);">'
		    			+'<div>'+ $rootScope.format('dashboard.fw.delrow') +'</div>'
		    			+'</a>'
	    			+'</div>'
    			+'</div>'
			+'</div>';
			$(domobj).parent().parent().parent().after(appendHtml);
			$(domobj).parent().addClass("hide");
        };

        $scope.selectLayout = function(domobj){
        	$(".curselect").removeClass("curselect");
            $(domobj).addClass("curselect");
        	$('.layoutSelect').dialog({
        		autoOpen : false,
        		width : 455,
        		resizable : false,
        		modal : true,
        		title : $rootScope.format('dashboard.fw.sellayout'),
        		buttons : [{
        			html : "<i class='fa fa-times'></i>&nbsp;" + $rootScope.format('common.buttion.cancel'),
        			"class" : "btn btn-default",
        			click : function() {
        				$(this).dialog("close");
        			}
        		}]
        	});
        	$('.layoutSelect').dialog('open');
        };
        
        $scope.addRowLayout = function(index){
        	$scope.currLayoutid = index;
        	$('.layoutSelect').dialog('close');
        	$scope.selectRow();
        };
        
        $scope.selectRow = function(){
        	$('.rowSelect').dialog({
        		autoOpen : false,
        		width : 450,
        		resizable : false,
        		modal : true,
        		title : $rootScope.format('dashboard.fw.selrowhieight'),
        		buttons : [{
        			html : "<i class='fa fa-times'></i>&nbsp;"+ $rootScope.format('common.buttion.cancel'),
        			"class" : "btn btn-default",
        			click : function() {
        				$(this).dialog("close");
        			}
        		}]
        	});
        	$('.rowSelect').dialog('open');
        };
        
        $scope.addRowSelect = function(rowid){
        	var id = $scope.currLayoutid;
        	$('.rowSelect').dialog('close');
        	
        	var layout = '';
            if(id == 1){
                for(var i = 0; i < 3;i++){
                    layout +=  $scope.drawBlankColum(4,i+1,3,rowid);        
                }
            }else if(id == 2){
                layout += $scope.drawBlankColum(4,1,3,rowid);     
                layout += $scope.drawBlankColum(8,2,4,rowid);
            }else if(id == 3){
                layout += $scope.drawBlankColum(8,1,4,rowid);
                layout += $scope.drawBlankColum(4,2,3,rowid); 
            }else if(id == 4){
                for(var i = 0; i < 2;i++){
                    layout +=  $scope.drawBlankColum(6,i+1,2,rowid);        
                }
            }else if(id == 6){
            	for(var i = 0; i < 4;i++){
                    layout +=  $scope.drawBlankColum(3,i+1,5,rowid);        
                }
            }else{
                layout +=  $scope.drawBlankColum(12,1,1,rowid);
            }
            var rowBegin =	"<div class='row'>";
        	var rowEnd	 =	"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>" +
	        					"<div class='rowDel'>" +
				        			"<a href='' onclick='angular.element(this).scope().deleteRow(this);'>" +
				        				"<div>"+$rootScope.format('dashboard.fw.delrow')+"</div>" +
				        			"</a>" +
				        		"</div>" +
				        		"<div class='rowAdd'>" +
				        			"<a href='' onclick='angular.element(this).scope().addRow(this);'>" +
				        			"<div>"+$rootScope.format('dashboard.fw.addrow')+"</div>" +
				        			"</a>" +
				        		"</div>" +
				        	"</div>" +
		        			"</div>";
        	var rowHtml = rowBegin+layout+rowEnd;
        	var jarvis = angular.element(rowHtml);
            var el = $compile(jarvis)($scope);
            angular.element($(".curselect").parent().parent().parent()).before(jarvis);
        	$(".curselect").parent().parent().parent().remove();
        	$scope.updateContentOrder();
        };
        
        $scope.drawBlankColum = function(width,columnorder,columnid,rowid){
        	var height = 0;
        	if(rowid == 1){
        		height = 220;
        	}else if(rowid == 2){
        		height = 300;
        	}else{
        		height = 450;
        	}
        	var articleHtml= '<article pageid="" roworder="1" columnorder="'+columnorder+'" rowid="'+rowid+'" columnid='+columnid+' rowheight='+height+' class="col-xs-12 col-sm-12 col-md-12 col-lg-'+width+'">'
				        	+'<div jarvis-widget id="widget_r_"'+rowid+"c_"+columnid+'" data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-colorbutton="false" data-widget-sortable="false">'
					        		+'<header role="heading">'
					        			+'<span class="widget-icon hide"><i class="fa fa-bar-chart-o"></i></span>'
					        			+'<h2></h2>'
					        		+'</header>'
				        		+'<div>'
				        		+'<div class="widget-body no-padding">'
					        		+'<div id="non-date-graph" class="chart no-padding" style="height:'+height+'px">'
						        		+'<div class="selWidge" rel="nowidget">'
							        		+'<a href="" onclick="angular.element(this).scope().selWidget(this);">'
							        			+'<span class="fa fa-plus"></span>'
							        			+'<div>'+$rootScope.format('dashboard.fw.addwidget')+'</div>'
							        		+'</a>'
						        		+'</div>'
					        		+'</div>'
				        		+'</div>'
				        	 +'</article>';
        	return articleHtml;
        };
        
        $scope.selWidget = function(domobj){
        	$(".curblank").removeClass("curblank");
            $(domobj).addClass("curblank");
        	
        	$('.widgetSelect').dialog({
        		autoOpen : false,
        		width : 640,
        		resizable : false,
        		modal : true,
        		title : $rootScope.format('dashboard.fw.selwidget'),
        		buttons : [{
        			html : "<i class='fa fa-times'></i>&nbsp; "+ $rootScope.format('common.buttion.cancel'),
        			"class" : "btn btn-default",
        			click : function() {
        				$(this).dialog("close");
        			}
        		}]
        	});
        	$scope.drawWidgetSelect(1);
        	$('.widgetSelect').dialog('open');
        };
        
        $scope.switchWidgetTab = function(widgetpagetypeid){
        	$scope.drawWidgetSelect(widgetpagetypeid);
        };
        
        $scope.drawWidgetSelect = function(widgetpagetypeid){
        	var vstart = '[';
        	var vend = ']';
        	
        	httpService.post('loadWidgetPagesByType.do',{"widgetpagetypeid":widgetpagetypeid}).then(function(data){
        		var content = '';
    			$(data.dsbWidgetPages).each(function (i) {
    				content += "{'content': '<div class=\"slide_inner\"><a class=\"photo_link\" href=\"\"><img class=\"photo\" onclick=\"angular.element(this).scope().drawWidget("+data.dsbWidgetPages[i].pageid+")\" src=\"styles/img/charts/"+data.dsbWidgetPages[i].pageid+".png\"></a><a class=\"caption\">"+data.dsbWidgetPages[i].pagename+"</a></div>'},";
                });
    			var vhtml = eval(vstart+content.substring(0, content.length-1)+vend);
    			$(".slideshow.wpt"+widgetpagetypeid).agile_carousel({
    			    carousel_data: vhtml,
    			    carousel_outer_height: 180,
    			    carousel_height: 200,
    			    slide_height: 200,
    			    carousel_outer_width: 480,
    			    slide_width: 160,
    			    number_slides_visible: 3,
    			    transition_time: 330,
    			    control_set_1: "previous_button,next_button",
    			    control_set_2: "group_numbered_buttons"
    			});
            });
        };
        
        $scope.drawWidget = function(pageid){
        	var article = $(".curblank").parent().parent().parent().parent().parent().parent();
        	var dashboardid = $scope.currDashboardid;
        	var roworder = article.attr("roworder");
        	var columnorder = article.attr("columnorder");
        	var rowheight = article.attr("rowheight");
        	$scope.storeWidgetPage(dashboardid,pageid,roworder,columnorder);
        	
        	var height = $(".curblank").parent().parent().css("height");
        	$timeout(function(){
        		$.ajax({
            		type : "POST",
            		url : "loadWidgetPageById.do",
            		data : "pageid=" + pageid,
                    dataType: "json",
            		success : function(data) {
            			var id;
                		var url;
                		if(data.dsbWidgets.length != 0){
            				$(data.dsbWidgets).each(function (i) {
            					var id ="d"+dashboardid+"_r"+roworder+"_c"+columnorder+"_w"+data.dsbWidgets[i].widgetid;
            					var url = data.dsbWidgets[i].widgeturl;
            					article.find("h2").html(data.dsbWidgets[i].widgetname);
            					$scope.loadWidgetPageById(url,id,$(".curblank").parent().parent(),data.dsbWidgets[i].widgetcharttype,rowheight,data.dsbWidgets[i].plugintype,data.dsbWidgets[i].mapname)
            				});
                		}
                		
            		}
            	});
        	});
        	$('.widgetSelect').dialog('close');
        };
        
        $scope.storeWidgetPage = function(dashboardid,pageid,roworder,columnorder){
        	httpService.post('addWidgetPage.do',{"pageid":pageid,"dashboardid":dashboardid,"roworder":roworder,"columnorder":columnorder}).then(function(data){
            });
        };
        
        $scope.loadWidgetPageById = function(url, id, domobj,charttype,rowheight,plugintype,mapname){
        	var chart = angular.element('<echart-chart data="'+url+'" chart-type="'+charttype+'" mapname="' + mapname +'" load-data="loadData(callback)"  widget-page-id="'+id+'" style="height:'+rowheight+'px;"></echart-chart>');
        	if(plugintype == 2){
        		chart = angular.element('<d3-chart class="chart" data="'+url+'" chart-type="'+charttype+'" load-data="loadData(callback)"  widget-page-id="'+id+'" height="'+rowheight+'" on-click="d3OnClick(item)"  style="height:'+rowheight+'px;"></d3-chart>');
        	}
            var el = $compile(chart )( $scope );
            angular.element($(domobj).parent()).append(chart);
            $(domobj).remove();
        };
        
        $scope.addDashBoard = function(){
        	var dashIdx = $("#dashboardTab li").length+1;
        	var dashName = $rootScope.format('dashboard.fw.selfdef');
        	
        	for(var i = 1;i <= dashIdx; i++){
                var bFlag = false;
                $(".self-define").each(function(){
                    if($(this).text() == dashName){
                        bFlag = true;
                        return false;
                    }
                });
                if(bFlag){
                    dashName = $rootScope.format('dashboard.fw.selfdef') + i;
                }else{
                    break;
                }
            }
        	
        	var dashTab = '<li class="priorder active" id="'+dashIdx+'" onclick="angular.element(this).scope().switchTab(this)">'
				        	+'	<input type="hidden" name="dashboardprivilegelist['+dashIdx+'].dsbDashboard.dashboardid" class="tabdashboardid"/>' 
				        	+'	<input type="hidden" name="dashboardprivilegelist['+dashIdx+'].displayorder" class="tabdisplayorder"/>' 
				        	+'	<input type="hidden" name="dashboardprivilegelist['+dashIdx+'].isdisplay"  class="tabisdisplay" value="1"/>'
				        	+'	<a data-toggle="tab" rel="dashboardTabContent'+dashIdx+'" layoutid="'+dashIdx+'" eye="open">'
				        	+'		<i  onclick="angular.element(this).scope().doTrash(this)" class="trash fa fa-lg fa-trash-o"></i>'
				        	+'		<span dashid="-1" class="self-define" name='+dashName+' title="双击修改">'+dashName+'</span>'
				        	+'		<i onclick="angular.element(this).scope().doEye(this)" class="eye fa fa-lg fa-eye"></i>'
				        	+'	</a>'
				        	+'</li>';
        	var newDashHtml = '<div id="dashboardTabContent'+dashIdx+'" class="dashboardTabContent add">'
        					+'<input type="hidden" id="issysdefault" name="issysdefault" value="0">'
        					+'<div class="row">'
				        	+'	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
				        	+'		<div class="layoutAdd">'
				        	+'			<a href="" onclick="angular.element(this).scope().selectLayout(this);">'
				        	+'				<span class="fa fa-plus"></span>'
				        	+'				<div>' +$rootScope.format('dashboard.fw.addlayout')+'</div>'
				        	+'			</a>'
				        	+'		</div>'
				        	+'	</div>'
				        	+' </div>'
				        	+'</div>';
        	$(".dashboardTabContent").remove();
        	$("#dashboardTab").find("li").removeClass("active");
        	
        	$("#dashConfig").before(dashTab);
        	$("#widget-grid").append(newDashHtml);
        	
        	$scope.bindEvent();
        	$("#dashboardTab .active").find(".self-define").dblclick();
        	$("#dashboardTab .active").find(".self-define input").select();
        };
        
        $scope.deleteWidget = function(domobj){
        	
        	if($("#issysdefault").val()=="1"){
        		dialogs.notify($rootScope.format('dashboard.fw.delwderr'),$rootScope.format('dashboard.fw.delwderrtip'),{size:'sm',windowClass: 'dia-custom-top'});
        	}else{
            	if(!$scope.enableEdit){
            		dialogs.notify($rootScope.format('dashboard.fw.delwderr'),$rootScope.format('dashboard.fw.delwderrtip2'),{size:'sm',windowClass: 'dia-custom-top'});
            	}else{
            		var dlg = dialogs.confirm($rootScope.format('dashboard.fw.delwdconfirm'),$rootScope.format('dashboard.fw.delwdconfirmtip'),{size:'sm',windowClass: 'dia-custom-top'});
            		dlg.result.then(function(btn){
                    	var articeDom = $(domobj).parent().parent().parent().parent();
                		var curRowIdx = $(articeDom).attr("roworder");
                		var curColumIdx = $(articeDom).attr("columnorder");
                		var curDashId = $scope.currDashboardid;
                		var curPageId = $(articeDom).attr("pageid");
                		var rowheight = $(articeDom).attr("rowheight");
                		var param = {"roworder":curRowIdx,"columnorder":curColumIdx,"dashboardid":curDashId,"pageid":curPageId};
                		httpService.post('deleteWidgetPage.do',param).then(function(data){});
                		
                		var seladd = '<div id="non-date-graph" class="chart no-padding" style="height:'+rowheight+'px">'
			        					+'<div class="selWidge" rel="nowidget">'
			        						+'<a href="" onclick="angular.element(this).scope().selWidget(this);"">'
			        							+'<span class="fa fa-plus"></span>'
			        							+'<div>'+$rootScope.format('dashboard.fw.addwidget')+'</div>'
			        						+'</a>'
			        					+'</div>'
			        				 +'</div>';
        				$(domobj).before(seladd);
        				$(domobj).remove();            			
            		},function(btn){
            			// confirmed "No."
            		});
            	}
        	}
        };
        
        $scope.loadData = function(callback){
        	return dashboardService.loadData(callback);
    	};
    	
       $scope.d3OnClick = function(item){
         //alert(item.name);
       };
    	
        $scope.initDashboard();

    });
});
