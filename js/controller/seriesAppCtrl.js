angular.module("seriesApp",['ngMaterial']).controller("seriesAppCtrl", function ($scope, $http) {
	$scope.app = "Banco de Series"
	$scope.watchlist = [];
	$scope.arrayExibido = [];
	$scope.minhasSeries = [];
	$scope.idSerie ="";
	$scope.optionsNotas = [1,1.5,2,2.5,3,3.5,4,4.5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10];
	$scope.notFoundSerie;





	var checaSerieRepetida = function(idSerie, array){
		for (var i = array.length - 1; i >= 0; i--) {
			if(array[i].Title == idSerie){
				return true;
				break;
			}
		};
		return false;
	};


	$scope.checaAPI =  function(value){
		if(value == "False"){
			$scope.notFoundSerie = true;
		};
	};

	$scope.addMinhasSeries = function(serie){
		if(!checaSerieRepetida(serie.Title, $scope.minhasSeries)){
			$scope.minhasSeries.push(serie);
		}else{
			alert("serie repetida");
		}
	};

	$scope.irParaMinhasSeries = function(){
		$scope.arrayExibido = $scope.minhasSeries;
	}


	$scope.irParaMinhaWatchlist = function(){
		$scope.arrayExibido = $scope.watchlist;

		if($scope.arrayExibido.length == 0 ){
			alert("Você ainda não adicionou séries :(");
		}
	}


	$scope.formata = function (buscaSerie){
		$scope.notFoundSerie = false;
		var stringFormatada = "https://omdbapi.com/?s=";
		var busca = buscaSerie.split(" ");
		stringFormatada += busca[0];

 		for(var i = 1; i < busca.length; i++ ){
 			if(i == busca.length){
				stringFormatada += busca[i];
			}else{
				stringFormatada+= "+";
				stringFormatada+= busca[i];
			};
		};

		stringFormatada += "&apikey=93330d3c&type=series";
		carregaSeries(stringFormatada);
 	};


 	$scope.addWatchlist = function(serie){
 		if(!checaSerieRepetida(serie.Title, $scope.watchlist)){
 			$scope.watchlist.push(serie);
 		}else{
 			alert("serie repetida");
 		}
 	};



 	$scope.buscaInfoSerie = function(key){
 		var r = "https://omdbapi.com/?i=" + key + "&apikey=93330d3c";

 		$http.get(r).then(function(result){
 			$scope.idSerie = result.data;
 			
 		});

 	}

	var carregaSeries = function (requisicao) {
		$http.get(requisicao).then(function (resultado){
			$scope.arrayExibido = resultado.data.Search;
			$scope.findSerie = false;
			$scope.checaAPI(resultado.data.Response);
		});
	};


});

