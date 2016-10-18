function chartLoader(id,url) {
	$("#"+id).empty();
	var fontcolor = "";
	if($('html').hasClass("smart-style-5")){
		fontcolor = "#FFF";
	}else{
		
	}
	var option = {
		colors : [ '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
				'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
				'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0' ],
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
				showInLegend : false
			},
			column : {
				colorByPoint : true,
				colors : [ '#C1232B', '#B5C334', '#FCCE10', '#E87C25',
						'#27727B', '#FE8463', '#9BCA63', '#FAD860', '#F3A43B',
						'#60C0DD', '#D7504B', '#C6E579', '#F4E001', '#F0805A',
						'#26C0C0' ],
				showInLegend : false
			},
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : true,
					color : fontcolor,
					connectorColor : '#000000',
					format : '<b>{point.name}</b>: {point.percentage:.1f} %'
				},
				showInLegend : true
			}
		},
		series : []
	}

	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		success : function(resp) {
			var cType = resp[0].charttype;
			option.chart.type = cType;
			option.title = {
				style : {
					fontSize : '16px',
					fontWeight : 'bold',
					textTransform : 'uppercase'
				},
				text : resp[0].seriesName
			};

			if (cType == "column" || cType == "line") {
				if($('html').hasClass("smart-style-5")){
					option.chart.margin = [ , 40, 80, ];
					option.xAxis = {
						categories : eval(resp[0].category),
						labels : {
							rotation : eval(resp[0].rotation),
							align : 'left',
							style : {
								fontSize : '12px',
								fontFamily : 'Verdana, sans-serif',
								color: "#FFF"
							}
						}
					};
	
					option.yAxis = [ {
						title : {
							text : '数量',
							style : {
								color: "#FFF"
							}
						},
						min: 0
					} ];
	
					$(resp).each(function(i) {
						option.series.push({
							name : resp[i].seriesName,
							data : eval(resp[i].seriesData),
						});
					});
				}else{
					option.chart.margin = [ , 40, 80, ];
					option.xAxis = {
						categories : eval(resp[0].category),
						labels : {
							rotation : eval(resp[0].rotation),
							align : 'left',
							style : {
								fontSize : '12px',
								fontFamily : 'Verdana, sans-serif'
							}
						}
					};
	
					option.yAxis = [ {
						title : {
							text : '数量'
						},
						min: 0
					} ];
	
					$(resp).each(function(i) {
						option.series.push({
							name : resp[i].seriesName,
							data : eval(resp[i].seriesData),
						});
					});
				}
			} else if (cType == "pie") {

				option.series.push({
					type : cType,
					name : resp[0].seriesName,
					data : eval(resp[0].seriesData)
				});
			}
			$('#'+id).highcharts(option);
		}
	});
}