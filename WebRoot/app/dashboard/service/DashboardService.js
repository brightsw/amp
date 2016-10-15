define(['dashboard/module', 'lodash',
    'jquery',
    'echarts'], function (module, _) {

    'use strict';

    module.registerFactory('dashboardService',['$rootScope','$log','Utils','$http','$q','GarudaConstant', function ($rootScope, $log, Utils, $http,$q,GarudaConstant) {
        var service = {};

        service.loadData = function(callback){
            return eval(callback.func + "(callback.param)");
        };

        //CPU使用率
        function cpuStatusData(param){
            if(param.serverid == -1){
                return false;
            }
            var url = "getCpuStatusData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"GET",
                    url:url,
                    params:{"serverid":param.serverid}
                }).success(function(data){
                    var lineData = {};
                    lineData.type="line";
                    lineData.category = [];
                    lineData.series = [];
                    lineData.legend = {data:[]};

                    var firstData = _.first(data);
                    if(!_.isUndefined(firstData)){
                        var firstArr = firstData.VALUE.split(",");
                        for(var i=0;i<firstArr.length;i++){
                            var seriesObj = {};
                            seriesObj.type = "line";
                            var legendData = {};
                            if(i==0){
                                seriesObj.name = "cpu";
                                legendData.name="cpu";
                                legendData.icon = "bar";
                            }else{
                                seriesObj.name = "cpu" + i;
                                legendData.name="cpu" + i;
                                legendData.icon = "bar";
                            }
                            lineData.legend.data.push(legendData);
                            lineData.series.push(seriesObj);
                            seriesObj.data = [];
                        }
                        _.forEach(data, function(val, key) {
                            var darr = val.VALUE.split(",");
                            for(var j=0;j<darr.length;j++){
                                lineData.series[j].data.push(darr[j]);
                            }
                            lineData.category.push(val.CATEGORY);
                        });
                    }else{


                    }
                    lineData.tip = "{a} {b} : {c} %";

                    deferred.resolve(lineData);

                }).error(function(){
                    deferred.reject("错误");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //内存使用率
        function memStatusData(param){
            if(param.serverid == -1){
                return false;
            }
            var url = "getMemStatusData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"GET",
                    url:url,
                    params:{"serverid":param.serverid}
                }).success(function(data){

                    var lineData = {};
                    lineData.type="line";
                    lineData.category = [];
                    lineData.series = [];
                    lineData.legend={};
                    lineData.legend.data = [{name:'内存使用率',icon:'bar'}];
                    var seriesObj = {};
                    seriesObj.type = "line";
                    seriesObj.name = "内存使用率";
                    seriesObj.data = [];


                    _.forEach(data, function(val, key) {
                        lineData.category.push(val.CATEGORY);
                        seriesObj.data.push(val.VALUE.split(",")[0]);
                    });
                    lineData.series.push(seriesObj);
                    lineData.tip = "{a} {b} : {c} %";

                    deferred.resolve(lineData);

                }).error(function(){
                    deferred.reject("错误");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //磁盘使用情况
        function diskStatusData(param){
            var url = "getDiskStatusData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"GET",
                    url:url,
                    params:{"serverid":param.serverid}
                }).success(function(data){

                    var barData = {};
                    barData.flag = 0;
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];
                    barData.legend = {};

                    var seriesObj1 = {};
                    seriesObj1.type = "bar";
                    seriesObj1.name = "总磁盘空间";
                    seriesObj1.data = [];

                    var seriesObj2 = {};
                    seriesObj2.type = "bar";
                    seriesObj2.name = "已用磁盘空间";
                    seriesObj2.data = [];

                    var seriesObj3 = {};
                    seriesObj3.type = "bar";
                    seriesObj3.name = "ES已用磁盘空间";
                    seriesObj3.data = [];

                    var seriesObj4 = {};
                    seriesObj4.type = "bar";
                    seriesObj4.name = "EMAIL已用磁盘空间";
                    seriesObj4.data = [];


                    _.forEach(data, function(value, key) {
                        var valArr = value.MONITORVALUE.split(",");
                        if(value.MONITORITEMTYPE == '30'){
                            barData.category.push("");
                            seriesObj1.data.push(valArr[2]);
                            seriesObj2.data.push(valArr[1]);
                        }else if(value.MONITORITEMTYPE == '31'){
                            seriesObj3.data.push(valArr[1]);
                        }else if(value.MONITORITEMTYPE == '32'){
                            seriesObj4.data.push(valArr[1]);
                        }
                    });


                    barData.legend.data = [{name:'总磁盘空间',icon:'bar'},{name:'已用磁盘空间',icon:'bar'},{name:'ES已用磁盘空间',icon:'bar'},{name:'EMAIL已用磁盘空间',icon:'bar'}];
                    barData.series.push(seriesObj1);
                    barData.series.push(seriesObj2);
                    barData.series.push(seriesObj3);
                    barData.series.push(seriesObj4);
                    //barData.tip = "{a} {b} : {c} MB";

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("错误");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //告警严重级别分布
        function incidentLevelDist (param){
            var url = "getIncidentLevelDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var pieData = {};
                    pieData.type = "pie";
                    pieData.legend = {data:[]};
                    pieData.data = [];
                    pieData.colors = ['#6FB3E0','#FEE074','#FFB752','#FD0303'];

                    _.forEach(data, function(value) {
                        var legendData = {};
                        var name = GarudaConstant.getIncSeverity(parseInt(value.name));
                        var color = 0;
                        if(value.name == "1"){
                            color = 0;
                        }else if(value.name == "2"){
                            color = 1;
                        }else if(value.name == "3"){
                            color = 2;
                        }else if(value.name == "4"){
                            color = 3;
                        }
                        legendData.name = name;
                        legendData.icon = "bar";
                        pieData.legend.data.push(legendData);
                        pieData.data.push({
                            'name' : name,
                            'severity' : value.name,
                            'value' : value.value,
                            'color' : color
                        });
                    });

                    deferred.resolve(pieData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //告警类别分布
        function incidentCategoryDist(param){
            var url = "getIncidentCatetoryDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var barData = {};
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];

                    var seriesMsgObj = {};
                    seriesMsgObj.type = "bar";
                    seriesMsgObj.name = $rootScope.format('dashboard.widget.incidentCategoryDist');
                    seriesMsgObj.data = [];

                    _.forEach(data, function(value, key) {
                        barData.category.push(value.name);
                        seriesMsgObj.data.push(value.value);
                    });

                    barData.series.push(seriesMsgObj);

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //告警按名称分布
        function incidentNameDist(param){
            var url = "getIncidentNameDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var barData = {};
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];

                    var seriesMsgObj = {};
                    seriesMsgObj.type = "bar";
                    seriesMsgObj.name = $rootScope.format('dashboard.widget.incidentNameDist');
                    seriesMsgObj.data = [];

                    _.forEach(data, function(value, key) {
                        barData.category.push(value.name);
                        seriesMsgObj.data.push(value.value);
                    });

                    barData.series.push(seriesMsgObj);

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //安全事件按子系统来源分布
        function eventSubSystemDist(param){
            var url = "getSecEventSubSystemDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var barData = {};
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];

                    var seriesMsgObj = {};
                    seriesMsgObj.type = "bar";
                    seriesMsgObj.name = $rootScope.format('dashboard.widget.eventSubSystemDist');
                    seriesMsgObj.data = [];

                    _.forEach(data, function(value, key) {
                        barData.category.push(value.name);
                        seriesMsgObj.data.push(value.value);
                    });

                    barData.series.push(seriesMsgObj);

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };



        //安全事件按性质分布
        function eventRuleTypeDist(param){
            var url = "getSecEventRuleTypeDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var barData = {};
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];

                    var seriesMsgObj = {};
                    seriesMsgObj.type = "bar";
                    seriesMsgObj.name = $rootScope.format('dashboard.widget.eventRuleTypeDist');
                    seriesMsgObj.data = [];

                    _.forEach(data, function(value, key) {
                        barData.category.push(value.name);
                        seriesMsgObj.data.push(value.value);
                    });

                    barData.series.push(seriesMsgObj);

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //安全事件按级别分布
        function eventLevelDist(param){
            var url = "getSecEventLevelDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var pieData = {};
                    pieData.type = "pie";
                    pieData.legend = {data:[]};
                    pieData.data = [];
                    pieData.colors = ['#9ABC32','#6FB3E0','#FEE074','#FFB752','#FD0303'];

                    _.forEach(data, function(value) {
                        var legendData = {};
                        var name = GarudaConstant.getEvtSeverity(parseInt(value.name));
                        var color = 0;
                        if(value.name == "0"){
                            color = 0;
                        }else if(value.name == "1"){
                            color = 1;
                        }else if(value.name == "2"){
                            color = 2;
                        }else if(value.name == "3"){
                            color = 3;
                        }else if(value.name == "4"){
                            color = 4;
                        }
                        legendData.name = name;
                        legendData.icon = "bar";
                        pieData.legend.data.push(legendData);
                        pieData.data.push({
                            'name' : name,
                            'severity' : value.name,
                            'value' : value.value,
                            'color' : color
                        });

                    });

                    deferred.resolve(pieData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //安全事件按源地址分布
        function eventSourceIPDist(param){
            var url = "getSecEventSourceIPDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var barData = {};
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];

                    var seriesMsgObj = {};
                    seriesMsgObj.type = "bar";
                    seriesMsgObj.name = $rootScope.format('dashboard.widget.eventSourceIPDist');
                    seriesMsgObj.data = [];

                    _.forEach(data, function(value, key) {
                        barData.category.push(value.name);
                        seriesMsgObj.data.push(value.value);
                    });

                    barData.series.push(seriesMsgObj);

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //安全事件按目的地址分布
        function eventDestinationIPDist(param){
            var url = "getSecEventDestinationIPDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var barData = {};
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];

                    var seriesMsgObj = {};
                    seriesMsgObj.type = "bar";
                    seriesMsgObj.name = $rootScope.format('dashboard.widget.eventDestinationIPDist');
                    seriesMsgObj.data = [];

                    _.forEach(data, function(value, key) {
                        barData.category.push(value.name);
                        seriesMsgObj.data.push(value.value);
                    });

                    barData.series.push(seriesMsgObj);

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //安全攻击地图-中国
        function secAttackChinaDist(param){
            var url = "getSecAttackChinaDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{"mapname":GarudaConstant.getMapName(param.mapname)}
                }).success(function(data){

                	var mapData = {};
                    mapData.series = [];
                    var geoCoordMap = {};

                    var odata = _.sortByOrder(data,'value','desc');
                    var gdata = _.groupBy(odata,'srccity');
                    var provinceData = _.groupBy(odata,'dstprovince');

                    var pmap = {};
                    var regions = [];
                    var cmap = {};
                    var ipmap = {};
                    var sum = 0;
                    var ip = "";

                    _.forEach(data,function(o,key){
                        if(geoCoordMap[o.srccity]===undefined){
                            geoCoordMap[o.srccity] = o.srcgeo.split(",");
                        }
                        if(geoCoordMap[o.dstcity]===undefined){
                            geoCoordMap[o.dstcity] = o.dstgeo.split(",");
                        }
                    });

                    _.forEach(gdata, function(o, key) {
                        sum= _.sum(o,function(object){
                            return object.value;
                        });
                        cmap[key] = sum ;
                        ip = "";
                        _.forEach(o,function(v,key){
                            if(key == 0){
                                ip = v.ip;
                            }else{
                                ip = ip +"," + v.ip
                            }
                        });
                        var iparr = _.uniq(ip.split(','));
                        ipmap[key] = iparr.join(',');
                    });

                    _.forEach(provinceData, function(o, key) {
                        sum= _.sum(o,function(object){
                            return object.value;
                        });
                        pmap[key] = sum;
                    });


                    var maxProvinceData = _.max(_.map(pmap,function(n){
                        return n;
                    }));

                    _.forEach(pmap,function(val,key){
                        console.log(val,key);
                        var color = "#8cc0e2";
                        var pval = val / maxProvinceData;
                        if(pval < 1/5){
                            color="#6D929B";
                        }else if(pval>=1/5 && pval < 2/5){
                            color="#B5C334";

                        }else if(pval>=2/5 && pval < 3/5){
                            color="#FCCE10";
                        }else if(pval >= 3/5 && pval < 4/5 ){
                            color="#E87C25";
                        }else if(pval >= 4/5){
                            color="#27727B";
                        }
                        var tmpObj = {
                            name:key,
                            itemStyle:
                            {
                                normal: {
                                    areaColor: color,
                                    borderColor: '#404a59'
                                },
                                emphasis: {
                                    areaColor: '#2a333d'
                                }
                            }
                        }
                        regions.push(tmpObj);

                    });

                    _.forEach(data,function(o,key){
                        if(cmap[o.dstcity]===undefined){
                            cmap[o.dstcity]=0
                        }
                        cmap[o.dstcity] = cmap[o.dstcity] + parseInt(o.value);
                    });

                    var maxData = _.max(_.map(cmap,function(n){
                        return n;
                    }));

                    var planePath = 'path://M183.613,591.884c0,0,8.428-15.382,11.895-20.875l11.895,20.875l-11.79-10.5L183.613,591.884z';

                    var convertData = function (data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var dataItem = data[i];
                            var fromCoord = geoCoordMap[dataItem.srccity];
                            var toCoord = geoCoordMap[dataItem.dstcity];
                            if (fromCoord && toCoord) {
                                res.push([{
                                    name: dataItem.srccity + "->" + dataItem.dstcity + " : " + dataItem.value,
                                    coord: fromCoord
                                }, {
                                    coord: toCoord
                                }]);
                            }
                        }
                        return res;
                    };

                    var converGeoCoordMap = function(data) {
                        var res = [];
                        _.forEach(data,function(n,key){
                            res.push({
                                name:key,
                                value: geoCoordMap[key].concat(n)
                            });
                        });
                        return res;
                    };

                    var color =  ['#a6c84c', 'red', '#46bee9'];
                    var series = [];

                    series.push({
                        name: '',
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 2,
                            trailLength: 0.7,
                            color: 'green',
                            symbolSize: 2
                        },
                        lineStyle: {
                            normal: {
                                color: color[0],
                                width: 0,
                                curveness: 0.1
                            }
                        },
                        data: convertData(data)
                    });
                    series.push({
                        name: '',
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
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
                                curveness: 0.1
                            }
                        },
                        data: convertData(data)
                    });
                    series.push({
                        name: '',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period:2,
                            scale:2.5,
                            brushType: 'fill'
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
                        symbol:'circle',
                        symbolSize: function (val) {
                            return 5 + val[2] / maxData * 10;
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgba(255, 0, 0,0.8)',
                                borderColor: '#fff',
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                opacity: 0.8

                            },
                            emphasis: {
                                areaColor: 'rgba(3,215, 120, 3)',
                                opacity: 1
                            }
                        },
                        data: converGeoCoordMap(cmap)
                    });

                    mapData.series = series;
                    mapData.ipmap = ipmap;
                    mapData.regions = regions;
                    deferred.resolve(mapData);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };


        //安全攻击地图-世界
        function secAttackWorldDist(param){
            var url = "getSecAttackWorldDistData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{"mapname":GarudaConstant.getMapName(param.mapname)}
                }).success(function(data){
                    var mapData = {};
                    mapData.series = [];

                    var geoCoordMap = {};

                    var odata = _.sortByOrder(data,'value','desc');
                    var gdata = _.groupBy(odata,'srccity');
                    var countryData = _.groupBy(odata,'dstcountry');

                    var pmap = {};
                    var regions = [];
                    var cmap = {};
                    var ipmap = {};
                    var sum = 0;
                    var ip = "";

                    _.forEach(data,function(o,key){
                        if(geoCoordMap[o.srccity]===undefined){
                            geoCoordMap[o.srccity] = o.srcgeo.split(",");
                        }
                        if(geoCoordMap[o.dstcity]===undefined){
                            geoCoordMap[o.dstcity] = o.dstgeo.split(",");
                        }
                    });

                    _.forEach(gdata, function(o, key) {
                        sum= _.sum(o,function(object){
                            return object.value;
                        });
                        cmap[key] = sum ;
                        ip = "";
                        _.forEach(o,function(v,key){
                            if(key == 0){
                                ip = v.ip;
                            }else{
                                ip = ip +"," + v.ip
                            }
                        });
                        var iparr = _.uniq(ip.split(','));
                        ipmap[key] = iparr.join(',');
                    });

                    _.forEach(countryData, function(o, key) {
                        sum= _.sum(o,function(object){
                            return object.value;
                        });
                        pmap[key] = sum;
                    });


                    var maxCountryData = _.max(_.map(pmap,function(n){
                        return n;
                    }));

                    _.forEach(pmap,function(val,key){
                        var color = "#8cc0e2";
                        var pval = val / maxCountryData;
                        if(pval < 1/5){
                            color="#6D929B";
                        }else if(pval>=1/5 && pval < 2/5){
                            color="#B5C334";

                        }else if(pval>=2/5 && pval < 3/5){
                            color="#FCCE10";
                        }else if(pval >= 3/5 && pval < 4/5 ){
                            color="#E87C25";
                        }else if(pval >= 4/5){
                            color="#27727B";
                        }
                        var tmpObj = {
                            name:key,
                            itemStyle:
                            {
                                normal: {
                                    areaColor: color,
                                    borderColor: '#404a59'
                                },
                                emphasis: {
                                    areaColor: '#2a333d'
                                }
                            }
                        }
                        regions.push(tmpObj);

                    });

                    _.forEach(data,function(o,key){
                        if(cmap[o.dstcity]===undefined){
                            cmap[o.dstcity]=0
                        }
                        cmap[o.dstcity] = cmap[o.dstcity] + parseInt(o.value);
                    });

                    var maxData = _.max(_.map(cmap,function(n){
                        return n;
                    }));

                    var planePath = 'path://M183.613,591.884c0,0,8.428-15.382,11.895-20.875l11.895,20.875l-11.79-10.5L183.613,591.884z';

                    var convertData = function (data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var dataItem = data[i];
                            var fromCoord = geoCoordMap[dataItem.srccity];
                            var toCoord = geoCoordMap[dataItem.dstcity];
                            if (fromCoord && toCoord) {
                                res.push([{
                                    name: dataItem.srccity + "->" + dataItem.dstcity + " : " + dataItem.value,
                                    coord: fromCoord
                                }, {
                                    coord: toCoord
                                }]);
                            }
                        }
                        return res;
                    };

                    var converGeoCoordMap = function(data) {
                        var res = [];
                        _.forEach(data,function(n,key){
                            res.push({
                                name:key,
                                value: geoCoordMap[key].concat(n)
                            });
                        });
                        return res;
                    };

                    var color =  ['#a6c84c', 'red', '#46bee9'];
                    var series = [];

                    series.push({
                        name: '',
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 2,
                            trailLength: 0.7,
                            color: 'green',
                            symbolSize: 2
                        },
                        lineStyle: {
                            normal: {
                                color: color[0],
                                width: 0,
                                curveness: 0.1
                            }
                        },
                        data: convertData(data)
                    });
                    series.push({
                        name: '',
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
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
                                curveness: 0.1
                            }
                        },
                        data: convertData(data)
                    });
                    series.push({
                        name: '',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period:2,
                            scale:2.5,
                            brushType: 'fill'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: ['50%', '50%'],
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
                        symbol:'circle',
                        symbolSize: function (val) {
                            return 10 + val[2] / maxData * 10;
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgba(255, 0, 0,0.8)',
                                borderColor: '#fff',
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                opacity: 0.8

                            },
                            emphasis: {
                                areaColor: 'rgba(3,215, 120, 3)',
                                opacity: 1
                            }
                        },
                        data: converGeoCoordMap(cmap)
                    });

                    mapData.series = series;
                    mapData.ipmap = ipmap;
                    mapData.regions = regions;
                    deferred.resolve(mapData);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };
        
        function secAttackRealTimeChina(param){
    		var url = "getSecAttackChinaDistData.do";    	
    		var deferred = $q.defer();
    		try {
    			$http({
    				method:"POST",
    				url:url,
    				params:{"mapname":GarudaConstant.getMapName(param.mapname)}
    			}).success(function(data){
    				
    				var mapData = {};
    				data = [
    				        {srccity:'上海',dstcity:'北京',ip:'192.168.25.1,192.168.25.4',value:1000,srcgeo:'121.4648,31.2891',dstgeo:'116.4551,40.2539'}
    				];
    				
                	mapData.series = [];
                	var geoCoordMap = {};
                	
                	var planePath = 'path://M183.613,591.884c0,0,8.428-15.382,11.895-20.875l11.895,20.875l-11.79-10.5L183.613,591.884z';
                	
                	var converGeoCoord = function(data){
                    	_.forEach(data,function(o,key){
                    		if(geoCoordMap[o.srccity]===undefined){
                    			geoCoordMap[o.srccity] = o.srcgeo.split(",");
                    		}
                    		if(geoCoordMap[o.dstcity]===undefined){
                    			geoCoordMap[o.dstcity] = o.dstgeo.split(",");
                    		}
                    	});
                	};
                	
            		var convertData = function (data) {
            		    var res = [];
            		    for (var i = 0; i < data.length; i++) {
            		        var dataItem = data[i];
            		        var fromCoord = geoCoordMap[dataItem.srccity];
            		        var toCoord = geoCoordMap[dataItem.dstcity];
            		        if (fromCoord && toCoord) {
            		            res.push([{
            		                coord: fromCoord
            		            }, {
            		                coord: toCoord
            		            },{
            		            	name: dataItem.srccity + "->" + dataItem.dstcity + " : " + dataItem.value
            		            }]);
            		        }
            		    }
            		    return res;
            		};
            		
            		var converGeoCoordMap = function(data) {
            			var res = [];
            			_.forEach(data,function(n,key){
            				res.push({
        		        		name:key,
        		        		value: geoCoordMap[key].concat(n)
            				});
            			});
            			return res;
            		};

            		var color =  ['#a6c84c', 'red', '#46bee9'];
            		var series = [];
            		
            		series.push({
            			name: '',
        		        type: 'lines',
        		        zlevel: 1,
        		        effect: {
        		            show: true,
        		            period: 2,
        		            trailLength: 0.7,
        		            color: 'green',
        		            symbolSize: 2
        		        },
        		        lineStyle: {
        		            normal: {
        		                color: color[0],
        		                width: 0,
        		                curveness: 0.2
        		            }
        		        },
        		        data: convertData(data)
            		});
            		series.push({
        		        name: '',
        		        type: 'lines',
        		        zlevel: 2,
        		        effect: {
        		            show: true,
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
        		                curveness: 0.2
        		            }
        		        },
            			data: convertData(data)
            		});
            		series.push({
        		        name: '',
        		        type: 'effectScatter',
        		        coordinateSystem: 'geo',
        		        zlevel: 2,
        		        rippleEffect: {
        		        	period:2,
        		        	scale:2.5,
        		        	brushType: 'fill'
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
        		        symbol:'circle',
        		        symbolSize: function (val) {
        		            return 5 + val[2] / maxData * 10;
        		        },
        		        itemStyle: {
        		            normal: {
        		                color: 'rgba(128, 0, 0,0.8)',
        		                borderColor: '#fff',
        	                    borderWidth: 0,
        	                    shadowColor: 'rgba(0, 0, 0, 0.5)',
        	                    opacity: 0.8
        	                    	
        		            },
        	                emphasis: {
        	                    areaColor: 'rgba(3,215, 120, 3)',
        	                    opacity: 1
        	                }
        		        },
        		        data: converGeoCoordMap(cmap)
            		});
            		
            		mapData.series = series;
            		mapData.ipmap = ipmap;
                	deferred.resolve(mapData);
                }).error(function(){
                	deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;      		
    	};         

        //安全事件按源、目的、端口联合分布
        function eventSourceDesPortDist(param){
            var url = "getEventSourceDesPortDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //安全事件（网络攻击、总事件分类）按月展示
        function eventAttackMonthDist(param){
            var url = "getEventAttackMonthDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //网络会话按源、目的、端口联合分布
        function sessionSourceDesPortDist(param){
            var url = "getSessionSourceDesPortDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //HTTP类会话连接图
        function httpSessionSourceDesPortDist(param){
            var url = "getHttpSessionSourceDesPortDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        function httpSessionDomainDist(param){
            var url = "getHttpSessionDomainDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var retArr = [];
                    _.forEach(data.domain, function(value, key) {
                        var obj = {};
                        obj.name = "soc@cluster@domain@" + value;
                        var importsArr = [];
                        var imports =  _.filter(data.categorys,'domain',value);
                        _.forEach(imports,function(val,k){
                            importsArr.push("soc@cluster@src@" + val.sourceaddress);
                        });
                        obj.imports=importsArr;
                        obj.size=100;
                        retArr.push(obj);
                    });
                    _.forEach(data.sourceaddress, function(value, key) {
                        var obj = {};
                        obj.name = "soc@cluster@src@" + value;
                        var importsArr = [];
                        obj.imports=importsArr;
                        obj.size=100;
                        retArr.push(obj);
                    });
                    deferred.resolve(retArr);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //DNS类会话连接图
        function dnsSessionSourceDesPortDist(param){
            var url = "getDnsSessionSourceDesPortDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        function dnsSessionDomainDist(param){
            var url = "getDnsSessionDomainDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var retArr = [];
                    _.forEach(data.domain, function(value, key) {
                        var obj = {};
                        obj.name = "soc@cluster@domain@" + value;
                        var importsArr = [];
                        var imports =  _.filter(data.categorys,'domain',value);
                        _.forEach(imports,function(val,k){
                            importsArr.push("soc@cluster@src@" + val.sourceaddress);
                        });
                        obj.imports=importsArr;
                        obj.size=100;
                        retArr.push(obj);
                    });
                    _.forEach(data.sourceaddress, function(value, key) {
                        var obj = {};
                        obj.name = "soc@cluster@src@" + value;
                        var importsArr = [];
                        obj.imports=importsArr;
                        obj.size=100;
                        retArr.push(obj);
                    });
                    deferred.resolve(retArr);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //应用联接图
        function sourceDesAlprotoDist(param){
            var url = "getSourceDesAlprotoDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //应用联接图
        function alprotoCategoryDist(param){
            var url = "getAlprotoCategoryDist.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //邮件数量趋势
        function mailCount(param){
            var url = "getMailCount.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var lineData = {};
                    lineData.type="line";
                    lineData.category = [];
                    lineData.series = [];
                    var seriesObj = {};
                    seriesObj.type = "line";
                    seriesObj.name = "邮件数";
                    seriesObj.data = [];

                    _.forEach(data, function(value, key) {
                        lineData.category.push(value.name);
                        seriesObj.data.push(value.value);
                    });

                    lineData.series.push(seriesObj);

                    deferred.resolve(lineData);

                }).error(function(){
                    deferred.reject("错误");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //威胁邮件分布
        function mailRiskCategory(param){
            var url = "getMailRiskCategory.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){

                    var barData = {};
                    barData.type="bar";
                    barData.category = [];
                    barData.series = [];

                    var seriesMsgObj = {};
                    seriesMsgObj.type = "bar";
                    seriesMsgObj.name = "邮件数";
                    seriesMsgObj.data = [];

                    var tag = [];
                    var count = [];

                    _.forEach(data, function(value, key) {
                        tag.push(GarudaConstant.getMailFilterType(value.name));
                        count.push(value.value);
                    });

                    seriesMsgObj.data = count;
                    barData.category = tag;
                    barData.series.push(seriesMsgObj);

                    deferred.resolve(barData);

                }).error(function(){
                    deferred.reject("错误");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //邮件风险级别
        function mailRiskLevel(param){
            var url = "getMailRiskLevel.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var pieData = {};
                    pieData.type = "pie";
                    pieData.legend = {data:[]};
                    pieData.data = [];
                    pieData.colors = ['#2faa57','#9ABC32','#6FB3E0','#FEE074','#FFB752','#FD0303'];

                    var name = "";

                    _.forEach(data, function(value, key) {
                        var legendData = {};
                        name = GarudaConstant.getRisk(parseInt(value.name));
                        var color = 0;
                        if(value.name == "0"){
                            color = 0;
                        }else if(value.name == "1"){
                            color = 1;
                        }else if(value.name == "2"){
                            color = 2;
                        }else if(value.name == "3"){
                            color = 3;
                        }else if(value.name == "4"){
                            color = 4;
                        }
                        legendData.name = name;
                        legendData.icon = "bar";
                        pieData.legend.data.push(legendData);
                        pieData.data.push({
                            'name' : name,
                            'value' : value.value,
                            'color' : color
                        });
                    });

                    deferred.resolve(pieData);
                }).error(function(){
                    deferred.reject("错误");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //邮件动作分布
        function mailActionAgg(param){
            var url = "getMailActionAgg.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"POST",
                    url:url,
                    params:{}
                }).success(function(data){
                    var pieData = {};
                    pieData.type = "pie";
                    pieData.legend = {data:[]};
                    pieData.data = [];
                    var name = "";

                    _.forEach(data, function(value, key) {
                        var legendData = {};
                        name = GarudaConstant.getAction(parseInt(value.name));
                        legendData.name = name;
                        legendData.icon = "bar";
                        pieData.legend.data.push(legendData);
                        pieData.data.push({
                            'name' : name,
                            'value' : value.value,
                        });
                    });

                    deferred.resolve(pieData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //邮件队列
        function queueStatusData(param){
            var type = $rootScope.timeType;
            var time = Utils.caclDate(type);
            var url = "getQueueStatusData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"GET",
                    url:url,
                    params:{"serverid":param.serverid}
                }).success(function(data){

                    var lineData = {};
                    lineData.type="line";
                    lineData.category = [];
                    lineData.series = [];
                    lineData.legend={};
                    lineData.legend.data = [{name:$rootScope.format('system.sysstate.emailnum'),icon:'bar'}]
                    var seriesObj = {};
                    seriesObj.type = "line";
                    seriesObj.name = $rootScope.format('system.sysstate.emailnum');
                    seriesObj.data = [];


                    _.forEach(data, function(val, key) {
                        lineData.category.push(val.CATEGORY);
                        seriesObj.data.push(val.VALUE.split(",")[0]);
                    });
                    lineData.series.push(seriesObj);

                    deferred.resolve(lineData);

                }).error(function(){
                    deferred.reject("error")
                })
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //网络流量1小时
        function networkBpsData(param){
            var url = "getNetworkBps.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"GET",
                    url:url,
                    params:{"serverid":param.serverid}
                }).success(function(data){

                    var lineData = {};
                    lineData.type="line";
                    lineData.category = [];
                    lineData.series = [];
                    lineData.legend={};
                    lineData.legend.data = [{name:$rootScope.format('system.sysstate.networkflowmbps'),icon:'bar'}];
                    var seriesObj = {};
                    seriesObj.type = "line";
                    seriesObj.name = $rootScope.format('system.sysstate.networkflowmbps');
                    seriesObj.data = [];


                    _.forEach(data, function(val, key) {
                        lineData.category.push(val.CATEGORY);
                        seriesObj.data.push(val.VALUE/1000000);
                    });
                    lineData.series.push(seriesObj);
                    lineData.tip = "{a} {b} : {c}";

                    deferred.resolve(lineData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        //会话数量24小时
        function sessionTrendData(param){
            var url = "getSessionTrendData.do";
            var deferred = $q.defer();
            try {
                $http({
                    method:"GET",
                    url:url,
                    params:{"serverid":param.serverid}
                }).success(function(data){

                    var lineData = {};
                    lineData.type="line";
                    lineData.category = [];
                    lineData.series = [];
                    lineData.legend={};
                    lineData.legend.data = [{name:$rootScope.format('system.sysstate.sessionnum'),icon:'bar'}];
                    var seriesObj = {};
                    seriesObj.type = "line";
                    seriesObj.name = $rootScope.format("system.sysstate.sessionnum");
                    seriesObj.data = [];


                    _.forEach(data, function(val, key) {
                        lineData.category.push(val.CATEGORY);
                        seriesObj.data.push(val.VALUE);
                    });
                    lineData.series.push(seriesObj);
                    lineData.tip = "{a} {b} : {c}";

                    deferred.resolve(lineData);

                }).error(function(){
                    deferred.reject("error");
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        return service;

    }]);
});

