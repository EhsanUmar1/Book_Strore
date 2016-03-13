/**
 * Created by hp Elite Book 8530p on 12/12/2015.
 */
var app = angular.module('BookStore');
app.controller('UsersController' , function($timeout , $http ,$rootScope ,$location ,   $mdDialog){
    var vm = this;
    vm.first = true;
    vm.status = "User Regiteration";
    vm.user = true;
    vm.sign = function(){
        $timeout(function() {
            vm.status = "User Regiteration";
            vm.first = true;
        }, 0);
    }
    vm.login = function(){
        $timeout(function() {
            vm.status = "User Login";
            vm.first = false;
        }, 0);
    };
    vm.users ={};
    vm.addCustomers = function(){
        $http.post(
            'PhpServer/saveCustomers.php' ,
            {name : vm.users.name , email : vm.users.email , password : vm.users.password ,address:vm.users.address})
            .then(function(data){
                console.log(data.data);
               if(data.data.response === 'yes'){
                    vm.data = "Yahoo";
                    console.log("Yess");
                   var data = localStorage.getItem("data");
                    console.log(JSON.parse(data));
                   $http.post('PhpServer/getUsers.php' , {email : vm.users.email}).then(function(res){
                       var userId = res.data[0].c_id;
                        console.log(userId);
                        var data = localStorage.getItem("data");
                        data = JSON.parse(data);
                        $http.post('PhpServer/saveBuyProducts.php' , {buyProducts : data , userRecord : userId} ).then(function(res){
                            vm.products = res.data;
                            console.log(res);
                            localStorage.setItem('data' , "");
                            $rootScope.total = 0;
                        })
                        vm.users.name = "";
                        vm.users.email = "";
                        vm.users.password = "";
                        vm.users.address = "";
                   })


                }
                else if(data.data.response === 'no'){
                   $mdDialog.show(
                           $mdDialog.alert()
                               .clickOutsideToClose(true)
                               .title('Email already exists!')
                               .ok('Okay!')
                   );}
            });
        vm.name ="";
        vm.email ="";
        vm.password ="";
        vm.address = "";
    }
    vm.exist = function(){
        console.log(vm.existemail + " " + vm.existpass);
        $http.post('PhpServer/userandproducts.php' , {useremail : vm.existemail , userpassword : vm.existpass}).then(function(res){
            console.log(res.data.length);
            console.log(res.data[0]);
            if(res.data.length> 0){
                var c_id = +res.data[0].c_id;
                localStorage.setItem("user", JSON.stringify(res.data[0]));
                $http.post('PhpServer/getBuyProducts.php' , {customerId : c_id}).then(function(res){
                    $rootScope.orders = res.data;
                    $location.path('/orders');
                })
            }
           else{
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Wrong email and  password!')
                        .ok('Okay!')
                );
            }
        })
    }
})