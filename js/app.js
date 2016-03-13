/**
 * Created by hp Elite Book 8530p on 11/24/2015.
 */
var app = angular.module('BookStore' , ["ngNewRouter" , "ngMaterial" , "ngMdIcons" , "ui.bootstrap" ,"angularFileUpload" , "ngMap"]);
app.controller('MainCtrl' , function($router , $location , $rootScope , $location) {
    $router.config([
        {path: '/', component: 'home'},
        {path: '/login', component: 'login'},
        {path: '/home', component: 'home'},
        {path: '/about', component: 'about'},
        {path: '/products', component: 'products'},
        {path: '/contact', component: 'contact'},
        {path: '/feedback', component: 'feedback'},
        {path : '/view/:bookId' , component : 'view'},
        { path: '/sub/:id', component: 'sub' },
        {path : '/cart/:bookId' , component : 'cart'},
        {path :'/showcart' , component : 'checkout'},
        {path :'/users' , component : 'users'},
        {path : '/orders' , component : 'orders'}

    ]);
    $rootScope.cart = false;
    /*$rootScope.login = true;*/

    var vm = this;
    vm.adminLogin = function(path){

        $location.path(path);
        $rootScope.admin = true;
        $rootScope.login = false;
        $rootScope.home = true;
    }
    vm.home = function(path){
        $location.path(path);
        $rootScope.home = false;
        $rootScope.login = true;
    }
    vm.next = function(path){
        $location.path(path);
    }

    $rootScope.home = false;
    $rootScope.admin = false;
    $rootScope.user = false;

    $rootScope.login = true;

    $rootScope.products = function(path){
        $location.path(path);
    }
     vm.showCart = function(path){
         $location.path(path);
     }
    vm.logOut = function(path){
        localStorage.setItem('admin' , "");
        $location.path(path);
    }
  /*  vm.checkOut = function(path){
        $location.path(path);
        $rootScope.sh = false;
        $rootScope.cart = false;
        $rootScope.login = true;
        $rootScope.user = true;
        $rootScope.admin = false;
    }*/
   /* $rootScope.show = false;
    $rootScope.sh = false;
    $rootScope.booksId;
    vm.subProducts = function(id){
(        console.log(id);
        $rootScope.booksId = id;
    }*/

});