var wingedMonkeyControllers = angular.module('wingedMonkeyControllers',[]);

wingedMonkeyControllers.controller("ProviderAppsCtrl", function($scope, $timeout, $filter, ProviderApplication, FlashMessage) {
  $scope.appsLoaded = false;
  $scope.sort = { predicate: "name", reverse: false };

  var timeoutPromise;
  var timeoutDelay = 15000;

  $scope.refreshProviderApps = function() {
    ProviderApplication.query(function(data){

      if ($scope.appsLoaded) {
        data.forEach(function(dataApp) {
          app = $filter('filter')($scope.providerApps, { id: dataApp.id });
          if (app.length > 0) {
            dataApp.toggles = app[0].toggles;
          }
        });
      }

      $scope.providerApps = data;
      $scope.appsLoaded = true;
      timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
    });
  };

  $scope.refreshProviderApps();

  $scope.destroyProviderApp = function(app_id) {
    $timeout.cancel(timeoutPromise);
    $scope.providerApps.forEach(function(app, index) {
      if (app_id === app.id) {
        app.wm_state = "PENDING"
        app.disableButtons = true;
        toggles = app.toggles;
        app.$delete({id: app.id}, function(response) {
          response.toggles = toggles;
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        }, function(response){
          FlashMessage.add("error", app.name + ": " + response.data);
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        });
      }
    });
  };

  $scope.startProviderApp = function(app_id) {
    $timeout.cancel(timeoutPromise);
    $scope.providerApps.forEach(function(app, index) {
      if (app_id === app.id) {
        app.wm_state = "PENDING"
        app.disableButtons = true;
        toggles = app.toggles;
        app.$start({id: app.id}, function(response) {
          response.toggles = toggles;
          // FlashMessage.add("success", app.name + ": " + "Successfully started!");
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        }, function(response){
          FlashMessage.add("error", app.name + ": " + response.data);
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        });
      }
    });
  };

  $scope.stopProviderApp = function(app_id) {
    $timeout.cancel(timeoutPromise);
    $scope.providerApps.forEach(function(app, index) {
      if (app_id === app.id) {
        app.wm_state = "PENDING"
        app.disableButtons = true;
        toggles = app.toggles;
        app.$stop({id: app.id}, function(response) {
          response.toggles = toggles;
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        }, function(response){
          FlashMessage.add("error", app.name + ": " + response.data);
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        });
      }
    });
  };

  $scope.pauseProviderApp = function(app_id) {
    $timeout.cancel(timeoutPromise);
    $scope.providerApps.forEach(function(app, index) {
      if (app_id === app.id) {
        app.wm_state = "PENDING"
        app.disableButtons = true;
        toggles = app.toggles;
        app.$pause({id: app.id}, function(response) {
          response.toggles = toggles;
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        }, function(response){
          FlashMessage.add("error", app.name + ": " + response.data);
          timeoutPromise = $timeout($scope.refreshProviderApps, timeoutDelay);
        });
      }
    });
  };

});
