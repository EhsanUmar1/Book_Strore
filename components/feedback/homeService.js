/**
 * Created by hp Elite Book 8530p on 11/17/2015.
 */
var app = angular.module('BookStore');

app.service('getData' , function($http){
    this.see = "Just Checking";
    this.getDa = function(){
        return $http({method:'GET',url : 'login.php'});
    }
    this.getSave = function(){
        return $http({method:'GET',url : 'getProductss.php'});
    }
})