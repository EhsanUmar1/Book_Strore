/**
 * Created by hp Elite Book 8530p on 12/11/2015.
 */
var app = angular.module('BookStore');
app.controller('CheckoutController' , function($rootScope , $location , $mdDialog ,$http , $timeout){
    var vm = this;
    var name ;
    (function(){
        $rootScope.show = false;
        $rootScope.sh = true;
        $rootScope.cart = true;
        $rootScope.login = false;
        var test2 = localStorage.getItem("data");
        vm.items = JSON.parse(test2);
        $rootScope.finalGet = vm.items;
        $rootScope.total = localStorage.getItem("quantity");
        console.log(vm.items);
        var users = localStorage.getItem("user");
        vm.userData = JSON.parse(users);
        console.log(vm.userData);
        if(vm.userData != null || vm.userData != undefined){
              vm.user = true;
        }
    })();
   vm.getuserInfo = function(path){
       $location.path(path);
   }
    vm.showConfirm = function( index ) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this product?')
                .cancel('No!')
                 .ok('Yes!');
        $mdDialog.show(confirm).then(function() {
            vm.status = 'You decided to get rid of your debt.';
            var storedAddresses = JSON.parse(localStorage.getItem('data'));
            var quantit =  storedAddresses.splice(index,1);
            var quant = quantit[0].quantity;
            localStorage.setItem("data", JSON.stringify(storedAddresses));
            var test2 = localStorage.getItem("data");
            vm.items = JSON.parse(test2);
            $rootScope.finalGet = vm.items;
            var quantities = JSON.parse(localStorage.getItem('quantity'));
            console.log(quantities);
            var decreQuantity =  quantities - quant;
            localStorage.setItem("quantity", JSON.stringify(decreQuantity));
            $rootScope.total = localStorage.getItem("quantity");
            /*console.log(localStorage.getItem('data'));*/
        }, function() {
            vm.status = 'You decided to keep your debt.';
            console.log(vm.status);
        });
    };
    vm.saveuserData = function(){
          var data = localStorage.getItem("data");
          var okay = data;
          console.log(okay);
          if(okay !== null){
          data = JSON.parse(data);
          var users = localStorage.getItem("user");
          var userData = JSON.parse(users);
          console.log(userData.c_id);
          $http.post('PhpServer/saveBuyProducts.php' , {buyProducts : data , userRecord : userData.c_id} ).then(function(res){
          vm.products = res.data;
          var test2 = localStorage.getItem("data");
          vm.items = JSON.parse(test2);
          localStorage.removeItem('data');
          $timeout(function(){
              console.log(vm.items = []);
              $rootScope.$apply(vm.items);
          },3000);
              console.log(res);
              localStorage.setItem('quantity' , "");
              $rootScope.total = 0;
          })}
          else{
            console.log("Bla");
          }


      }




});