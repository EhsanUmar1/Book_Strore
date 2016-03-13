/**
 * Created by hp Elite Book 8530p on 12/5/2015.
 */
var app = angular.module('BookStore');
var id;
app.controller('SubController' , function($routeParams , $mdSidenav , $http ,$log , $timeout , $rootScope ){
   /*this.id = $routeParams.id;*/
    var vm = this;
    id =$routeParams.id;
    var pId;
    vm.toggleRight = buildToggler('right');
    (function(){
        $timeout(function(){
            $http.post('PhpServer/getSubProductss.php' , {pId : id}).then(function(res){
                console.log(res.data);
                $rootScope.subProducts = res.data;
                console.log($rootScope.subProducts)
            })
        },0);
    })();
    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }
})
app.controller('Ctrl', function ($scope, $mdSidenav , $upload ,$timeout , $log , $http , $rootScope) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
        $scope.add = function(){
            alert("Add");
        }
        var $filees ;
        $scope.image;
        var correct;
        $scope.onFileSelect = function($files) {$filees = $files;};
        $scope.add = function () {
            for (var i = 0; i < $filees.length; i++) {
                var $file= $filees[i];
                $upload.upload({
                    url: 'uploadSubProducts.php',
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
                    $http.post('components/templates/addSub.php', {
                        sAuthorName: $scope.subproduct.authorname,
                        sPublisher: $scope.subproduct.publishername,
                        sBio :$scope.subproduct.bio,
                        sWor: $scope.subproduct.wor,
                        sregDate :  Math.floor(Date.now() / 1000),
                        p_id : id,
                        sImage: $scope.image
                    }).then(function (data) {
                        console.log(data);
                        $timeout(function(){
                        },500);
                        $http.post('getSubProductss.php' , {pId : id}).then(function(res){
                            $rootScope.subProducts= res.data;
                        })
                        console.log(id);
                        $scope.image = "";
                        correct = undefined;
                    })
                }
            },1000);
        }
});
