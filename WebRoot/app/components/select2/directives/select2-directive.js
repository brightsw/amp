define(['components/select2/module', 'select2'], function (module) {
    "use strict";

    module.registerDirective('smartSelect2', function (select2Query) {
        return {
            restrict: 'A',
            scope: {
                config: '=',
                ngModel: '=',
                minsearch: '@',
                select2Model: '='
            },
            link: function (scope, element, attrs) {
                // 初始化
                var tagName = element[0].tagName,
                    config = {
                        allowClear: true,
                        multiple: !!attrs.multiple,
                        placeholder: attrs.placeholder || ' ',   // 修复不出现删除按钮的情况
                        minimumResultsForSearch:scope.minsearch
                    };

                // 生成select
                if(tagName === 'SELECT') {
                    // 初始化
                    var $element = $(element);
                    delete config.multiple;

                    $element
                        /*.prepend('<option value=""></option>')
                        .val('')*/
                        .select2(config);

                    // model - view
                    scope.$watch('ngModel', function (newVal) {
                        setTimeout(function () {
                            $element.find('[value^="?"]').remove();    // 清除错误的数据
                            $element.select2('val', newVal);
                        },0);
                    }, true);
                    return false;
                }

                // 处理input
                if(tagName === 'INPUT') {
                    // 初始化
                    var $element = $(element);

                    // 获取内置配置
                    if(attrs.query) {
                        scope.config = select2Query[attrs.query]();
                    }

                    // 动态生成select2
                    scope.$watch('config', function () {
                        angular.extend(config, scope.config);
                        $element.select2('destroy').select2(config);
                    }, true);

                    // view - model
                    $element.on('change', function () {
                        scope.$apply(function () {
                            scope.select2Model = $element.select2('data');
                        });
                    });

                    // model - view
                    scope.$watch('select2Model', function (newVal) {
                        $element.select2('data', newVal);
                    }, true);

                    // model - view
                    scope.$watch('ngModel', function (newVal) {
                        // 跳过ajax方式以及多选情况
                        if(config.ajax || config.multiple) { return false }

                        $element.select2('val', newVal);
                    }, true);
                }
            }
        }
    })


});