angular.module("seriesApp",['ngMaterial']).controller("seriesAppCtrl", function ($scope, $http, $mdDialog) {
	$scope.app = "Banco de Series"
	$scope.watchlist = [];
	$scope.arrayExibido = [];
	$scope.minhasSeries = [];
	$scope.idSerie ="";
	$scope.optionsNotas = [1,1.5,2,2.5,3,3.5,4,4.5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10];
	$scope.notFoundSerie;
	$scope.mostraBusca = true;



 $scope.showConfirm = function(ev, serie) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Você gostaria mesmo de remover essa série do seu perfil??')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Sim, por favor')
          .cancel('Não!');

    $mdDialog.show(confirm).then(function() {
    	$scope.removeWatchlist(serie);
        $scope.status = true;
    }, function() {
      $scope.status = false;
    });



  };


	$scope.removeMinhasSeries = function(serie){
		var indice = $scope.minhasSeries.indexOf(serie);
		if(indice > -1){
		$scope.minhasSeries.splice(indice, 1);
		};
	};



	$scope.removeWatchlist = function(serie){
			var indice = $scope.watchlist.indexOf(serie);
			if(indice > -1){
				$scope.watchlist.splice(indice, 1);
			};
	};

	$scope.escondeBusca = function(){
		$scope.mostraBusca = false;
	}



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




	$scope.carregaSeries = function (buscaSerie){
			$http.get("https://omdbapi.com/?s=" + buscaSerie  + "&apikey=93330d3c&type=series").then(function (resultado){
			$scope.arrayExibido = resultado.data.Search;
			$scope.findSerie = false;
			$scope.checaAPI(resultado.data.Response);
		});
		$scope.mostraBusca = true;
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



});

