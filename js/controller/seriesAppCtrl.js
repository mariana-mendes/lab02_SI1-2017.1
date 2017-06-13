angular.module("seriesApp").controller("seriesAppCtrl", function ($scope) {
	$scope.app = "Banco de Series"
	$scope.series = [];
	$scope.requisicao;

	$scope.formatacao = function () {
		var stringFormatada = "https://omdbapi.com/?s=";
		$scope.requisicao = requisicao.split(" ");

		console.log('oi');
		for(var i = 0; i < requisicao.lenght-1; i++ ){
			$scope.requisicao += $scope.requisicao[i];
			$scope.requisicao += "%20";
		}
		$scope.requisicao += $scope.requisicao[requisicao.lenght]
		carregaSeries()
	};

	var carregaSeries = function () {
		$http.get($scope.requisicao).then(function (resultado){
			$scope.series = resultado.data;
		});
	};



});
