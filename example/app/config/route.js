export default function routeConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            template: require('../controllers/main/main.html'),
            controller: 'Main',
        })
        .otherwise({redirectTo: '/'});
}

routeConfig.$inject = ['$routeProvider', '$locationProvider'];
