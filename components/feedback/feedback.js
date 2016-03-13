/**
 * Created by hp Elite Book 8530p on 11/23/2015.
 */
var app = angular.module('BookStore');
app.controller('FeedbackController' , function($http , getData , $location){
    var vm = this;
    vm.title = "This is feedback us Page";
    vm.mainPage = [
        'home', 'about', 'contact', 'feedback'
    ];
    vm.next = function (dest) {
        $location.path('/' + vm.mainPage[dest]);
        }
    function getSaveData(){
        $http.post('PhpServer/getProductss.php' , {bId : 1}).then(function(res){
            console.log(res.data);
            vm.product = res.data;
        })
    }
    getSaveData();
})