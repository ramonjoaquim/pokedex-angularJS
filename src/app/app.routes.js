mainApp.config(function($stateProvider){

    $stateProvider
        .state('login',{
            name: 'login',
            url:'login',
            templateUrl: '_components/login/login-view.html'
        })
        .state('home',{
            name: 'home',
            url:'home',
            templateUrl: '_components/home/home-view.html'
        })
        .state('see-all',{
            name: 'pokedex',
            url:'see-all',
            templateUrl: '_components/pokedex/pokedex-view.html'
        });     
});

mainApp.run(function($rootScope, $state){
    $state.go('login');
});