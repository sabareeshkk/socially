angular.module('socially').controller('PartiesListCtrl', ['$scope', '$meteor', '$rootScope', 
    function ($scope, $meteor, $rootScope) {
    $scope.newParty = {};

    $scope.parties = $meteor.collection(Parties).subscribe('parties');
    
    $scope.add = function(newParty){
        $scope.newParty.owner = $rootScope.currentUser._id;
        $scope.parties.save($scope.newParty)
        $scope.newParty = {};
    };
    $scope.remove = function(party){
        $scope.parties.remove(party);
    };
    $scope.removeall = function(){
        $scope.parties.remove();
    };
}]);