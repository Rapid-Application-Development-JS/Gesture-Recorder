(function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        gestureRecorder = new GestureRecorder(canvas),
        pointer = new PointerTracker(canvas),
        list = document.getElementById('list'),
        arr = [];

    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
    canvas.style.height = document.body.clientHeight + "px";
    canvas.style.width = document.body.clientWidth + "px";

    canvas.addEventListener('pointerdown', function (event) {
        clearCanvas();
        hideMessage();
        gestureRecorder.startRecord(event.layerX, event.layerY);
        arr = [];
        arr.push({x : event.layerX, y: event.layerY});
        context.strokeStyle = 'white';
        context.lineWidth = 10;
        context.moveTo(event.layerX, event.layerY);
    }, false);

    canvas.addEventListener('pointermove', function (event) {
        arr.push({x : event.layerX, y: event.layerY});
        gestureRecorder.addNewPoint(event.layerX, event.layerY);
        context.lineTo(event.layerX, event.layerY);
        context.stroke();
    }, false);

    canvas.addEventListener('pointerup', function (event) {
        arr.push({x : event.layerX, y: event.layerY});
        gestureRecorder.stopRecord(event.layerX, event.layerY);
        context.lineTo(event.layerX, event.layerY);
        context.stroke();

        fillList();
    }, false);

    function fillList() {
        var points = JSON.parse(gestureRecorder.getGestureString());

        listItem = document.createElement('li');
        listItem.innerText = '---------------------';
        list.appendChild(listItem);

        for (var i=0; i < points.length; i++ ) {
            var listItem = document.createElement('li');
            listItem.innerText = 'x=' + points[i].x +", y=" + points[i].y;
            list.appendChild(listItem);
        }

        listItem = document.createElement('li');
        listItem.innerText = '---------------------';
        list.appendChild(listItem);

        for (var j=0; j < arr.length; j++ ) {
            listItem = document.createElement('li');
            listItem.innerText = 'X=' + arr[j].x +", Y=" + arr[j].y;
            list.appendChild(listItem);
        }
    }

    function clearCanvas() {
        canvas.width = canvas.width; //this is the way to clear canvas
        list.innerText = '';
    }
    function hideMessage() {
        document.getElementsByClassName('message')[0].classList.add("hidden");
    }

})();
