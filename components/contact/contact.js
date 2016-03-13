/**
 * Created by hp Elite Book 8530p on 11/23/2015.
 */

var app = angular.module('BookStore');
app.controller('ContactController' , function($location , NgMap){
    var vm = this;
    vm.title = "This is contact us Page";
    vm.mainPage = [
        'home', 'about',  'contact', 'feedback'
    ];
    vm.next = function (dest) {
        $location.path('/' + vm.mainPage[dest]);
    }
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });
})