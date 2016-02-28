angular.module('myApp', [])
    .controller('myCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.introSearchSubmit = false;

        $scope.introSearchTerm = "";
        $scope.searchResults = {};

        $scope.introSubmit = function(searchTerm) {
            $scope.introSearchTerm = "";

            var params = {
                method: 'flickr.photos.search',
                api_key: '080047a6f8b1c7aba461cb0f76ec0796',
                tags: searchTerm,
                format: 'json',
                nojsoncallback: 1
            };

            $http({
                    method: "GET",
                    url: "https://api.flickr.com/services/rest",
                    params: params
                })
                .then(function(response) {
                        console.log();
                        $scope.searchResults = response;
                        console.log($scope.searchResults);

                    },
                    function(error) {

                        console.log('error', error);
                    });
        };
    }]);
