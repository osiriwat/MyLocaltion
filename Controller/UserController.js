var app = angular.module('user', []);
app.controller('userController', function ($scope, $http, $window) {
    var userId = $window.sessionStorage.getItem("userId");
    if (userId != null) {
        window.location.href = "home.html";
    }

    $scope.Login = function () {
        var get = $http({
            method: "GET",
            url: ip_address + 'Users/Login?username=' + $scope.UserName + '&password=' + $scope.Password,
            dataType: 'json',
            data: {
                UserName: $scope.UserName,
                Password: $scope.Password
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function successCallback(response) {
            if (response.data != "null") {
                $window.sessionStorage.setItem("userId", response.data.Id);
                window.location.href = "home.html";
            } else
                alert("User name or Password incorrect");
        }, function errorCallback(response) {
            alert("Error");
        });
    }

    $scope.Register = function () {
        var post = $http({
            method: "POST",
            url: ip_address + "Users/Create",
            dataType: 'json',
            data: {
                FirstName: $scope.FirstName,
                LastName: $scope.LastName,
                PhoneNo: $scope.PhoneNo,
                Email: $scope.Email,
                UserName: $scope.UserName,
                Password: $scope.Password,
                CarNo: $scope.CarNo
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function successCallback(response) {
            alert("Save Success");
        }, function errorCallback(response) {
            alert("Error");
        });
    }
});