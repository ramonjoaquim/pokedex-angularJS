mainApp.config(function($stateProvider, $urlRouterProvider){

    //$urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home',{
            name: 'home',
            url:'home',
            templateUrl: 'components/home/home-view.html'
        });     
});

mainApp.run(function($rootScope, $state){
$state.go('home');
});