angular.module("seriesApp",['ngMaterial']).controller("seriesAppCtrl", function ($scope,seriesAPI, $http, $mdDialog) {
	$scope.app = "Banco de Series"
	$scope.watchlist = [];
	$scope.arrayExibido = [];
	$scope.minhasSeries = [];
	$scope.idSerie ="";
	$scope.notFoundSerie;
	$scope.mostraBusca = true;
	$scope.ultimoEP;


 $scope.showPrompt = function(ev) {
     var confirm = $mdDialog.prompt()
      .title('Último episódio visto?')
      .textContent('')
      .placeholder('(EX: S01E02)')
      .ariaLabel('Dog name')
      .initialValue('')
      .targetEvent(ev)
      .ok('enviar')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {
    	console.log(result);
    	$scope.ultimoEP = result;
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };





$scope.confirmRemoveMinhasSeries = function(ev, serie) {
        var confirm = $mdDialog.confirm()
          .title('Você gostaria mesmo de remover essa série do seu perfil?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Sim, por favor')
          .cancel('Não!');

    $mdDialog.show(confirm).then(function() {
    	$scope.removeMinhasSeries(serie);
        $scope.status = true;
    }, function() {
      $scope.status = false;
    });

  };



 $scope.confirmRemoveWatchlist = function(ev, serie) {
       var confirm = $mdDialog.confirm()
          .title("Espere um pouco!")
          .textContent("Tem certeza que quer remover "+ serie.Title + " da sua Watchlist?")
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



  $scope.buscaInfoSerie = function(key, ev){
    seriesAPI.getSeriesPlot(key+ "&apikey=93330d3c").then(function(data, status){
      $scope.showAlert(ev, data.data);
      $scope.idSerie = data.data; 
    }).catch(function(data, status){
      alert("Algo deu errado");
    });

 	};

  $scope.buscaInfoSerieModal = function(key){
      seriesAPI.getSeriesPlot(key+ "&apikey=93330d3c").then(function(data, status){
        $scope.idSerie = data.data; 
    }).catch(function(data, status){
      alert("Algo deu errado");
    });


  };


  $scope.carregaSeries = function (nome){
      seriesAPI.getSeries(nome+"&apikey=93330d3c&type=series").then(function(data, status){
        $scope.arrayExibido = data.data.Search;
        $scope.findSerie = false;
        $scope.checaAPI(data.data.Response);
        $scope.mostraBusca = true;


      }).catch(function(data, status){ 
          alert("Algo deu errado");

      });
  };
  


    $scope.showAlert = function(ev, serie ) {
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(serie.Title)
        .textContent('Sinopse: ' + serie.Plot)
        .ariaLabel('Alert Dialog Demo')
        .ok('Ok!')
        .targetEvent(ev)
    );
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
		return (array.indexOf(idSerie) > -1);
		
	};


	$scope.checaAPI =  function(value){
		if(value == "False"){
			$scope.notFoundSerie = true;
		};
	};

	$scope.addMinhasSeries = function(serie){
		if(!checaSerieRepetida(serie, $scope.minhasSeries)){
			$scope.minhasSeries.push(serie);
		}else{
			alert("serie repetida");
		}
	};





 	$scope.addWatchlist = function(serie){
 		if(!checaSerieRepetida(serie, $scope.watchlist)){
 			$scope.watchlist.push(serie);
 		}else{
 			alert("serie repetida");
 		}
 	};


});

