define([
    'components/graphs/module',
    'highcharts',
    'highcharts-exporting'
], function(module, config) {
    "use strict";

    return module.registerDirective('highChart', ['$http', 'httpService', '$compile', 'Utils',function($http, httpService, $compile, Utils) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope: {
                data: '@',
                type: '@',
                granularity : '@'
            },
            link: function(scope, element) {
            	var param = Utils.caclReportDate(scope.granularity);
            	var action = "getReportTempalteChartData.do";
            	var fontcolor = "";
            	var skinname = localStorage.getItem('sm-skin') || appConfig.smartSkin;
            	if(skinname == "smart-style-5"){
            		fontcolor = "#FFF";
            	}else{
            		fontcolor = "#333";
            	}
            	if(scope.data != "" ){
            		var option = {
        				colors : ['#F4E001','#FE8463', '#C6E579', '#F3A43B', '#60C0DD',
        						'#D7504B', '#4fd877', '#FAD860', '#F0805A', '#26C0C0','#925ba7','#e371cc' ],
        				chart : {
        					backgroundColor : null,
        					style : {
        						fontFamily : "Dosis, sans-serif"
        					},
        					plotBackgroundColor : null,
        					plotBorderWidth : null,
        					plotShadow : false,
        					margin : [ , 40, , ]
        				},
        				exporting : {
        					enabled : false,
        					url : 'export.do' // 配置导出路径
        				},
        				tooltip : {
        					pointFormat : '{point.y}'
        				},
        				plotOptions : {
        					line : {
        						dataLabels : {
        							enabled : true,
        							color: fontcolor
        						},
        						enableMouseTracking : true,
        						showInLegend : true
        					},
        					column : {
        						dataLabels : {
        							enabled : true,
        							color: fontcolor
        						},
        						colors : ['#F4E001','#FE8463', '#C6E579', '#F3A43B', '#60C0DD',
        	        						'#D7504B', '#4fd877', '#FAD860', '#F0805A', '#26C0C0','#925ba7','#e371cc' ],
        						showInLegend : true
        					},
        					pie : {
        						allowPointSelect : true,
        						cursor : 'pointer',
        						dataLabels : {
        							enabled : true,
        							color: fontcolor,
        							connectorColor : '#000000',
        							format : '<b>{point.name}</b>: {point.percentage:.1f} %'
        						},
        						showInLegend : true
        					}
        				},
        				series : []
        			}
            		
            		httpService.post(action,{"type":scope.type,"templateid":scope.data,"instanceid":scope.data,"starttime":param.starttime,"endtime":param.endtime}).then(function(resp){
            			var cType = resp[0].charttype;
            			option.chart.type = cType;
        				option.legend = {
        						itemStyle: {
            						color: fontcolor
            					},
            					y:15
        				};
            			option.title = {
            				style : {
            					fontSize : '16px',
            					fontWeight : 'bold',
            					textTransform : 'uppercase',
        						color: fontcolor
            				},
            				text : resp[0].title
            			};

            			if (cType == "column" || cType == "line") {
            				var align = "center";
            				if(resp[0].rotation=="60"){
            					align = "left";
            				}
            				option.chart.margin = [ , 40, 80, ];
            				option.xAxis = {
            					categories : eval(resp[0].category),
            					labels : {
            						rotation : eval(resp[0].rotation),
            						align : align,
            						style : {
            							fontSize : '12px',
            							fontFamily : 'Verdana, sans-serif',
        								color: fontcolor
            						}
            					}
            				};

            				option.yAxis = [ {
            					title : {
            						text : '金额',
        							style : {
        								color: fontcolor
        							}
            					},
            					min: 0,
        						labels : {
        							style : {
        								color: fontcolor
        							}
        						}
            				} ];
            				option.plotOptions.series = {
        						borderWidth: 0,
                                dataLabels: {
                                    enabled: true
                                }
            				};
            				$(resp).each(function(i) {
            					option.series.push({
            						name : resp[i].seriesName,
            						data : eval(resp[i].seriesData),
            					});
            				});

            			} else if (cType == "pie") {

            				option.series.push({
            					type : cType,
            					name : resp[0].seriesName,
            					data : eval(resp[0].seriesData)
            				});
            			}
            			$(element[0]).highcharts(option);
        			});
            	}
            }
        };
    }])
});
