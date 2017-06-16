angular.module("seriesApp").controller("seriesAppCtrl", function ($scope, $http) {
	$scope.app = "Banco de Series"
	$scope.serieBuscada = [];
	$scope.buscaSerie = "";
	$scope.watchlist = [];


	$scope.formata = function (){
		var stringFormatada = "https://omdbapi.com/?s=";
		var busca = $scope.buscaSerie.split(" ");
		stringFormatada += busca[0];
	
 		for(var i = 1; i < busca.length; i++ ){
 			if(i == busca.length){
				stringFormatada += busca[i];
			}else{
				stringFormatada+= "%20";
				stringFormatada+= busca[i];
			};
		};
		stringFormatada += "&apikey=93330d3c";
		carregaSeries(stringFormatada);
 	};

		
	var carregaSeries = function (requisicao) {
		$http.get(requisicao).then(function (resultado){
			$scope.serieBuscada = resultado.data;
			console.log($scope.serieBuscada);
		});
	}; 

});
