/**
 * Created by hp Elite Book 8530p on 11/22/2015.
 */
var app = angular.module('BookStore');
    app.controller('HomeController' , function($location , $http , $timeout , $rootScope){
       var vm = this;
        $rootScope.login = true;
        $rootScope.home = false;
        $rootScope.cart = false;
        if(localStorage.getItem('admin')){
            $rootScope.login = false;
            $rootScope.logOut = true;

            $rootScope.addProduct = true;
        }
        else{
            $rootScope.login = true;
            $rootScope.logOut = false;
        }
        (function(){
            $timeout(function(){
                $http.get('PhpServer/getBooks.php').then(function(data){
                    vm.books = data.data;
                });
            },0);
        })();
        vm.myInterval = 1000;
        vm.slides = [
            { image : 'Images/book3.png' },
            {image : 'Images/book1.png'},
            { image : 'Images/book3.png' },
            {image : 'Images/book1.png'}
        ];
        vm.mainPage = [
            'home', 'about',  'contact', 'feedback'
        ];
        vm.next = function (dest) {
            $location.path('/' + vm.mainPage[dest]);
        }
    });