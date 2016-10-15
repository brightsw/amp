define(['components/core/module', 'lodash', 'jquery', 'moment'],
    function(module, _, $, moment) {

        'use strict';

        module.registerFactory('Utils',  ['$rootScope',function($rootScope) {
            var service = {
            		
                getDate: function() {
                	var retObj = {};
                	var today = moment();
                	retObj.date = today.format('YYYY-MM-DD');
                	retObj.time = today.format('HH:mm');
                	retObj.datetime = today.format("YYYY-MM-DD HH:mm");
                	return retObj;
                },

                caclDate: function(type) {
                	var retObj = {};
                    var today = moment();
                    var startday = moment(today);
                    if (type == 5) {
                        retObj.sdate = "";
                        retObj.stime = "";
                        retObj.edate = "";
                        retObj.etime = "";
                        retObj.starttime = "";
                        retObj.endtime = "";
                    } else {
                        if (type == 0) {
                            startday = startday.subtract(4, 'hours');
                        } else if (type == 1) {
                            startday = startday.subtract(24, 'hours');
                        } else if (type == 2) {
                            startday = moment().subtract(7, 'days');
                        } else if (type == 3) {
                            startday = moment().subtract(30, 'days');
                        } else if (type == 4) {
                            startday = startday.subtract(90, 'days');
                        }
                        retObj.sdate = startday.format('YYYY-MM-DD');
                        retObj.stime = startday.format('HH:mm');
                        retObj.edate = today.format('YYYY-MM-DD');
                        retObj.etime = today.format('HH:mm');
                        retObj.starttime = startday.format('YYYY-MM-DD HH:mm:00');
                        retObj.endtime = today.format('YYYY-MM-DD HH:mm:00');
                    }
                    return retObj;
                },
            
                caclReportDate: function(type) {
	            	var retObj = {};
	                var today = moment();
	                var startday = moment(today.format('YYYY-MM-DD 00:00:00'));
	                if (type == 5) {
	                    retObj.startdate = "";
	                    retObj.starttime = "";
	                    retObj.enddate = "";
	                    retObj.endtime = "";
	                } else {
	                    if (type == 1) {
	                        startday = startday.subtract(24, 'hours');
	                    } else if (type == 2) {
	                        startday = startday.subtract(7, 'days');
	                    } else if (type == 3) {
	                        startday = startday.subtract(30, 'days');
	                    } else if (type == 4) {
	                        startday = startday.subtract(1, 'years');
	                    }
	                    retObj.starttime = startday.format('YYYY-MM-DD 00:00:00');
	                    retObj.endtime = today.subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
	                }
	                return retObj;
	            },
	            
	            formatData: function(date){
	            	var retObj = {};
	            	var obj = moment(date);
	            	var day = moment(obj.format('YYYY-MM-DD'));
	            	var time = moment(obj.format('HH:mm'));
	            	retObj.day = day._i;
	            	retObj.time = time._i;
	            	return retObj;
	            }
            };

            return service;
        }]);
    });
