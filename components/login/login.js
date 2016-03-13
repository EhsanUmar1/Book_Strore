/**
 * Created by hp Elite Book 8530p on 11/24/2015.
 */
var app = angular.module('BookStore');
app.controller('LoginController' , function($timeout , $rootScope , $mdDialog , $location , $http){
    $rootScope.show = false;
    var vm = this ;
    vm.onPageLoad = "Admin Login";
    $rootScope.cart = false;
    $rootScope.addProduct = false;
    vm.log = function(path){
        $location.path(path);
    }
    vm.admin = {};
    vm.admin.name = "ehsan";
    vm.wrong =false;
    vm.shw = true;
//admin login
    vm.admin = function(path){
        $timeout(function() {
            $http.post('PhpServer/admin.php',
                {email:vm.email , password: vm.password}).then(function(data){
                    if(data.data.length == 1){
                        $location.path(path);
                        $rootScope.addProduct = true;
                        $rootScope.login = false;
                        $rootScope.logOut = true;
                        localStorage.setItem('admin' , "admin");
                    }
                    else{
                        vm.wrong = true;
                        vm.shw = false;
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Wrong email and  password!')
                                .ok('Okay!')
                        );
                    }
                });
            $rootScope.show = true;
            $rootScope.sh = false;
        }, 0);
    }
})
