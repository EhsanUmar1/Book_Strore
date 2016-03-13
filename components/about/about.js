/**
 * Created by hp Elite Book 8530p on 11/23/2015.
 */
var app = angular.module('BookStore');
app.controller('AboutController' , function($location ,  $http  ){
    var vm = this;
    vm.title = "This is about us Page";
    vm.mainPage = [
        'home', 'about',  'contact', 'feedback'
    ];
    vm.next = function (dest) {
        $location.path('/' + vm.mainPage[dest]);
        };
    (function(){
        $http.post('PhpServer/checking.php' , {bId : [{'name' : 'maaz' , 'id' : 101} , {'name' : 'ehsan'}]}).then(function(res){
            vm.products = res.data;
            console.log(res);
        })
    })();
    var todos = [];
    todos.push({'name' : 'Ehsan'} , {'name' : 'Ehsan'} , {'name' : 'Ehsan'});
    localStorage.setItem('todos', JSON.stringify(todos));
    todos.splice(1,1);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
})