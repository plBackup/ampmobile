ampApp.controller("risk_administration_controller", ["$scope", "$http", "$rootScope","$timeout", function($scope, $http, $rootScope,$timeout) {
	var ctrl_detail_tel_module = (function($, cm) {
		var ctrl_detail_tel_module = cm;

		ctrl_detail_tel_module.init = function() {

			// 手动激活 风控 菜单
			$timeout(function(){
				$(".navbar-app .amp-menu.amp-menu-ctrl").closest("a").addClass("active");
			},200);



			$("#cost .table-title li.monthly").each(function() {
				$(this).on("click", function() {
					$scope.allyear_cost = false;
					$scope.$apply();
				});
			});
			$("#cost .table-title li.yearly").each(function() {
				$(this).on("click", function() {
					$("#cost .table-title li").each(function() {
						$(this).removeClass("title-active");
					});
					$scope.allyear_cost = true;
					$scope.$apply();
				});
			});



			$("#collectionrate .table-title li.monthly").each(function() {
				$(this).on("click", function() {					
					$scope.allyear_collectionrate = false;
					$scope.$apply();
				});
			});
			
			
			$("#collectionrate .table-title li.yearly").each(function() {
				$(this).on("click", function() {
					$("#collectionrate .table-title li").each(function() {
						$(this).removeClass("title-active");
					});
					$scope.allyear_collectionrate = true;
					$scope.$apply();
				});
			});

			$("#salesvolume .table-title li.monthly").each(function() {
				$(this).on("click", function() {					
					$scope.allyear_salesvolume = false;
					$scope.$apply();
				});
			});
			$("#salesvolume .table-title li.yearly").each(function() {
				$(this).on("click", function() {
					$("#salesvolume .table-title li").each(function() {
						$(this).removeClass("title-active");
					});
					$scope.allyear_salesvolume = true;
					$scope.$apply();
				});
			});



			$("#efficient .table-title li.monthly").each(function() {
				$(this).on("click", function() {
					$scope.allyear_efficient = false;
					$scope.$apply();
				});
			});
			
			
			$("#efficient .table-title li.yearly").each(function() {
				$(this).on("click", function() {
					$("#efficient .table-title li").each(function() {
						$(this).removeClass("title-active");
					});
					$scope.allyear_efficient = true;
					$scope.$apply();
				});
			});
			
			
			$("#investment .table-title li.monthly").each(function() {
				$(this).on("click", function() {
				
					$scope.allyear_investment = false;
					$scope.$apply();
				});
			});
			$("#investment .table-title li.yearly").each(function() {
				$(this).on("click", function() {
					$("#investment .table-title li").each(function() {
						$(this).removeClass("title-active");
					});;
					
					$scope.allyear_investment = true;
					$scope.$apply();
				});
			});


			$("#passenger .table-title li.monthly").each(function() {
				$(this).on("click", function() {					
					$scope.allyear_passenger = false;
					$scope.$apply();
				});
			});
			
			
			$("#passenger .table-title li.yearly").each(function() {
				$(this).on("click", function() {
					$("#passenger .table-title li").each(function() {
						$(this).removeClass("title-active");
					});

					$scope.allyear_passenger = true;
					$scope.$apply();
				});
			});

		}
		return ctrl_detail_tel_module;
	})(jQuery, ctrl_detail_tel_module || {})
	$scope.collapseTable = function(item) {
		if(item.hasCollapseBtn) {
			item.collapsed = !item.collapsed;
			var groupId = item.dataGroup;

			$scope.cost[$scope.costType].forEach(function(itemRecord) {
				if(groupId == itemRecord.dataGroup && !itemRecord.hasCollapseBtn) {
					itemRecord.hide = !itemRecord.hide;
					if(!itemRecord.hide){
						$("#riskctrl-detail #cost .amp-table-data tbody tr:nth-child(1) td:first-child").addClass("btn-up");
					}else{
						$("#riskctrl-detail #cost .amp-table-data tbody tr:nth-child(1) td:first-child").removeClass("btn-up");
					}
				}
			});
			$scope.salesvolume[$scope.saleType].forEach(function(itemRecord) {
				if(groupId == itemRecord.dataGroup && !itemRecord.hasCollapseBtn) {
					itemRecord.hide = !itemRecord.hide;
					if(!itemRecord.hide){
						$("#riskctrl-detail #salesvolume .amp-table-data tbody tr:nth-child(1) td:first-child").addClass("btn-up");
					}else{
						$("#riskctrl-detail #salesvolume .amp-table-data tbody tr:nth-child(1) td:first-child").removeClass("btn-up");
					}
				}
			});
			$scope.efficient[$scope.efficientType].forEach(function(itemRecord) {
				if(groupId == itemRecord.dataGroup && !itemRecord.hasCollapseBtn) {
					itemRecord.hide = !itemRecord.hide;
					if(!itemRecord.hide && groupId==1){
						$("#riskctrl-detail #efficient .amp-table-data tbody tr:nth-child(1) td:first-child").addClass("btn-up");
					}else if(itemRecord.hide && groupId==1){
						$("#riskctrl-detail #efficient .amp-table-data tbody tr:nth-child(1) td:first-child").removeClass("btn-up");
					};
					if(!itemRecord.hide && groupId==2){
						$("#riskctrl-detail #efficient .amp-table-data tbody tr:nth-child(9) td:first-child").addClass("btn-up");
					}else if(itemRecord.hide && groupId==2){
						$("#riskctrl-detail #efficient .amp-table-data tbody tr:nth-child(9) td:first-child").removeClass("btn-up");
					};
				}
			});
		}
	};
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


	/* ======================================== 初始化页面 ======================================== */
	var container = null;

	function initPageView() {
		container = $("#riskctrl_detail");
	}
	/* ======================================== 绑定事件 ======================================== */

	/* ======================================== common methods ======================================== */

	// 初始化
	var url = "./static/js/views/riskctrl/data/risk_administration_controller.json";

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
		switch(model) {
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
		if(a >= 0) {
			return 'text-red'
		} else {
			return 'text-green'
		}

	};
	$scope.setStyleIcon = function(a, b) {
		if(a > b) {
			return 'arrow-up'
		} else if(a < b) {
			return 'arrow-down'
		}else{
            	return 'padding-right'
            }

	};

	ctrl_detail_tel_module.init();



}]);