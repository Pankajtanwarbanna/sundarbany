angular.module('userApp', ['userRoutes','userCtrl', 'mainController'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});