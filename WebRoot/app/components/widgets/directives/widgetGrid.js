define(['components/widgets/module', 'lodash'], function (module, _) {
    "use strict";

    module.directive('widgetGrid', function ($rootScope, $compile, $q, $state, $timeout) {

        var jarvisWidgetsDefaults = {
            grid: 'article',
            widgets: '.jarviswidget',
            localStorage: true,
            deleteSettingsKey: '#deletesettingskey-options',
            settingsKeyLabel: 'Reset settings?',
            deletePositionKey: '#deletepositionkey-options',
            positionKeyLabel: 'Reset position?',
            sortable: true,
            buttonsHidden: false,
            // toggle button
            toggleButton: true,
            toggleClass: 'fa fa-minus | fa fa-plus',
            toggleSpeed: 200,
            onToggle: function () {
            },
            // delete btn
            deleteButton: true,
            deleteMsg: 'Warning: This action cannot be undone!',
            deleteClass: 'fa fa-times',
            deleteSpeed: 200,
            onDelete: function () {
            },
            // edit btn
            editButton: true,
            editPlaceholder: '.jarviswidget-editbox',
            editClass: 'fa fa-cog | fa fa-save',
            editSpeed: 200,
            onEdit: function () {
            },
            // color button
            colorButton: true,
            // full screen
            fullscreenButton: true,
            fullscreenClass: 'fa fa-expand | fa fa-compress',
            fullscreenDiff: 3,
            onFullscreen: function () {
            	var domobj = $(this).parent().parent().next().find(".chart");
            	var plugintype = domobj.attr("plugin-type");
		        var ldh = $(domobj).css("height");
		        if(plugintype == 2){
		        	ldh = domobj.attr("height")+"px";
		        }
		        var ewh = "";
		        var isFullscreen = false
                if ($('#jarviswidget-fullscreen-mode').length) {
                	ewh =  ($(window).height()-34-15) + "px";
                	 $(domobj).css("height",ewh);
                	 isFullscreen = true;
                }else{
		        	ewh = $(domobj).parent().attr("ldh");
			        $(domobj).css("height",ewh);
			        isFullscreen = false;
                }

		        var chart = angular.element('<echart-chart data="'+domobj.attr("data")+'" load-data="loadData(callback)" plugin-type="1" chart-type="'+domobj.attr("chart-type")+'" mapname="' + domobj.attr("mapname") + '" widget-page-id="full_'+domobj.attr("widget-page-id")+'" style="height:'+ewh+';" is-fullscreen="'+isFullscreen+'"></echart-chart>');
		        if(plugintype == 2){
		        	var d3ewh = _.trim(ewh,"px");
		        	chart = angular.element('<d3-chart class="chart" data="'+domobj.attr("data")+'" load-data="loadData(callback)" plugin-type="2" height="' + d3ewh + '" chart-type="'+domobj.attr("chart-type")+'" widget-page-id="full_'+domobj.attr("widget-page-id")+'" style="height:'+ewh+';" is-fullscreen="'+isFullscreen+'"></d3-chart>');
		        }
                var el = $compile(chart)($(this).scope())
                var ewo = domobj.parent();
                ewo.find(".chart").remove()
                angular.element(ewo).append(chart);
            },
            // custom btn
            customButton: false,
            customClass: 'folder-10 | next-10',
            customStart: function () {
                alert('Hello you, this is a custom button...');
            },
            customEnd: function () {
                alert('bye, till next time...');
            },
            // order
            buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
            opacity: 1.0,
            dragHandle: '> header',
            placeholderClass: 'jarviswidget-placeholder',
            indicator: true,
            indicatorTime: 600,
            ajax: true,
            timestampPlaceholder: '.jarviswidget-timestamp',
            timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
            refreshButton: true,
            refreshButtonClass: 'fa fa-refresh',
            labelError: 'Sorry but there was a error:',
            labelUpdated: 'Last Update:',
            labelRefresh: 'Refresh',
            labelDelete: 'Delete widget:',
            afterLoad: function () {
            },
            rtl: false, // best not to toggle this!
            onChange: function () {

            },
            onSave: function () {

            },
            ajaxnav: true

        }

        var dispatchedWidgetIds = [];
        var setupWaiting = false;

        var debug = 1;

        var setupWidgets = function (element, widgetIds) {

            if (!setupWaiting) {

                if (_.intersection(widgetIds, dispatchedWidgetIds).length != widgetIds.length) {
                     dispatchedWidgetIds = _.union(widgetIds, dispatchedWidgetIds);

//                    console.log('setupWidgets', debug++);

                    //$timeout(function () {
                    element.data('jarvisWidgets') && element.data('jarvisWidgets').destroy();
                    element.jarvisWidgets(jarvisWidgetsDefaults);
                    initDropdowns(widgetIds);
                    //});
                }

            } else {
                if (setupWaiting) {
                    setupWaiting = true;
                    $timeout(function () {
                        setupWaiting = false;
                        setupWidgets(element, widgetIds)
                    }, 200);
                }
            }

        };

        var destroyWidgets = function (element, widgetIds) {
            element.data('jarvisWidgets') && element.data('jarvisWidgets').destroy();
            dispatchedWidgetIds = _.xor(dispatchedWidgetIds, widgetIds);
        };

        var initDropdowns = function (widgetIds) {
            angular.forEach(widgetIds, function (wid) {
                $('#' + wid + ' [data-toggle="dropdown"]').each(function () {
                    var $parent = $(this).parent();
                    $(this).removeAttr('data-toggle');
                    if (!$parent.attr('dropdown')) {
                        $(this).removeAttr('href');
                        $parent.attr('dropdown', '');
                        var compiled = $compile($parent)($parent.scope())
                        $parent.replaceWith(compiled);
                    }
                })
            });
        };

        var jarvisWidgetAddedOff,
            $viewContentLoadedOff,
            $stateChangeStartOff,
            jarvisWidgetDestory;

        return {
            restrict: 'A',
            link: function (scope,element) {

                element.removeAttr('widget-grid data-widget-grid');

                var widgetIds = [];

                $viewContentLoadedOff = $rootScope.$on('$viewContentLoaded', function (event, data) {
                    $timeout(function () {
                        setupWidgets(element, widgetIds)
                    }, 100);
                });


                $stateChangeStartOff = $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
                        destroyWidgets(element, widgetIds)
                        jarvisWidgetAddedOff();
                        $viewContentLoadedOff();
                        $stateChangeStartOff();
                        widgetIds = [];
                    });
                
                
                jarvisWidgetDestory = $rootScope.$on('jarvisWidgetDestory',
                    function (event, toState, toParams, fromState, fromParams) {
	                    destroyWidgets(element, widgetIds)
	                    widgetIds = [];
	                });

                jarvisWidgetAddedOff = $rootScope.$on('jarvisWidgetAdded', function (event, widget) {
                        $timeout(function () {
                        	if (widgetIds.indexOf(widget.attr('id')) == -1) {
                        		widgetIds.push(widget.attr('id'));
                        	}
                        	setupWidgets(element, widgetIds)
                        }, 100);
                   //console.log('jarvisWidgetAdded', widget.attr('id'));
                });

            }
        }
    })


});
