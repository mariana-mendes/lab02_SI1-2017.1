angular.module("seriesApp").service("seriesAPI", function ($http, config) {

 this.getSeries = function(nome){
		return $http.get(config.baseUrl + nome);
	}

	this.getSeriesPlot = function(nome){
		return $http.get(config.baseUrl + nome);
}

});
