define([

    // layout

    'layout/module',
    'layout/actions/minifyMenu',
    'layout/actions/minifyPanel',
    'layout/actions/toggleMenu',
    'layout/actions/fullScreen',
    'layout/actions/resetWidgets',
    'layout/actions/resetWidgets',
    'layout/actions/searchMobile',
    'layout/directives/demo/demoStates',
    'layout/directives/smartInclude',
    'layout/directives/smartDeviceDetect',
    'layout/directives/smartFastClick',
    'layout/directives/smartLayout',
    'layout/directives/smartSpeech',
    'layout/directives/smartRouterAnimationWrap',
    'layout/directives/smartFitAppView',
    'layout/directives/radioToggle',
    'layout/directives/dismisser',
    'layout/directives/smartMenu',
    'layout/directives/bigBreadcrumbs',
    'layout/directives/stateBreadcrumbs',
    'layout/directives/smartPageTitle',
    'layout/directives/hrefVoid',
    'layout/service/SmartCss',

    //components
    //'components/language/Language',
    
    'components/widgets/module',
    'components/widgets/directives/widgetGrid',
    'components/widgets/directives/jarvisWidget',
    
    'components/activities/activities-controller',
    'components/activities/activities-dropdown-toggle-directive',
    'components/activities/activities-service',

    'components/shortcut/shortcut-directive',

    'components/calendar/module',
    'components/calendar/models/CalendarEvent',
    'components/calendar/directives/fullCalendar',
    'components/calendar/directives/dragableEvent',
    'components/calendar/controllers/CalendarCtrl',

    'components/inbox/module',
    'components/inbox/models/InboxConfig',
    'components/inbox/models/InboxMessage',

    'components/datatables/module',
    'components/datatables/directives/datatableBasic',
    'components/datatables/directives/datatableQBasic',
    
    //select2
    'components/select2/module',
    'components/select2/directives/select2-directive',
    'components/select2/services/select2-service',

    'components/clockpicker/module',
    'components/clockpicker/directives/smartClockpicker',

    'components/datepicker/module',
    'components/datepicker/directives/smartDatepicker',

    'components/tagsinput/module',
    'components/tagsinput/directives/smartTagsinput',

    'components/backButton/module',
    'components/backButton/directives/backButton',

    // chat
    'components/chat/module',
    
    
    //core
    'components/core/module',
    'components/core/services/httpService',
    'components/core/services/utils',
    'components/core/services/mailConstant',
    'components/core/services/garudaConstant',
    'components/core/directives/ztree-directive',

    // graphs
    'components/graphs/module',
    
    //forms
    'components/forms/module',

    'modules/system/module',

    'modules/account/module',

    'modules/report/module'
    

    
], function () {
    'use strict';
});
