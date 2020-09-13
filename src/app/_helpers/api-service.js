angular.module('main').service('apiService', function(){

    var urlBase = "https://pokeapi.co/api/v2";

    this.apiBase = function(){
        return urlBase;
    };

});