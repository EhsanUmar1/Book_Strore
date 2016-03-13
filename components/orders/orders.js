/**
 * Created by hp Elite Book 8530p on 12/15/2015.
 */
var app = angular.module('BookStore');
app.controller('OrdersController' , function($rootScope , $http){
        var vm = this;
        vm.orders = $rootScope.orders;
        $rootScope.total = localStorage.getItem("quantity");
        $rootScope.cart = true;
        (function(){
            vm.totalPrice =0;
            var users = localStorage.getItem("user");
            var userData = JSON.parse(users);
            console.log(userData.c_id);
            $http.post('PhpServer/getBuyProducts.php' , {customerId :userData.c_id}).then(function(res){
                console.log(vm.orders = res.data);
                for(var i=0; i< vm.orders.length; i++){
                    var price = +vm.orders[i].s_productTotalPrice;
                    console.log(vm.totalPrice  += price);
                }
            })
        })();
    }
);