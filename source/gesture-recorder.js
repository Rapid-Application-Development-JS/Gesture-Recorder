(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define("gesture-recorder", function () {
			root.GestureRecorder = factory();
			return root.GestureRecorder;
		});
	} else if (typeof module === "object" && module.exports) {
		root.GestureRecorder = factory();
		module.exports = root.GestureRecorder;
	} else {
		root.GestureRecorder = factory();
	}
}(this, function () {
	"use strict";
	/**
	 * Gesture recorder
	 * @param {HTMLElement} element
	 * @param {Number} limit
	 * @constructor
	 */
	function GestureRecorder(element, limit) {
		var _scope = this;
		var _element = element;
		var _dots = [];
		var _limit = limit || 20;
		var _isStart = false;
		var _previosPoint;

		function getPoint(currentPoint, prePoint) {
			var _point = prePoint || {};
			_point.x = currentPoint.x;
			_point.y = currentPoint.y;
			return _point;
		}

		function calculateDistance(x1, x2, y1, y2) {
			return Math.pow(((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)), 0.5);
		}

		this.getGestureString = function () {
			if (_dots.length > 0) {
				return JSON.stringify(_dots);
			} else {
				return "";
			}
		};
		this.startRecord = function (x, y) {
			_dots = [];
			_previosPoint = getPoint({x: x, y: y}, null);
			_isStart = true;
		};
		this.addNewPoint = function (x, y) {
			_addPoint(x, y);
		};
		function _addPoint(x, y) {
			if (_isStart) {
				var distance = calculateDistance(_previosPoint.x, x, _previosPoint.y, y);
				if (distance > _limit) {
					_dots[_dots.length] = {
						x: x - _previosPoint.x,
						y: y - _previosPoint.y
					};
					_previosPoint = getPoint({x: x, y: y}, _previosPoint);
				}
			}
		}

		this.cancel = function () {
			_isStart = false;
		};
		this.stopRecord = function (x, y) {
			_addPoint(x, y);
			_isStart = false;
		};
		this.destroy = function () {
			_element = null;
		}
	}

	GestureRecorder.version = "0.0.1";
	return GestureRecorder;
}));
