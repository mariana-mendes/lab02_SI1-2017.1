angular.module("seriesApp").service("seriesAPI", function ($http, config) {

 this.getSeries = function(nome){
		return $http.get('http://www.omdbapi.com/?s=' + nome);
	}

	this.getSeriesPlot = function(nome){
		return $http.get('https://omdbapi.com/?i=' + nome);
}

});
