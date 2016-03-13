/**
 * Created by hp Elite Book 8530p on 11/24/2015.
 */
var app = angular.module('BookStore');
var ide;
app.controller('ProductsController' , function($mdDialog , $upload , $timeout , $mdSidenav, $log , $http ,$rootScope , $location){
        var bookId ;
        var vm = this;
        vm.bookIde;
        vm.view = function(path){
            $location.path(path);
        }
        vm.books = [];
        var data = [];
    vm.show = "This Is products page";
        $rootScope.product = [];
        (function(){
        $rootScope.show = false;
        $rootScope.sh = true;
        $timeout(function(){
            $http.get('PhpServer/getBooks.php').then(function(data){
                console.log(data);
                console.log(JSON.stringify(data.data));
                vm.books = data.data;
                $http.post('PhpServer/getProductss.php' , {bId : vm.books[0].b_id}).then(function(res){
                    console.log(res.data);
                    $rootScope.product = res.data;
                    vm.bookIde= $rootScope.product[0].b_id;
                    console.log(vm.bookIde);
                })
            });
        },0);
    })();
        vm.bookIDD;
        vm.sub = function(id){
        bookId = id;
        $http.post('PhpServer/getProductss.php' , {bId : bookId}).then(function(res){
            console.log(res.data);
            $rootScope.product = res.data;
            vm.bookIde= $rootScope.product[0].b_id;
            console.log(vm.bookIde);
        })
        console.log(typeof(bookId));
    }
        vm.view = function(path){

            $location.path(path);
        }
        vm.call = function(){
            alert(bookIde);
        }
        vm.toggleRight = buildToggler('right');
        vm.images = [1,2,3,4 ,5 ,6 ,7 ,8 ,9 ,10];
        vm.addProducts = function(ev){
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/templates/addBook.html',
            targetEvent: ev,
            clickOutsideToClose:false
        })
            .then(function(answer) {
                vm.status = 'You said the information was "' + answer + '".';
                console.log(answer);
                vm.status = answer;
            }, function() {
                vm.status = 'You cancelled the dialog.';
            });
   };
    console.log($rootScope.booksId);
        function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
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
        var uploadResult = [];
        $scope.name;
        var $filee ;
        $scope.name;
        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            $filee = $files;
            console.log($filee);
        };
        var getCorrect;
        $scope.add = function () {
            for (var i = 0; i < $filee.length; i++) {
                var $file= $filee[i];
                $upload.upload({
                    url: 'PhpServer/uploadBooks.php',
                    file: $file,
                    progress: function(e){}
                }).then(function(response) {
                    // file is uploaded successfully
                    $timeout(function() {
                        console.log(response.data.length);
                        var length;
                        console.log( length = response.data.substr(1 , response.data.length-2));
                        console.log(length.length);
                        if(length.length != 59  ){
                            $scope.name = response.data.substr(1 , response.data.length-2);
                            console.log(getCorrect =  $scope.name);
                        }
                        else if(length.length == 59 ){
                            return;}
                    });
                },0);
            }
            $timeout(function() {
                    console.log(getCorrect);
                    if(getCorrect === undefined){
                        alert("Sorry!");
                        return;
                    }
                    else{
                        $http.post('components/templates/addBooks.php', {
                            pName: $scope.product.name,
                            pPrice: $scope.product.price,
                            pQuantity: $scope.product.quantity,
                            pImage: $scope.name
                        }).then(function (data) {
                            console.log(data);
                            $timeout(function(){
                                $http.get('PhpServer/getBooks.php').then(function(data){
                                    vm.books = data.data;
                                })
                            },500);
                            getCorrect = undefined;
                        })
                    }
                },1000);
        }
    }
        function buildToggler(navID) {
        return function() {
            if(bookId){ $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
                ide = bookId;
                bookId = "";
            }
            else{
                alert("Please select a bproducts!");
            }
        }}
        vm.demo = {
            showTooltip : false,
            tipDirection : 'right'
        };
        vm.show = false;
        vm.rootFolders = '';
        var id;
        vm.edit = function(name , uId){
            vm.show = true;
            vm.rootFolders = name;
            id = uId;

        }
        vm.editName = function(){
            vm.show = false;
            $http.put('PhpServer/updataBookName.php', {
                bName: vm.rootFolders,
                bId : id
            }).then(function(res){
                console.log(res.data);
                $timeout(function(){
                    $http.get('PhpServer/getBooks.php').then(function(data){


                        /*console.log(JSON.stringify(data.data));*/
                        vm.books = data.data;


                    })
                },0);
            })
            console.log(vm.rootFolders + " " + id);
            vm.rootFolders = '';
            id = '';}
    });
app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log , $http , $upload , $rootScope) {
    $scope.name = "RIGHT"
    var $filees ;
    $scope.image;
    var correct;
    $scope.onFileSelect = function($files) {$filees = $files;};
    $scope.add = function () {
        if(ide){
            alert(ide);
        }
        else{
            alert("Please Select Book");
        }
        for (var i = 0; i < $filees.length; i++) {
         var $file= $filees[i];
         $upload.upload({
         url: 'PhpServer/uploadProducts.php',
         file: $file,
         progress: function(e){}
         }).then(function(response) {
         // file is uploaded successfully
         $timeout(function() {
         console.log(response.data.length);
         var length;
         console.log( length = response.data.substr(1 , response.data.length-2));
         console.log(length.length);
         if(length.length != 59  ){
         $scope.image = response.data.substr(1 , response.data.length-2);
         console.log(correct =  $scope.image);
         }
         else if(length.length == 59 ){
             return;
         }
         });
         },0);
         }
        $timeout(function() {
         console.log(correct);
         if(correct === undefined){
         alert("Sorry!");
         return;
         }
         else{
         $http.post('components/templates/addProducts.php', {
         pName: $scope.product.name,
         pPrice: $scope.product.price,
         pDescription: $scope.product.description,
         pImage: $scope.image,
         bId : ide
         }).then(function (data) {
             console.log(data);
             $timeout(function(){
             },500);
             $http.post('PhpServer/getProductss.php' , {bId : ide}).then(function(res){
                 console.log(res.data);
                 $rootScope.product = res.data;
             })
             console.log(ide);
             $scope.image = "";
             correct = undefined;
         })
         }
         },1000);
    }
    $scope.close = function () {
        $mdSidenav('first').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };


});
