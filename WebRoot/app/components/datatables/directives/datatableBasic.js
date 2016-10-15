define(['components/datatables/module',
    'jquery',
    'datatables',
    'datatables-responsive',
    'datatables-colvis',
    'datatables-tools',
    'datatables-bootstrap'
], function (module,$) {

    'use strict';
    
    return module.registerDirective('datatableBasic', function ($compile,$timeout,$rootScope) {
    	
    	function buildParams(aoData,options) {
            var sortColumnCount = 0;
            var sortField = [], sortDir = [], dataProp = [], sortProp = [], sortColumnIndex = [];
            var sortCollen=0;
            var sortStr = "";
            for (var a in aoData) {
              if (aoData[a].name == "iSortingCols") {
                sortColumnCount = aoData[a].value;
              }
              if (aoData[a].name.indexOf("mDataProp_") >= 0) {
                dataProp.push(aoData[a].value);
              }
              if (aoData[a].name.indexOf("sSortDir_") >= 0) {
                sortProp.push(aoData[a].value);
              }
              if (aoData[a].name.indexOf("iSortCol_") >= 0) {
                sortColumnIndex.push(aoData[a].value);
              }
              if (aoData[a].name.indexOf("default_param") >= 0) {
                sortColumnIndex.push({
                "default_param" : aoData[a].value
              });
            }
            if(aoData[a].name.indexOf("iSortingCols") >= 0){
              sortCollen=aoData[a].value;
            }
          }
          if (sortColumnCount >= 1) {
            for (var col = 0; col < sortColumnIndex.length; col++) {
              if (options.aaSorting && options.aaSorting.length == 0
                  && typeof(sortColumnIndex[col]) == "object") {
                sortStr = sortColumnIndex[col]["default_param"];
              } else {
                if (typeof(sortColumnIndex[col]) == "object")
                  continue;
                sortField.push(dataProp[sortColumnIndex[col]]);
                sortDir.push(sortProp[col]);
                sortStr += dataProp[sortColumnIndex[col]] + " " + sortProp[col]
                    + " , ";
              }
            }

            if (options.aaSorting && options.aaSorting.length == 0) {
            } else {
              sortStr = sortStr.slice(0, -2);
            }

            var trimStr = $.trim(sortStr);
            if (trimStr.charAt(trimStr.length - 1) == ",") {
              sortStr = sortStr.slice(0, -2);
            }

            // 合并参数 方便后台管理获取
            aoData.push({
              "name" : "sort",
              "value" : sortStr
            });
            aoData.push({
              "name" : "order",
              "value" : ""
            });
           } else {
            // 合并参数 方便后台管理获取
              if (options.aaSorting && options.aaSorting.length == 0) {
                aoData.push({
                  "name" : "sort",
                  "value" : sortColumnIndex[0] != undefined
                   ? sortColumnIndex[0]["default_param"]
                   : ""
                });
              
                aoData.push({
                  "name" : "order",
                  "value" : sortProp[0] != undefined ? sortProp[0] : ""
                });
              }
            }
            return aoData;
        }
    	
        return {
            restrict: 'A',
            scope: {
                tableOptions: '=',
                searchData: '&',
                refreshData: '&',
                getSubHtml: '&',
                initComplete: '&',
                clearDetailData: '&',
                searchComplete: '&'
            },
            link: function (scope, element, attributes) {
            	$timeout(function(){

                var options = {
                    "bDetail" : false,
                    "processing": true,
                    "bServerSide": true,
                    "aaSorting":[],
                    "sAjaxDataProp": 'aaData',
                    "sPaginationType": "full_numbers",
                    "sDom": "<'dt-toolbar'<T><l>>"+
                    "tr"+
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                    "bFilter" : false,
                    "autoWidth": false,
                    "bPaginate": true,
                    "bDestroy": true,
                    "bStateSave": false,
                    "iDisplayStart": 0,
                    "iDisplayLength": 10,
                    "sScrollX": '',
                    "bScrollCollapse":false,
                    "yScrollY":'',
                    "fnServerParams": null,
                    "smartResponsiveHelper": null,
                    "aoColumnDefs":[],
                    "oColVis": {
                        "buttonText": "<i class=\"glyphicon glyphicon-th-large pull-right\" id=\"showTitle\"  style=\"cursor:pointer;\"></i>",
                        "sAlign": "right"
                    },
                    "oTableTools": {
                        "sSwfPath": "./plugin/datatables/media/js/swf/copy_csv_xls.swf",
                        "aButtons": [
                        ]
                    },
                    "sServerMethod" : "POST",
                    "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
                    	var data = {};
                    	data = buildParams(aoData,options);
                    	if(attributes["clearDetailData"]){
                    		scope.clearDetailData();
                    	}
                        oSettings.jqXHR = $.ajax({
                            "url": sUrl,
                            "dataType": 'json',
                            "type": 'post',
                            "cache": false,
                            "headers": {
                                "Access-Control-Allow-Origin":"*",
                                "Access-Control-Allow-Headers":"X-Requested-With"
                            },
                            beforeSend: function (xhr) {
                            	xhr.withCredentials = true;
                            },
                            "data": data,
                            "success": fnCallback
                        });
                    },
                    "fnDrawCallback": function( oSettings ) {
                        var that = this;
                        if(options.bDetail){
                        	this.$('td:first-child').each( function (i) {
                        		$(this).addClass("details-control");
                        	} );
                        	this.$('td:eq(1)').each( function (i) {
                        		$(this).html(oSettings._iDisplayStart + i+1);
                        	} );
                        }else{
                        	this.$('td:eq(0)').each( function (i) {
                        		$(this).html(oSettings._iDisplayStart + i+1);
                        	} );
                        }
                        var thCheckbox = element.find("thead th > :input[type='checkbox']");
                        thCheckbox.on('click',function(){
                            var checkBox = $(this);
                            if(checkBox.get(0).checked){
                          	  element.find("td > :input[type='checkbox']").not('[disabled]').attr("checked",'true');
                            }else{
                          	  element.find("td > :input[type='checkbox']").not('[disabled]').removeAttr("checked");
                            }
                        })
                        if(element.find('th input[type="checkbox"]:first').size()>0){
                        	element.find('th input[type="checkbox"]:first').attr('checked',false);
                        }
                        if(attributes["searchComplete"]){
                            var api = this.api();
                            var data = api.rows( {page:'current'} ).data();
                    		scope.searchComplete({obj:data});
                    	}
                        $("#searchBut").attr("disabled",false);
                    },
          	        "fnCreatedRow": function(nRow, aData, iDataIndex) {
        	              $(nRow).find("td").not('.operator').each(function(){
        	                  $(this).attr("title",$(this).text())
        	              })
        	         },
        	         "fnHeaderCallback": function(nHead, aData, iStart, iEnd, aiDisplay) {
        	        	 if ($(nHead).parents("table").hasClass("Js_singleCheck")) {
        	        		    $("input:checkbox", nHead).remove();
        	        		} else {
        	        		    $("input:checkbox", nHead).on("change", function() {
        	        		        var checked = $(this).is(":checked");
        	        		        if (checked) {
        	        		            element.find("input:checkbox:visible").prop("checked", checked);
        	        		            element.find("input:checkbox:visible").parents("tr").addClass("selectedtr");
        	        		        } else {
        	        		            element.find("input:checkbox:visible").removeAttr("checked");
        	        		            element.find("input:checkbox:visible").parents("tr").removeClass("selectedtr");
        	        		        }
        	        		    });
        	        		}
        	         },   
                    "preDrawCallback": function () {
                        if (!this.smartResponsiveHelper) {
                            this.smartResponsiveHelper = new ResponsiveDatatablesHelper(element, {
                                tablet: 1024,
                                phone: 480
                            });
                        }
                        $("#searchBut").attr("disabled",true);
                    },
                    "rowCallback": function (nRow) {
                        this.smartResponsiveHelper.createExpandIcon(nRow);
                    },
                    "drawCallback": function (oSettings) {
                        this.smartResponsiveHelper.respond();
                    },
                    "initComplete" :function(oSettings,json){
                    	if(oSettings.sAjaxSource == 'getSystemState.do' && json.aaData.length>0){
                    		scope.initComplete({obj:json.aaData[0]});
                    	}
                    }
                };
                
                if($rootScope.currentLanguage.language=="zh-CN"){
                	options.oLanguage =
                    {
	                    "oAria" : {
	                        "sSortAscending" : ": activate to sort column ascending",
	                        "sSortDescending" : ": activate to sort column descending"
	                    },
	                    "oPaginate" : {
	                        "sFirst" : "<<",
	                        "sLast" : ">>",
	                        "sNext" : ">",
	                        "sPrevious" : "<"
	                    },
	                    "sEmptyTable" : "当前无可用记录",
	                    "sInfo" : "显示 _START_ 到 _END_ 共 _TOTAL_ 条记录",
	                    "sInfoEmpty" : "显示 0 到 0 共 0 条记录",
	                    "sInfoFiltered" : "",
	                    "sInfoPostFix" : "",
	                    "sInfoThousands" : ",",
	                    "sLengthMenu" : "显示 _MENU_ 条记录",
	                    "sLoadingRecords" : "正在加载...",
	                    "sProcessing" : "处理中...",
	                    "sProcessing": "<img src='styles/img/loading.gif' height='40px'/>",
	                    "sSearch" : "查询:",
	                    "sUrl" : "",
	                    "sZeroRecords" : "没有发现匹配的记录"
                    }
                }else{
                	options.oLanguage =
                    {
	                    "oAria" : {
	                        "sSortAscending" : ": activate to sort column ascending",
	                        "sSortDescending" : ": activate to sort column descending"
	                    },
	                    "oPaginate" : {
	                        "sFirst" : "<<",
	                        "sLast" : ">>",
	                        "sNext" : ">",
	                        "sPrevious" : "<"
	                    },
	                    "sProcessing": "<img src='styles/img/loading.gif' height='40px'/>",
                    }                	
                	
                }
                
                if(attributes.tableOptions){
                    options = angular.extend(options, scope.tableOptions)
                }

                var _dataTable;

                var childFormat = element.find('.smart-datatable-child-format');
                if(childFormat.length){
                    var childFormatTemplate = childFormat.remove().html();
                    element.on('click', childFormat.data('childControl'), function () {
                        var tr = $(this).closest('tr');

                        var row = _dataTable.row( tr );
                        if ( row.child.isShown() ) {
                            // This row is already open - close it
                            row.child.hide();
                            tr.removeClass('shown');
                        }
                        else {
                            var childScope = scope.$new();
                            childScope.d = row.data();
                            var html = "";
                            if(attributes["getSubHtml"]){
                            	html = scope.getSubHtml({obj:childScope.d});
                            }else{
                            	html = $compile(childFormatTemplate)(childScope);
                            }
                            row.child( html ).show();
                            tr.addClass('shown');
                        }
                    })
                }
                
                _dataTable =  element.DataTable(options);
                
                //scope.$apply();
                
                if(attributes["searchData"]){
                	$("#searchBut").unbind("click");
	                $("#searchBut").on('click',function(){
                		scope.searchData();
                		_dataTable.draw();
	                })
                }
                if(attributes["refreshData"]){
                	$("#refreshBut").unbind("click");
	                $("#refreshBut").on('click',function(){
	                	scope.refreshData();
	                })
                }
                
            	})   
            }//end
        }

    });
});
