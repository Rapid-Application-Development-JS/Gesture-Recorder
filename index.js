(function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        gestureRecorder = new GestureRecorder(),
        pointer = new PointerTracker(canvas),
        list = document.getElementById('list');

    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
    canvas.style.height = document.body.clientHeight + "px";
    canvas.style.width = document.body.clientWidth + "px";

    canvas.addEventListener('pointerdown', function (event) {
        clearCanvas();
        hideMessage();
        gestureRecorder.startRecord(event.layerX, event.layerY);
        context.strokeStyle = 'white';
        context.lineWidth = 10;
        context.moveTo(event.layerX, event.layerY);
    }, false);

    canvas.addEventListener('pointermove', function (event) {
        gestureRecorder.addNewPoint(event.layerX, event.layerY);
        context.lineTo(event.layerX, event.layerY);
        context.stroke();
    }, false);

    canvas.addEventListener('pointerup', function (event) {
        gestureRecorder.stopRecord(event.layerX, event.layerY);
        context.lineTo(event.layerX, event.layerY);
        context.stroke();

        fillList();
    }, false);

    function fillList() {
        list.innerText = '';
        var points = gestureRecorder.getGestureArray();

        for (var i=0; i < points.length; i++ ) {
            var listItem = document.createElement('li');
            listItem.innerText = 'x=' + points[i].x +", y=" + points[i].y;
            list.appendChild(listItem);
        }
    }

    function clearCanvas() {
        canvas.width = canvas.width; //this is the way to clear canvas
    }
    function hideMessage() {
        document.getElementsByClassName('message')[0].classList.add("hidden");
    }

})();
