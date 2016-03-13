/**
 * Created by hp Elite Book 8530p on 12/9/2015.
 */
/**
 * Created by hp Elite Book 8530p on 12/5/2015.
 */
var app = angular.module('BookStore');

app.controller('CartController' , function($routeParams , $rootScope , $timeout , $http){
    /*this.id = $routeParams.id;*/
    var vm = this;
    vm.Id = $routeParams.bookId;
    vm.items = [];
    (function(){
        $rootScope.show = false;
        $rootScope.sh = true;
        $rootScope.cart = true;
        $rootScope.login = false;
        $rootScope.logOut = false;
        $timeout(function(){
            $http.get('PhpServer/getBooks.php').then(function(data){
                $http.post('PhpServer/getProductss.php' , {bId : vm.Id}).then(function(res){
                   vm.products = res.data;
                    console.log(res);
                })
            });
            var test2 = localStorage.getItem("data");
            console.log(test2);
            if(test2 != null){
                vm.items = JSON.parse(test2);

                console.log(vm.items);
            }
            $rootScope.total = localStorage.getItem("quantity");
            $rootScope.finalGet= vm.items;
        },0);
        vm.items = [];
        var length =1 ;
        $rootScope.items =0;
        $rootScope.total = 0;
        vm.addToCart = function(bId , pId ,pname, price , image , quant){
             quantity = +quant;
             price = +price;
             var found = false;
             var cartObject ={
             bookId : +bId,
             productId : +pId,
             productName : pname,
             pricee : +price,
             imagee : image,
             quantity  : +quant
            };
            var found = false;
            for (var i = 0; i < vm.items.length ; i++) {
                var item = vm.items[i];
                console.log(item);
                if (item.productName == pname && item.imagee == image) {
                    found = true;
                    item.quantity = +(item.quantity + quantity);
                    item.pricee = +(item.pricee + price);
                    localStorage.setItem('data' ,JSON.stringify(vm.items) );
                    localStorage.setItem('quantity' ,JSON.stringify(++$rootScope.total) );
                    if (item.quantity <= 0) {
                        vm.items.splice(i, 1);
                    }
                }
            }
            if (!found) {
                vm.items.push(cartObject);
                console.log();
                localStorage.setItem('data' ,JSON.stringify(vm.items) );
                localStorage.setItem('quantity' ,JSON.stringify(++$rootScope.total) );
            }
            console.log(vm.items);
        };
        var test2 = localStorage.getItem("data");
        console.log(vm.items);
    })();
});
