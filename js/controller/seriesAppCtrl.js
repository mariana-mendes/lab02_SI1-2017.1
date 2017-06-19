angular.module("seriesApp").controller("seriesAppCtrl", function ($scope, $http) {
	$scope.app = "Banco de Series"
	$scope.serieBuscada = [];
	$scope.buscaSerie = "";
	$scope.watchlist = [];
	$scope.arrayExibido = [];
	$scope.minhasSeries = [];
	$scope.idSerie ="";


	$scope.addMinhasSeries = function(serie){
		$scope.minhasSeries.push(serie);
	}

	$scope.irParaMinhasSeries = function(){
		$scope.arrayExibido = $scope.minhasSeries;
	}


	$scope.irParaMinhaWatchlist = function(){
		$scope.arrayExibido = $scope.watchlist;

		if($scope.arrayExibido.length == 0 ){
			alert("Você ainda não adicionou séries :(");
		}
	}


	$scope.formata = function (){
		var stringFormatada = "https://omdbapi.com/?s=";
		var busca = $scope.buscaSerie.split(" ");
		stringFormatada += busca[0];

 		for(var i = 1; i < busca.length; i++ ){
 			if(i == busca.length){
				stringFormatada += busca[i];
			}else{
				stringFormatada+= "+";
				stringFormatada+= busca[i];
			};
		};

		stringFormatada += "&apikey=93330d3c";
		console.log(stringFormatada);
		carregaSeries(stringFormatada);
 	};


 	$scope.addWatchlist = function(serie){
 		$scope.watchlist.push(serie);
 		console.log($scope.watchlist);
 	};



 	$scope.buscaInfoSerie = function(key){
 		var r = "https://omdbapi.com/?i=" + key + "&apikey=93330d3c";

 		$http.get(r).then(function(result){
 			$scope.idSerie = result.data;
 			
 		});

 	}

	var carregaSeries = function (requisicao) {
		$http.get(requisicao).then(function (resultado){
			$scope.serieBuscada = resultado.data;
			$scope.arrayExibido = $scope.serieBuscada.Search;
			console.log($scope.serieBuscada);
		});
	};

});
