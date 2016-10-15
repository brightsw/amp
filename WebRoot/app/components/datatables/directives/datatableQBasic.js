define(['components/datatables/module',
    'jquery',
    'datatables',
    'datatables-responsive',
    'datatables-colvis',
    'datatables-tools',
    'datatables-bootstrap'
], function (module,$) {

    'use strict';
    
    return module.registerDirective('datatableQBasic', function ($compile,$timeout) {
    	
        return {
            restrict: 'A',
            scope: {
                tableOptions: '=',
                searchData: '&',
                getSubHtml: '&',
                initComplete: '&'
            },
            link: function (scope, element, attributes) {

                var options = {
                    "bDetail" : true,
                    "processing": false,
                    "aaSorting":[],
                    "sAjaxDataProp": 'aaData',
                    "sPaginationType": "full_numbers",
                    "sDom": "<'dt-toolbar'<T><l>>"+
                    "tr"+
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                    "oLanguage" : {
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
                        //"sProcessing": "<img src='img/loading.gif' height='40px'/>",
                        "sSearch" : "查询:",
                        "sUrl" : "",
                        "sZeroRecords" : "没有发现匹配的记录"
                    } ,
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
                    "fnDrawCallback": function( oSettings ) {
                        var that = this;
                        if(options.bDetail){
                        	this.$('td:first-child').each( function (i) {
                        		$(this).addClass("details-control");
                        	} );
                        }
                        $("#searchBut").attr("disabled",false);
                    },                    

                };

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
                
                $("#searchBut").on('click',function(){
                	
                	if(attributes["searchData"]){
                		scope.searchData();
                	}
                });
                
                scope.$watch('tableOptions.aaData', function(value) {
                    var val = value || null;
                    if (val) {
                        _dataTable.clear();
                        _dataTable.destroy();
                        options.aaData = value;
                        _dataTable =  element.DataTable(options);
                        _dataTable.draw();
                    }
                });
                
            }
        }

    });
});
