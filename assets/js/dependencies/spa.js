

angular.module('erpApp',[]);
angular.module('erpApp').controller('BaseCtrl', ['$scope' , function($scope) {

  io.socket.get('/thing', function(data){
    $scope.things = data;
    $scope.$apply();
  });

  io.socket.on('thing', function(event){
    switch (event.verb) {
      case 'created':
        $scope.things.push(event.data);
        $scope.$apply();
        break;
    }

  })

//   $scope.things = [{
//     text: 'keyboard',
//     id: 1,
//     price: '20$'
//   },
//     {
//       text: 'mouse-pad',
//       id: 2,
//       price: '5$'
//     },
//     {
//       text: 'game-pad',
//       id: 3,
//       price: '30$'
//     },
//     {
//       text: 'speakers',
//       id: 3,
//       price: '15$'
//     },
//     {
//       text: 'camera',
//       id: 4,
//       price: '50$'
//
//   }];

 }]);


