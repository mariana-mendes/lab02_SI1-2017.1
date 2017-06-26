angular.module("seriesApp",['ngMaterial']).controller("seriesAppCtrl", function ($scope,seriesAPI, $http, $mdDialog) {
	$scope.app = "Banco de Series"
	$scope.watchlist = [];
	$scope.arrayExibido = [];
	$scope.minhasSeries = [];
	$scope.idSerie ="";
	$scope.mostraBusca = true;


    $scope.buscaInfoSerie = function(key){
      seriesAPI.getSeriesPlot("?i="+key+ "&apikey=93330d3c").then(function(data, status){
      $scope.idSerie = data.data;
      }).catch(function(data, status){
      alert("Algo deu errado");
    });
 
  };



   $scope.carregaSeries = function (nome,ev){
      seriesAPI.getSeries("?s=" + nome+"&apikey=93330d3c&type=series").then(function(data, status){
      checaAPI(data.data,ev);
      }).catch(function(data, status){ 
          alert("Algo deu errado");
      });
  };

  $scope.notFoundSerieAlert = function(ev) {
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('')
        .textContent('Nenhum resultado')
        .ariaLabel('')
        .ok('Ok!')
        .targetEvent(ev)
    );

    $scope.escondeBusca();
  };

  $scope.addMinhasSeries = function(ev, serie){
    if(checaSerieRepetida(serie, $scope.minhasSeries)){
        alert("Essa série já está no seu perfil!");
    }else if(checaSerieRepetida(serie, $scope.watchlist)){
         $scope.watchlistParaPerfil(ev, serie);
    }else{
         $scope.minhasSeries.push(serie);
         $scope.showDialogConfirm(ev, serie );
    }
  };
  
  	$scope.watchlistParaPerfil = function(ev, serie) {
		var confirm = $mdDialog.confirm()
          .textContent("Tem certeza que quer remover "+ serie.Title + " da sua Watchlist e adicionar ao perfil?")
          .targetEvent(ev)
          .ok('Sim, por favor')
          .cancel('Não!');	
    $mdDialog.show(confirm).then(function() {
	  $scope.minhasSeries.push(serie); 
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

	$scope.confirmRemoveMinhasSeries = function(ev, serie) {
        var confirm = $mdDialog.confirm()
          .textContent('Você gostaria mesmo de remover ' + serie.Title +' do seu perfil?')
          .targetEvent(ev)
          .ok('Sim, por favor')
          .cancel('Não!');
		$mdDialog.show(confirm).then(function() {
			$scope.removeMinhasSeries(serie);
			},function(){});
	};


  $scope.addWatchlist = function(ev, serie){
    if(checaSerieRepetida(serie, $scope.minhasSeries)){
       alert('Essa série ja está no seu perfil!');
    }else if(!checaSerieRepetida(serie, $scope.watchlist)){
      $scope.watchlist.push(serie);
      $scope.showDialogConfirm(ev, serie);
    }else{
      alert("Essa série já está na sua watchlist!");
    }
  };

  $scope.removeWatchlist = function(serie){
      var indice = $scope.watchlist.indexOf(serie);
      if(indice > -1){
        $scope.watchlist.splice(indice, 1);
      };
  };

	$scope.confirmRemoveWatchlist = function(ev, serie) {
       var confirm = $mdDialog.confirm()
          .title("Espere um pouco!")
          .textContent("Tem certeza que quer remover "+ serie.Title + " da sua Watchlist?")
          .targetEvent(ev)
          .ok('Sim, por favor')
          .cancel('Não!');

		$mdDialog.show(confirm).then(function() {
			$scope.removeWatchlist(serie);
		},function() {});
	};



  $scope.getSinopse = function(){
    return $scope.idSerie;
  }

  $scope.showDialogConfirm = function(ev, serie ) {
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .textContent(serie.Title + ' foi adicionada com sucesso')
        .ok('Ok!')
        .targetEvent(ev));
  };
 

	$scope.escondeBusca = function(){
		$scope.mostraBusca = false;
	}

 

	var checaAPI = function(resultado,ev){
		if(resultado.Response == "False"){
			$scope.notFoundSerieAlert(ev);
		}else{
			$scope.mostraBusca = true;
			$scope.arrayExibido = resultado.Search;
    }
  };
  

	var checaSerieRepetida = function(idSerie, array){
		for (var i = array.length - 1; i >= 0; i--) {
          if(array[i].imdbID == idSerie.imdbID){
            return true;
          }
    }

    return false;
		};
});
