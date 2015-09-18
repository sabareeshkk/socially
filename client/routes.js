angular.module("socially").run(["$rootScope", "$location", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go("/parties");
    }
  });
}]);

angular.module('socially').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
      $locationProvider.html5Mode(true);
      $stateProvider
        .state('parties', {
          url: '/parties',
          templateUrl: 'client/parties/views/parties-list.ng.html',
          controller: 'PartiesListCtrl'
        })
        .state('partyDetails', {
          url: '/parties/:partyId',
          templateUrl: 'client/partyDetails/views/party-details.ng.html',
          controller: 'PartyDetailsCtrl',
          resolve: {
            "currentUser": ["$meteor", function($meteor){
              return $meteor.requireUser();
            }]
          }
        });
      $urlRouterProvider.otherwise("/parties");
}]);