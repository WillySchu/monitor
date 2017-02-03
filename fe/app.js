angular.module('app', [])
  .controller('Main', Main)

Main.$inject = ['$scope']

function Main($scope) {
  const vm = this;

  vm.statuses = {ga: '', insights: ''};
  vm.services = ['ga', 'insights'];

  console.log('hello world');

  const ws = new WebSocket('ws:0.0.0.0:8080', 'protocol');

  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (vm.statuses[m.service] !== undefined) {
      vm.statuses[m.service] = m.status;
    } else {
      vm.logs = m.status;
    }
    $scope.$apply();
  }
}
