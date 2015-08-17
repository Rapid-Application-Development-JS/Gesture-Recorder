function GestureRecorder (limit){
    var _mas = [],
        _limit = limit||20,
        _isStart = false,
        _previousPoint;

    function getPoint(currentPoint, prePoint) {
        var _point = prePoint || {};
        _point.x = currentPoint.x;
        _point.y = currentPoint.y;
        return _point;
    }

    function calculateDistance (x1, x2, y1, y2) {
        return Math.pow(((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)), 0.5);
    }

    this.getGestureString = function(){
        if(_mas.length>0) {
            return JSON.stringify(_mas);
        }else{
            return undefined;
        }
    };

    this.getGestureArray = function(){
        if(_mas.length>0) {
            return _mas;
        }else{
            return undefined;
        }
    };

    this.startRecord = function(x, y){
        _mas = [];
        _previousPoint = getPoint({x:x, y:y}, null);
        _isStart = true;
    };

    this.addNewPoint = function(x, y) {
        _addPoint(x, y);
    };

    function _addPoint(x, y){
        if (_isStart) {
            var distance = calculateDistance(_previousPoint.x, x, _previousPoint.y, y);
            if (distance > _limit) {
                _mas[_mas.length] = {
                    x: x - _previousPoint.x,
                    y: y - _previousPoint.y
                };
                _previousPoint = getPoint({x: x, y: y}, _previousPoint);
            }
        }
    }

    this.cancel = function(){
        _isStart = false;
    };

    this.stopRecord = function(x, y){
        _addPoint(x, y);
        _isStart = false;
    };
}