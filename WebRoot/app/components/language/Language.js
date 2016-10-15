angular.module('app.language', [])

.factory('Language', function($http,$log){
	
	function getLocale(callback){
		$http.get('./getLang.do').success(function(data){

			callback(data);
			
		}).error(function(){

			$log.log('Error');
			callback([]);

		});
	}

	function getLanguage(key, callback) {

		$http.get('api/langs/' + key + '.json').success(function(data){

			callback(data);
			
		}).error(function(){

			$log.log('Error');
			callback([]);

		});

	}

	function getLanguages(callback) {

		$http.get('api/languages.json').success(function(data){

			callback(data);
			
		}).error(function(){

			$log.log('Error');
			callback([]);

		});
	}
	
	function getTheme(url,callback) {
		$http.get(url).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}

	return {
		getLocale: function(callback) {
			getLocale(callback);
		},
		getLang: function(type, callback) {
			getLanguage(type, callback);
		},
		getLanguages:function(callback){
			getLanguages(callback);
		},
		getTheme: function(url,callback){
			getTheme(url,callback);
		}
	}

});
