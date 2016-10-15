define(['components/select2/module'], function (module) {

    'use strict';

    module.registerFactory('select2Query', function ($timeout) {
        return {
            testAJAX: function () {
                var config = {
                    minimumInputLength: 1,
                    ajax: {
                        url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                        dataType: 'jsonp',
                        data: function (term) {
                            return {
                                q: term,
                                page_limit: 10,
                                apikey: "ju6z9mjyajq2djue3gbvv26t"
                            };
                        },
                        results: function (data, page) {
                            return {results: data.movies};
                        }
                    },
                    formatResult: function (data) {
                        return data.title;
                    },
                    formatSelection: function (data) {
                        return data.title;
                    }
                };

                return config;
            }
        }
    	
    });
});
