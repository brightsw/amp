define([
    'components/graphs/module',
    'jquery',
    'echarts'
], function(module, $,echarts) {
    "use strict";

    return module.registerDirective('echartChart', ['$rootScope', '$state','$window', '$http', '$compile','$timeout', 'Utils','GarudaConstant', function($rootScope, $state,$window, $http, $compile, $timeout, Utils,GarudaConstant) {
    	
        var ChartType = {
        		BAR:"2",
        		LINE:"3",
        		PIE:"5",
        		MAP:"6",
        		SANKEY:"7",
        		SCATTER:"8",
        		TEST:"9"
        };
        
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope: {
                data: '@',
                widgetPageId: '@',
                isFullscreen: '@',
                chartType: '@',
                mapname: '@',
                serverid: '@',
                loadData: '&'
            },
            link: function(scope, element,attributes) {
                var params = {};
                params.func = scope.data;
                params.param = {};
                var geoCoordMap = {};
                if(attributes["serverid"]){
                    params.param.serverid = scope.serverid;
                }
                if(attributes["mapname"]){
                    params.param.mapname = scope.mapname;
                }
                if(params.func != ""){
                    load();
                }
                function load() {
                    scope.loadData({
                        callback: params
                    }).then(function(data) {
                        echarts.registerTheme("theme", $rootScope.theme);
                        var myChart = echarts.init(element[0],"theme");
                        var option = {
                			color: ['#7eb00a','#1bb2d8','#99d2dd','#1790cf','#afd6dd','#6f5553','#88b0bb','#1c7099','#038cc4','#75abd0','#c9ab00','#c14089'],                        		
                            calculable: true,
                            noDataLoadingOption: {
                                text: '暂无数据',
                                effect: 'whirling'
                            },
                            series: []
                        };

                        if(scope.chartType == ChartType.PIE){
                            option.tooltip = {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            };
                            option.legend = {
                                orient: 'horizontal',
                                x: 'center',
                                y: 'top',
                                data: data.legend.data
                            };
                            var itemStyle = [];
                            if(data.colors != undefined){
	                            itemStyle =  {
	                                normal: {
	                                    color: function(params) {
	                                        var colorList = ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
	                                                         '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
	                                                         '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'];
	                                        if(data.colors != undefined){
	                                            colorList = data.colors;
	                                        }
	                                        return colorList[params.data.color];
	                                    },
	                                    opacity: 0.8,
	                                    barBorderRadius:5,
	                                    shadowColor: 'rgba(0, 0, 0, 0.3)',
	                                    shadowBlur: 10
	                                }
	                            };
                            }
                            option.series.push({
                                name: '',
                                type: 'pie',
                                radius: ['30%','60%'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'outside'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '10',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length:10,
                                        length2:10
                                    }
                                },
                                avoidLabelOverlap: true,
                                startAngle: 180,
                                itemStyle:itemStyle,
                                center: ['50%', '50%'],
                                data: data.data
                            });

                            myChart.setOption(option);
                            myChart.on('click', eConsole);

                        } else if (scope.chartType == ChartType.BAR) { // 2:bar
                            if(scope.isFullscreen=="true"){
                                option.grid = {x:50,y:25,x2:25,y2:250};
                            }else{
                                option.grid = {x:50,y:10 ,x2:25,y2:60};
                            }
                            option.tooltip = {
                                trigger: 'axis'
                            };
                            if(data.tip != undefined){
                                option.tooltip.formatter = data.tip;
                            }
                            option.legend = {
                                data: []
                            };
                            if(!_.isUndefined(data.legend) && !_.isUndefined(data.legend.data)){
                                option.legend.data = data.legend.data;
                                option.grid = {x:75,y:25 ,x2:10,y2:60};
                            }
                            option.xAxis = {
                                type: 'category',
                                axisLabel: {
                                    show: true,
                                    interval:0,
                                    rotate: 60
                                },
                                data: data.category
                            };
                            option.yAxis = {
                                type: 'value'
                            }
                            for (var o in data.series) {
                                var itemStyle = [];
                                if(_.isUndefined(data.flag)){
                                	itemStyle =  {
                                        normal: {
                        					color: function(params) {
                        						var colorList = ['#7eb00a','#1bb2d8','#99d2dd','#1790cf','#afd6dd','#6f5553','#88b0bb','#1c7099','#038cc4','#75abd0','#c9ab00','#c14089'];
                        						return colorList[params.dataIndex]
                        					}
                                        }
                                    };
                                }
                                option.series.push({
                                    symbol:'circle',
                                    barWidth:'30',
                                    name: data.series[o].name,
                                    type: data.series[o].type,
                                    itemStyle :itemStyle,
                                    data: data.series[o].data
                                });


                            }

                            myChart.setOption(option);
                            myChart.on('click', eConsole);
                        } else if (scope.chartType == ChartType.LINE) { //3:line
                        	if(scope.isFullscreen=="true"){
                        		option.grid = {x:50,y:25,x2:25,y2:250};
                        	}else{
                        		option.grid = {x:50,y:10 ,x2:25,y2:60};
                        	}
                        	option.tooltip = {
                        			trigger: 'axis'
                        	};
                        	if(data.tip != undefined){
                        		option.tooltip.formatter = data.tip;
                        	}
                        	option.legend = {
                        			data: []
                        	};
                        	if(!_.isUndefined(data.legend) && !_.isUndefined(data.legend.data)){
                        		option.legend.data = data.legend.data;
                        		option.grid = {x:75,y:25 ,x2:10,y2:60};
                        	}
                        	option.xAxis = {
                        			type: 'category',
                        			axisLabel: {
                        				show: true,
                        				interval:0,
                        				rotate: 60
                        			},
                        			data: data.category
                        	};
                        	option.yAxis = {
                        			type: 'value'
                        	}
                        	for (var o in data.series) {
                        		option.series.push({
                        			symbol:'circle',
                        			barWidth:'30',
                        			name: data.series[o].name,
                        			type: data.series[o].type,
                        			data: data.series[o].data
                        		});
                        		
                        		
                        	}
                        	
                        	myChart.setOption(option);
                        	myChart.on('click', eConsole);

                        } else if (scope.chartType == ChartType.SANKEY) {
                            myChart.hideLoading();

                            option = {
                                title: {
                                    text: ''
                                },
                                tooltip: {
                                    trigger: 'item',
                                    triggerOn: 'mousemove'
                                },
                                series: [
                                    {
                                        type: 'sankey',
                                        layout: 'none',
                                        data: data.nodes,
                                        links: data.links,
                                        itemStyle: {
                                            normal: {
                                                borderWidth: 1,
                                                borderColor: '#aaa'
                                            }
                                        },
                                        lineStyle: {
                                            normal: {
                                                curveness: 0.5
                                            }
                                        }
                                    }
                                ]
                            };
                            myChart.setOption(option);
                            myChart.on('click', eConsole);

                        } else if (scope.chartType == ChartType.MAP) {
                            var mapurl = "api/geojson/" + scope.mapname + ".json";
                            $.get(mapurl, function (geoJson) {
                                echarts.registerMap(scope.mapname, geoJson);
                                
                                option.backgroundColor = '#FFFFF',
                                    option.color = ['#8FC7EC'],
                                    option.title = {
                                        text: '',
                                        subtext: '',
                                        left: 'center',
                                        textStyle : {
                                            color: '#fff'
                                        }
                                    },
                                    option.tooltip = {
                                        trigger: 'item',
                                        textStyle:{
                                            color:'#fff',
                                            fontStyle:'normal',
                                            fontWeight:'lighter',
                                            fontFamily:'sans-serief',
                                            fontSize:6
                                        },
                                        formatter: function (params) {
                                            var tar = params;
                                            if(tar.seriesIndex == 2){
                                                return tar.name + ":" + tar.data.value[2];
                                            }else{
                                                return tar.data.name;
                                            }
                                        }
                                    },
                                    option.legend = {
                                        orient: 'vertical',
                                        top: 'bottom',
                                        left: 'right',
                                        data:[],
                                        textStyle: {
                                            color: '#000000'
                                        }
                                        //selectedMode: ''
                                    },
                                    /*option.visualMap = {
                                        min: 1,
                                        max: 500,
                                        text:['高','底'],
                                        realtime: false,
                                        calculable: true,
                                        show:false,
                                        color: ['#ff1919', '#ff4040', '#ff6666','#ff9999','#ff4040']
                                    },*/
                                    option.geo = {
                                        map: scope.mapname,
                                        label: {
                                            emphasis: {
                                                show: true
                                            }
                                        },
                                        roam: true,
                                        itemStyle: {
                                            normal: {
                                                areaColor: '#8cc0e2',
                                                borderColor: '#fff'
                                            },
                                            emphasis: {
                                                areaColor: '#527266'
                                            }
                                        },
                                        regions:data.regions                           
                                    }
                                if($rootScope.currentLanguage.language=='zh-CN'){
                                	option.geo.nameMap=GarudaConstant.getNameMap();
                                }

                                option.series = data.series;
                                option.ipmap = data.ipmap;

                                myChart.setOption(option);
                                myChart.on('click', eConsole);
                            });

                        } else if (scope.chartType == ChartType.SCATTER) {
                            var schema = [
                                {name: 'date', index: 0, text: '日'},
                                {name: 'event', index: 1, text: '安全事件数'}
                            ];

                            var itemStyle = {
                                normal: {
                                    opacity: 0.8,
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowColor: 'rgba(255, 120, 0, 0.5)'
                                }
                            };

                            var option = {
                                //backgroundColor: '#333',
                                color: [
                                    '#dd4444', '#fec42c', '#80F1BE'
                                ],
                                legend: {
                                    y: 'top',
                                    data: ['安全事件攻击数','安全事件总数'],
                                    icon : "bar",
                                    textStyle: {
                                        color: '#000',
                                        fontSize: 12
                                    }
                                },
                                grid: {
                                    x: '10%',
                                    x2: 150,
                                    y: '18%',
                                    y2: '10%'
                                },
                                tooltip: {
                                    padding: 10,
                                    backgroundColor: '#222',
                                    borderColor: '#777',
                                    borderWidth: 1,
                                    formatter: function (obj) {
                                        var value = obj.value;
                                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 12px;padding-bottom: 7px;margin-bottom: 7px">'
                                            + '日期： ' + value[0] + '日'
                                            + '</div>'
                                            + obj.seriesName + '：' + value[1] + '<br>';
                                    }
                                },
                                xAxis: {
                                    type: 'value',
                                    name: '日期',
                                    nameGap: 16,
                                    nameTextStyle: {
                                        color: '#000',
                                        fontSize: 10
                                    },
                                    max: 31,
                                    splitLine: {
                                        show: false
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            color: '#1790cf'
                                        }
                                    },
                                    axisTick: {
                                        lineStyle: {
                                            color: '#1790cf'
                                        }
                                    },
                                    axisLabel: {
                                        formatter: '{value}',
                                        textStyle: {
                                            color: '#000'
                                        }
                                    }
                                },
                                yAxis: {
                                    type: 'value',
                                    name: '安全事件数',
                                    nameLocation: 'end',
                                    nameGap: 20,
                                    nameTextStyle: {
                                        color: '#000',
                                        fontSize: 10
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            color: '#1790cf'
                                        }
                                    },
                                    axisTick: {
                                        lineStyle: {
                                            color: '#1790cf'
                                        }
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#000'
                                        }
                                    }
                                },
                                visualMap: [
                                    {
                                        left: 'right',
                                        top: '10%',
                                        dimension: 1,
                                        min: 0,
                                        max: data.max,
                                        itemWidth: 30,
                                        itemHeight: 120,
                                        calculable: true,
                                        precision: 0.1,
                                        text: ['事件数'],
                                        textGap: 30,
                                        textStyle: {
                                            color: '#000'
                                        },
                                        inRange: {
                                            symbolSize: [10, 70]
                                        },
                                        outOfRange: {
                                            symbolSize: [10, 70],
                                            color: ['rgba(255,255,255,.2)']
                                        },
                                        controller: {
                                            inRange: {
                                                color: ['#c23531']
                                            },
                                            outOfRange: {
                                                color: ['#444']
                                            }
                                        }
                                    }
                                ],
                                series: [
                                    {
                                        name: '安全事件攻击数',
                                        type: 'scatter',
                                        itemStyle: itemStyle,
                                        data: data.data
                                    },
                                    {
                                        name: '安全事件总数',
                                        type: 'scatter',
                                        itemStyle: itemStyle,
                                        data: data.tdata
                                    }
                                ]
                            };

                            myChart.setOption(option);
                            myChart.on('click', eConsole);

                        } else if (scope.chartType == ChartType.TEST) {
                            var mapurl = "api/geojson/" + scope.mapname + ".json";
                            $.get(mapurl, function (geoJson) {
                                echarts.registerMap(scope.mapname, geoJson);
                                
                                var color =  ['#a6c84c', 'red', '#46bee9'];

                                option.backgroundColor = '#FFFFF',
                                    option.color = ['#8FC7EC'],
                                    option.title = {
                                        text: '',
                                        subtext: '',
                                        left: 'center',
                                        textStyle : {
                                            color: '#fff'
                                        }
                                    },
                                    option.tooltip = {
                                        trigger: 'item',
                                        textStyle:{
                                            color:'blue',
                                            fontStyle:'normal',
                                            fontWeight:'lighter',
                                            fontFamily:'sans-serief',
                                            fontSize:6
                                        },
                                        formatter: function (params) {
                                            var tar = params;
                                            if(tar.seriesIndex == 2){
                                                return tar.name + ":" + tar.data.value[2];
                                            }else{
                                                return tar.data[2].name;
                                            }
                                        }
                                    },
                                    option.legend = {
                                        orient: 'vertical',
                                        top: 'bottom',
                                        left: 'right',
                                        data:[],
                                        textStyle: {
                                            color: '#000000'
                                        }
                                        //selectedMode: ''
                                    },
                                    option.geo = {
                                        map: scope.mapname,
                                        label: {
                                            emphasis: {
                                                show: true
                                            }
                                        },
                                        roam: true,
                                        itemStyle: {
                                            normal: {
                                                areaColor: '#d9d7cb',
                                                borderColor: '#fff'
                                            },
                                            emphasis: {
                                                areaColor: '#397372'
                                            }
                                        }
                                    },
                                    option.series = [
										{
											name: '',
										    type: 'lines',
										    zlevel: 1,
										    effect: {
										        show: true,
										        period: 1,
										        trailLength: 0.5,
										        symbolSize: 2
										    },
										    lineStyle: {
										        normal: {
										            color: "red",
										            width: 6,
										            type:'solid',
										            curveness: 0
										        }
										    },
										    data: []
										},
										{
					        		        name: '',
					        		        type: 'lines',
					        		        zlevel: 2,
					        		        effect: {
					        		            show: false,
					        		            period: 2,
					        		            trailLength: 0,
					        		            symbol: planePath,
					        		            symbolSize: 8
					        		        },
					        		        lineStyle: {
					        		            normal: {
					        		                color: color[1],
					        		                width: 1,
					        		                opacity: 0.4,
					        		                type:'dashed',
					        		                curveness: 0
					        		            }
					        		        },
					            			data: []
					            		},
					            		{
					        		        name: '',
					        		        type: 'effectScatter',
					        		        coordinateSystem: 'geo',
					        		        zlevel: 2,
					        		        rippleEffect: {
					        		        	period:2,
					        		        	scale:2.5,
					        		        	brushType: 'stroke'
					        		        },
					        		        label: {
					        		            normal: {
					        		                show: true,
					        		                position: 'right',
					        		                formatter: '{b}',
					        		                textStyle:{
					        		                	color:'#004',
					        		                	fontStyle:'normal',
					        		                	fontWeight:'lighter',
					        		                	fontFamily:'sans-serief',
					        		                	fontSize:6
					        		                }
					        		            }
					        		        },
					        		        symbol:'emptyCircle',
					        		        symbolSize: function (val) {
					        		            return 20;
					        		        },
					        		        itemStyle: {
					        		            normal: {
					        		                color: 'blue',
					        		                borderColor: '#fff',
					        	                    borderWidth: 0,
					        	                    shadowColor: 'red',
					        	                    opacity: 1
					        	                    	
					        		            },
					        	                emphasis: {
					        	                    areaColor: 'rgba(3,215, 120, 3)',
					        	                    opacity: 1
					        	                }
					        		        },
					        		        data: []
					            		}            
                                   ];

                                //option.series = data.series;
                                //option.ipmap = data.ipmap;
                                myChart.setOption(option);
                                myChart.on('click', eConsole);
                                
                                
                                var data = [
                               	         {srccity:'上海',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:1000,srcgeo:'121.4648,31.2891',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'广州',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:2,srcgeo:'113.5107,23.2196',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'大连',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:300,srcgeo:'122.2229,39.4409',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'南宁',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:4,srcgeo:'108.479,23.1152',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'南昌',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:5,srcgeo:'116.0046,28.6633',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'拉萨',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:6,srcgeo:'91.1865,30.1465',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'长春',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:7,srcgeo:'125.8154,44.2584',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'包头',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:8,srcgeo:'110.3467,41.4899',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'重庆',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:900,srcgeo:'107.7539,30.1904',dstgeo:'116.4551,40.2539'},
                               	         {srccity:'北京',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:10,srcgeo:'116.4551,40.2539',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'广州',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:11,srcgeo:'113.5107,23.2196',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'大连',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:12,srcgeo:'122.2229,39.4409',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'南宁',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:13,srcgeo:'108.479,23.1152',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'南昌',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:14,srcgeo:'116.0046,28.6633',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'拉萨',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:15,srcgxeo:'91.1865,30.1465',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'长春',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:16,srcgeo:'125.8154,44.2584',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'包头',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:17,srcgeo:'110.3467,41.4899',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'重庆',dstcity:'上海',ip:'192.168.25.1,192.168.25.4',value:18,srcgeo:'107.7539,30.1904',dstgeo:'121.4648,31.2891'},
                               	         {srccity:'常州',dstcity:'厦门',ip:'192.168.25.1,192.168.25.4',value:19,srcgeo:'119.4543,31.5582',dstgeo:'118.1689,24.6478'}
                               	];
                                
                                clearInterval(timeTicket);
                                var timeTicket = setInterval(function (){
                                	var num = Math.floor(Math.random()*19);
                                	var d = [data[num]];
                                	converGeoCoord(d);
                                	
                                    var data0 = option.series[0].data;
                                    var data1 = option.series[1].data;
                                    var data2 = option.series[2].data;
                                    data0.splice(0,data0.length);
                                    data1.splice(0,data1.length);
                                    data2.splice(0,data2.length);
                                    _.forEach(convertData(d),function(v,k){
                                    	data0.push(v);
                                    });
                                    
                                    var geoArr = [];
                                    _.forEach(d,function(v,k){
                                    	var gsrc = {};
                                    	gsrc["loc"]="src";
                                    	gsrc["name"]=v.srccity;
                                    	gsrc["value"]=v.value;
                                    	geoArr.push(gsrc);
                                    	
                                    	var gdst = {};
                                    	gdst["loc"]="dst";
                                    	gdst["name"]=v.dstcity;
                                    	gdst["value"]=v.value;
                                    	geoArr.push(gdst);
                                    	
                                    });
                                    
                                    _.forEach(converGeoCoordMap(geoArr),function(v,k){
                                    	data2.push(v);
                                    });

                                    myChart.setOption(option);
                                }, 1000);

                            });
                        }



                        var planePath = 'path://M183.613,591.884c0,0,8.428-15.382,11.895-20.875l11.895,20.875l-11.79-10.5L183.613,591.884z';

                        function converGeoCoord(data){
                            _.forEach(data,function(o,key){
                                if(geoCoordMap[o.srccity]===undefined){
                                    geoCoordMap[o.srccity] = o.srcgeo.split(",");
                                }
                                if(geoCoordMap[o.dstcity]===undefined){
                                    geoCoordMap[o.dstcity] = o.dstgeo.split(",");
                                }
                            });
                        };

                        function convertData(data) {
                        	var color =  ['#a6c84c', 'red', '#46bee9'];
                            var res = [];
                            for (var i = 0; i < data.length; i++) {
                            	var num = Math.floor(Math.random()*10);
                                var dataItem = data[i];
                                var fromCoord = geoCoordMap[dataItem.srccity];
                                var toCoord = geoCoordMap[dataItem.dstcity];
                                if (fromCoord && toCoord) {
                                    res.push([{
                                        coord: fromCoord,
                                        lineStyle: {
									        normal: {
									            color: color[num%3],
									            width: 0,
									            type:'solid',
									            curveness: 0
									        },
									        emphasis: {
		                                    	color: color[num%3],
		                                    	width: 0,
		                                    	type:'solid',
		                                    	curveness: 0
		                                    }
									   }
                                    }, {
                                        coord: toCoord,
                                        lineStyle: {
									        normal: {
									            color: color[num%3],
									            width: 0,
									            type:'solid',
									            curveness: 0
									        },
									        emphasis: {
		                                    	color: color[num%3],
		                                    	width: 0,
		                                    	type:'solid',
		                                    	curveness: 0
		                                    }
									   }
                                    },{
                                        name: dataItem.srccity + "->" + dataItem.dstcity + " : " + dataItem.value
                                    }
                                    ]);
                                }
                            }
                            return res;
                        }

                        function converGeoCoordMap(data) {
                        	var color =  ['green', 'red', 'yellow'];
                            var res = [];
                            var symbolSize = 5;
                            var symbol = "emptyCircle";
                            _.forEach(data,function(v,k){
                            	var i = Math.floor(Math.random()*10);
                            	if(v.loc=="src"){
                            		symbolSize = 5;
                            		symbol = 'triangle';
                            	}else{
                            		symbolSize = 10;
                            		symbol = 'emptyCircle';
                            	}
                                res.push({
                                    name:v.name,
                                    value: geoCoordMap[v.name].concat(v.value),
			        		        symbol:symbol,
			        		        symbolSize: symbolSize,
                                    itemStyle: {
			        		            normal: {
			        		                color: color[i%3],
			        		                borderColor: 'green',
			        	                    borderWidth: 0,
			        	                    shadowColor: color[i%3],
			        	                    opacity: 1
			        	                    	
			        		            }
                                    }
                                });
                            });
                            return res;
                        }

                        function eConsole(param) {
                            if(params.func == "cpuStatusData" || params.func == "memStatusData" || params.func == "queueStatusData" || params.func == "diskStatusData" ){
                                return "";
                            }

                            var value = param.name;
                            if(value=="others"){
                                return "";
                            }
                            if(!_.isUndefined(option.ipmap)){
                                value = option.ipmap[value];
                                if(_.isUndefined(value)) return "";
                            }
                            $state.go(getURL(params.func),getParams(params.func , param,value));
                        }

                        function getURL(func){
                            var action = "";
                            if(func.indexOf("incident") > -1){
                                action = "app.monitor.incident";
                            }else if(func.indexOf("event") > -1){
                                action = "app.monitor.event";
                            }else if(func.indexOf("secAttack") > -1){
                                action = "app.monitor.event";
                            }
                            return action;
                        }

                        function getParams(url,params,value){
                            var time = Utils.getDate();
                            var starttime = time.date;

                            var stateParams = {};
                            var param = {};
                            var iswizard = true;
                            param['param0'] ={
                                action : 'app.dashboard',
                                name : encodeURIComponent("仪表盘"),
                                iswizard : iswizard,
                                data : [
                                ]
                            };

                            if(url == "incidentLevelDist"){
                                param['param0'].data.push({
                                    name:'severity',
                                    value:params.data.severity
                                });
                            }else if(url == "incidentCategoryDist"){
                                var cdata = null;
                                $.ajax({
                                    type : "GET",
                                    url : "getCategorysDataJson.do",
                                    data : "categoryid=103",
                                    async : false,
                                    success: function(categorys){
                                        cdata = categorys;
                                    }
                                });
                                var inccategory = _.filter(cdata,'instancename',params.name)[0];
                                param['param0'].data.push({
                                    name:'inccategoryid',
                                    value:inccategory.instanceid
                                });
                            }else if(url == "incidentNameDist"){
                                param['param0'].data.push({
                                    name:'incidentname',
                                    value:params.name
                                });
                            }else if(url == "eventSubSystemDist"){
                                var cdata = null;
                                $.ajax({
                                    type : "GET",
                                    url : "getSubSystemNamesDataJson.do",
                                    async : false,
                                    success: function(subsystems){
                                        cdata = subsystems;
                                    }
                                });
                                var subsystem = _.filter(cdata,'sysname',params.name)[0];
                                param['param0'].data.push({
                                    name:'subsystem',
                                    value:subsystem.regcode
                                });

                            }else if(url == "eventRuleTypeDist"){
                                var cdata = null;
                                $.ajax({
                                    type : "GET",
                                    url : "getCategorysDataJson.do",
                                    data : "categoryid=601",
                                    async : false,
                                    success: function(categorys){
                                        cdata = categorys;
                                    }
                                });
                                var ruletype = _.filter(cdata,'instancename',params.name)[0];
                                param['param0'].data.push({
                                    name:'ruletype',
                                    value:ruletype.reserved1
                                });
                            }else if(url == "eventLevelDist"){
                                param['param0'].data.push({
                                    name:'severity',
                                    value:params.data.severity
                                });
                            }else if(url == "eventSourceIPDist"){
                                param['param0'].data.push({
                                    name:'sourceaddress',
                                    value:params.name
                                });
                            }else if(url == "eventDestinationIPDist"){
                                param['param0'].data.push({
                                    name:'destinationaddress',
                                    value:params.name
                                });
                            }else if(url == "eventAttackMonthDist"){
                            	starttime = starttime.substring(0,8) + (params.dataIndex +1);
                            	if(params.seriesIndex==0){
                                    param['param0'].data.push({
                                        name:'categoryid',
                                        value:2
                                    });
                            	}
                            }else if(url == "secAttackChinaDist" || url == 'secAttackWorldDist'){
                                if(value.length>700){
                                    value = value.substr(0,700);
                                }
                                param['param0'].data.push({
                                    name:'sourceaddress',
                                    value:value
                                });
                            }
                            
                            param['param0'].data.push({
                                name:'starttime',
                                value:encodeURIComponent(starttime)
                            });
                            
                            var paramValue = $.base64.btoa(JSON.stringify(param));
                            stateParams.paramValue = paramValue;
                            stateParams.index = 0;

                            return stateParams;
                        }

                    }, function(data) {

                    });
                }

                $timeout(function(){
                    $("#onrefresh" + scope.widgetPageId).on('click',function(){
                        load();
                    });
                });


            }
        };
    }]);
});
