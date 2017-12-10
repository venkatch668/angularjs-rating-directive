angular.module("RatingApp", [])
.controller("RatingCtrl", function($scope) {
	$scope.rating1 = 5;
	$scope.rating2 = 2;
	$scope.rateReadable = true;
	$scope.rateFunction = function(rating) {
		console.log("Rating selected: " + rating);
	};
})
.directive("skillRating", function() {
	return {
		restrict : "EA",
		template : "<ul class='rating'>" +
		"  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
		"    <div class='bar' ng-class='{last:(($index+1)==ratingValue)}'></div>" + //&#9733
		"  </li>" +
		"</ul>",
		scope : {
			ratingValue : "=ngModel",
			max : "=?", //optional: default is 5
			onRatingSelected : "&?",
			readable: "=?"
		},
		link : function(scope, elem, attrs) {
		
			if (scope.max == undefined) { scope.max = 5; }
			function updateStars() {
				scope.stars = [];
				for (var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled : i < scope.ratingValue
					});
				}

			};
			scope.toggle = function(index) {
				if (scope.readable == undefined || scope.readable == false){
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating: index + 1
					});
				}
			};
			scope.$watch("ratingValue", function(oldVal, newVal) {
				if (newVal) {updateStars(); }
			});
		}
	};
});