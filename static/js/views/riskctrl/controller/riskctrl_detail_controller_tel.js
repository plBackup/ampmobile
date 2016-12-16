
ampApp.controller("ctrl-detail_tel", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
	var  ctrl_detail_tel_module=(function($,cm){
	var ctrl_detail_tel_module=cm;
	
	ctrl_detail_tel_module.init=function(){

		
		
$("#cost .table-title li.monthly").each(function() {
		$(this).on("click", function() {
			$("#cost .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_cost = false;
			$scope.$apply();
		});
	});
	$("#cost .table-title li.yearly").each(function() {
		$(this).on("click", function() {
			$("#cost .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_cost = true;
			$scope.$apply();
		});
	});
	
	$("#collectionrate .table-title li.monthly").each(function() {
		$(this).on("click", function() {
			$("#collectionrate .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_collectionrate = false;
			$scope.$apply();
		});
	});
	$("#collectionrate .table-title li.yearly").each(function() {
		$(this).on("click", function() {
			$("#collectionrate .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_collectionrate = true;
			$scope.$apply();
		});
	});
	
$("#salesvolume .table-title li.monthly").each(function() {
		$(this).on("click", function() {
			$("#salesvolume .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_salesvolume = false;
			$scope.$apply();
		});
	});
	$("#salesvolume .table-title li.yearly").each(function() {
		$(this).on("click", function() {
			$("#salesvolume .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_salesvolume = true;
			$scope.$apply();
		});
	});

			
$("#efficient .table-title li.monthly").each(function() {
		$(this).on("click", function() {
			$("#efficient .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_efficient = false;
			$scope.$apply();
		});
	});
	$("#efficient .table-title li.yearly").each(function() {
		$(this).on("click", function() {
			$("#efficient .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_efficient = true;
			$scope.$apply();
		});
	});	
$("#investment .table-title li.monthly").each(function() {
		$(this).on("click", function() {
			$("#investment .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_investment = false;
			$scope.$apply();
		});
	});;
	$("#investment .table-title li.yearly").each(function() {
		$(this).on("click", function() {
			$("#investment .table-title li").each(function() {
				$(this).removeClass("title-active");
			});;
			$(this).addClass("title-active");
			$scope.allyear_investment = true;
			$scope.$apply();
		});
	});
			
$("#passenger .table-title li.monthly").each(function() {
		$(this).on("click", function() {
			$("#passenger .table-title li").each(function() {
				$(this).removeClass("title-active");
			});
			$(this).addClass("title-active");
			$scope.allyear_passenger = false;
			$scope.$apply();
		});
	});
	$("#passenger .table-title li.yearly").each(function() {
		$(this).on("click", function() {
			$("#passenger .table-title li").each(function() {
				$(this).removeClass("title-active");
			});;
			$(this).addClass("title-active");
			$scope.allyear_passenger = true;
			$scope.$apply();
		});
	});    
	}
	return  ctrl_detail_tel_module;
})(jQuery, ctrl_detail_tel_module||{})

	$scope.collectionrate = [];
	$scope.cost = [];
	$scope.efficient = [];
	$scope.investment = [];
	$scope.passenger = [];
	$scope.records = [];
	$scope.salesvolume = [];

	function initializeData(data) {
		$scope.records = data;
	}

	/* ======================================== 监听广播事件 ======================================== */

	$scope.$on("$destroy", function() {
		destroy();
	});;

	/* ======================================== 初始化页面 ======================================== */
	var container = null;

	function initPageView() {
		container = $("#riskctrl_detail");
	}
	/* ======================================== 绑定事件 ======================================== */

	/* ======================================== common methods ======================================== */

	// 初始化
	var url = "./static/js/views/riskctrl/data/riskctrl_detail_data.json";

	function init() {

		$http.get(url).success(function(result) {
			initializeData(result);
			initPageView();

			$scope.collectionrate = result.collectionrate;
			$scope.cost = result.cost;
			$scope.efficient = result.efficient;
			$scope.investment = result.investment;
			$scope.passenger = result.passenger;
			$scope.records = result.records;
			$scope.salesvolume = result.salesvolume;

		});;
	}
	init();
	$scope.costType = "Budget";
	$scope.collectType = "Budget";
	$scope.saleType = "Budget";
	$scope.efficientType = "Budget";
	$scope.passengerType = "Budget";
	$scope.investmentType = "Budget";
	$scope.setType = function(type, model) {
		switch (model) {
			case "collectionrate":
				$scope.collectType = type;
				break;
			case "salesvolume":
				$scope.saleType = type;
				break;
			case "efficient":
				$scope.efficientType = type;
				break;
			case "investment":
				$scope.investmentType = type;
				break;
			case "passenger":
				$scope.passengerType = type;
				break;
			case "cost":
				$scope.costType = type;
				break;

			default:
				return;
		}
	}
	$scope.setStyleText = function(a) {
		if (a >= 0) {
			return 'text-red'
		} else {
			return 'text-green'
		}

	};
	$scope.setStyleIcon = function(a, b) {
		if (a > b) {
			return 'arrow-up'
		} else if(a<b){ 
			return 'arrow-down'
		}

	};
	
	ctrl_detail_tel_module.init();
	
}]);