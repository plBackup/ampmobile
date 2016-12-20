ampApp.controller("risk_investment_controller", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
	var ctrl_tel_module = (function($, cm) {
		var ctrl_tel_module = cm;

		ctrl_tel_module.init = function() {
			$("#noi .table-title li.monthly").each(function() {
				$(this).on("click", function() {
					$scope.allyear = false;
					$scope.$apply();
				});
			});
			$("#noi  .table-title li.yearly").each(function() {
				$(this).on("click", function() {
					$("#noi  .table-title li").each(function() {
						$(this).removeClass("title-active");
					});
					$scope.allyear = true;
					$scope.$apply();
				});
			});

		}
		return ctrl_tel_module;
	})(jQuery, ctrl_tel_module || {})

	var vm = $scope.vm = {};
	vm.value = 3 / 8 * 100;
	vm.style = 'progress-bar-success';
	vm.showLabel = false;
	vm.striped = false;
	$scope.records = [];
	$scope.noi = [];
	$scope.roi = [];
	$scope.roe = [];
	$scope.records = [];

	function initializeData(data) {
		$scope.records = data;
	}

	/* ======================================== 监听广播事件 ======================================== */

	/* ======================================== 初始化页面 ======================================== */
	var container = null;

	function initPageView() {
		container = $("#riskctrl");
		
		var windowHeight = $(window).height()-44-48;
        container.css("height",windowHeight+"px");
		
	}
	/* ======================================== 绑定事件 ======================================== */

	/* ======================================== common methods ======================================== */

	// 初始化
	var url = "./static/js/views/riskctrl/data/risk_investment_controller.json";

	function init() {
		$http.get(url).success(function(result) {
			initializeData(result);
			initPageView();
			//bindPageEvents();

			$scope.records = result.records;
			$scope.noi = result.noi;
			$scope.roi = result.roi;
			$scope.roe = result.roe;
			$scope.forecast = result.forecast;

		});
	}
	init();
	$scope.noiType = "NoiBudget";
	$scope.setType = function(type, model) {
		switch(model) {
			case "recodes":

				break;

			case "noi":
				$scope.noiType = type;
				break;

			default:
				return;
		}
	}
	$scope.setStyleText = function(a) {
		if(a >= 0) {
			return 'text-red'
		} else {
			return 'text-green'
		}

	}
	$scope.setStyleIcon = function(a, b) {
		if(a > b) {
			return 'arrow-up';
		} else if(a < b) {
			return 'arrow-down';
		}else{
            	return 'padding-right'
            }
	}
	ctrl_tel_module.init();

}]);