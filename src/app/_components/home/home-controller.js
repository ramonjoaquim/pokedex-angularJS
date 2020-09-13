angular.module('main').controller('homeController', function ($scope, $resource, apiService) {

    initialize($scope);

    function getTypes(data) {
        var type = [];
        data.types.forEach(element => {
            type.push(` ${element.type.name}`);
        });

        return type.join();
    };

    function getAbilities(data){
        var abilitie = [];
        data.abilities.forEach(element => {
            if(!element.is_hidden)
                abilitie.push(element.ability.name);
        });

        return abilitie;
    };

    $scope.findPokemon = () => {

        if ($scope.searchPokemon == undefined)
            return;

        $resource(`${apiService.apiBase()}/pokemon/${$scope.searchPokemon}`)
            .get().$promise.then(
                (response) => {
                    $scope.identifier = response.id;
                    $scope.name = response.name;
                    $scope.imagePokemon = response.sprites.front_default;
                    $scope.type = getTypes(response);
                    $scope.abilities = getAbilities(response);
                })
                .catch(
                    () => {
                        initialize($scope);
                    }
                );
    };
});



function initialize($scope) {
    $scope.name = '????';
    $scope.type = '-';
    $scope.description = '';
    $scope.abilities = '';
    $scope.identifier = '-';
    $scope.imagePokemon = 'img/who-is-pokemon.png';
}

