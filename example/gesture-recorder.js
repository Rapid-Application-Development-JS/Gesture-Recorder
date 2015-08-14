function GestureRecorder (element, limit){
    var _element = element,
        _scope = this,
        _mas =[],
        _limit = limit||20,
        _isStart = false,
        _previosPoint;

    function getPoint(currentPoint, prePoint) {
        var _point = prePoint || {};
        _point.x = currentPoint.x;
        _point.y = currentPoint.y;
        return _point;
    };

    function calculateDistance (x1, x2, y1, y2) {
        return Math.pow(((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)), 0.5);
    };

    this.getGestureString = function(){
        if(_mas.length>0) {
            return JSON.stringify(_mas);
        }else{
            return undefined;
        }
    }

    this.startRecord = function(x, y){
        _mas =[];
        _previosPoint = getPoint({x:x, y:y}, null);
        _isStart = true;
    }

    this.addNewPoint = function(x, y) {
        _addPoint(x, y);
    }

    function _addPoint(x, y){
        if (_isStart) {
            var distance = calculateDistance(_previosPoint.x, x, _previosPoint.y, y);
            if (distance > _limit) {
                _mas[_mas.length] = {
                    x: x - _previosPoint.x,
                    y: y - _previosPoint.y
                };
                _previosPoint = getPoint({x: x, y: y}, _previosPoint);
            }
        }
    }

    this.cancel = function(){
        _isStart = false;
    }

    this.stopRecord = function(x, y){
        _addPoint(x, y);
        _isStart = false;
    }

    this.destroy= function(){
        _element =null;
    }
}