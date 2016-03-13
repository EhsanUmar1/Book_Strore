/**
 * Created by hp Elite Book 8530p on 12/5/2015.
 */
var app = angular.module('BookStore');
app.controller('ViewController' , function($mdDialog , $routeParams , $timeout , $http ){
    var vm = this;
    vm.name = "This is view Page";
    vm.identity = $routeParams.bookId;
    console.log($routeParams.bookId);
    (function(){
        $timeout(function(){
            $http.post('PhpServer/booksAndProducts.php' , {bId : vm.identity}).then(function(res){
                console.log(res.data);
                vm.products = res.data;
            });
        },0);
    })();
    vm.editProducts = function(b_id , p_id , bname , proName , price , quantity){
        vm.bname = bname;
        vm.pname = proName;
        vm.price = price;
        vm.book = b_id;
        vm.product = p_id;
        console.log(b_id + " " + p_id);
        vm.quantity = quantity;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/templates/editBookAndProducts.html',
            clickOutsideToClose:false
        }).then(function(answer) {
                vm.status = 'You said the information was "' + answer + '".';
                console.log(answer);
                vm.status = answer;
            }, function() {
                vm.status = 'You cancelled the dialog.';
            });
    };
    vm.showConfirm = function(bid , pid  ) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this product?')
            .ok('Yes!')
            .cancel('No!');
        $mdDialog.show(confirm).then(function() {
            vm.status = 'You decided to get rid of your debt.';
            console.log(bid , pid);
            $http.post('PhpServer/deleteData.php' ,{bookId : bid , productId : pid}).then(function(res){
                console.log(res);
                $timeout(function(){
                    $http.post('PhpServer/booksAndProducts.php' , {bId : vm.identity}).then(function(res){
                        console.log(res.data);
                        vm.products = res.data;
                    });
                },0);
            })
        }, function() {
            vm.status = 'You decided to keep your debt.';
            console.log(vm.status);
        });
    };
    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        console.log(vm.bname)
        $scope.name = vm.bname;
        $scope.productname = vm.pname;
        console.log(vm.pname);
        $scope.price = +vm.price;
        $scope.quantiy = +vm.quantity;
        $scope.cancel = function () {
            $mdDialog.cancel();
            console.log("cancel");
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        $scope.check = function () {
            alert("Checking");
        };
        console.log($scope.price + vm.book )
        $scope.edit = function(){
            $http.post('PhpServer/updateBooksAndProducts.php', {
                bName:  $scope.name ,
                pName : $scope.productname,
                price : $scope.price,
                quantity : $scope.quantiy,
                bId : vm.book,
                pId : vm.product
            }).then(function(res){
                console.log(res.data);
                $timeout(function(){
                    $http.post('PhpServer/booksAndProducts.php' , {bId : vm.identity}).then(function(res){
                        console.log(res.data);
                        vm.products = res.data;
                    });
                },0);
            })
        }
    }

});