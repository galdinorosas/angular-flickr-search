angular.module('myApp', ['ngAnimate'])
    .controller('myCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.introSearchSubmit = true;
        $scope.introSearchTerm = "";
        $scope.currentSearchTerm = "";
        $scope.searchResults = [];
        $scope.zeroImages = true;
        $scope.searchingMessage = true;

        $scope.introSubmit = function(searchTerm) {
            $scope.introSearchSubmit = true;
            $scope.zeroImages = true;
            $scope.searchingMessage = false;
            $scope.currentSearchTerm = $scope.introSearchTerm;
            $scope.introSearchTerm = "";
            console.log('loading...');
            if ($scope.introForm.$valid) {
                console.log('The form is valid');
                console.log($scope.introSearchSubmit);
                $scope.searchResults.splice(0);

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
                            console.log('loading complete...');
                            $scope.searchResults = response.data.photos.photo;
                            console.log($scope.searchResults);
                            if ($scope.searchResults.length === 0) {
                                $scope.searchingMessage = true;
                                $scope.zeroImages = false;
                            } else {
                                $scope.searchingMessage = true;
                                $scope.introSearchSubmit = false;
                            }
                        },
                        function(error) {
                            alert("Connection to the server is not working properly.");
                            console.log('error', error);
                        });

            } else {
                console.log('The form is invalid');
            }
        };

        console.log($scope.introSearchSubmit);

    }]);
