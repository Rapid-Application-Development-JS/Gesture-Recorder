(function() {
    var canvas_recognize = document.getElementById("canvasGesture"),
        gestureTracker = new GestureTracker(canvas_recognize, function() { });

    var popup = document.getElementById('modal'),
        gestureNameInput = document.getElementById('gestureNameInput'),
        drawPanel = document.getElementById('draw'),
        gestureList = [],
        client_h = document.body.clientHeight,
        client_w = document.body.clientWidth,
        canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        pointer = new PointerTracker(canvas),
        pointer_recognize = new PointerTracker(canvas_recognize),
        gestureRecorder = new GestureRecorder(canvas),
        context_recognize = canvas_recognize.getContext("2d");

    canvas.height = client_h;
    canvas.width = client_w;
    canvas.style.height = client_h + "px";
    canvas.style.width = client_w + "px";
    canvas_recognize.height = client_h;
    canvas_recognize.width = client_w;
    canvas_recognize.style.height = document.body.clientHeight + "px";
    canvas_recognize.style.width = document.body.clientWidth + "px";

    function showPopup() {
        popup.classList.add("show");
        document.getElementById('gestureNameInput').focus();
    }

    function closePopup() {
        popup.classList.remove("show");
    }

    function closeEditMode() {
        drawPanel.classList.add("hidden");
        document.getElementsByClassName('main')[0].classList.remove("fullscreen");
        popup.classList.remove("show");
        document.getElementById('btnApply').classList.add('hidden');
        clearCanvas();
    }

    function removeItem(event) {
        var title = event.currentTarget.parentElement.innerText;
        var tempList = [];

        for (var i = 0; i < gestureList.length; i++) {
            if (gestureList[i].title !== title) {
                tempList.push(gestureList[i]);
            }
        }

        gestureList = tempList;
        updateList();
        gestureTracker.removeCurve(title);
    }

    function clearList() {
        gestureList = [];
        updateList();
        gestureTracker.clearCurves();
    }

    function updateList() {
        document.getElementById('list').innerHTML = '';
        for (var i = 0; i < gestureList.length; i++) {
            document.getElementById('list').appendChild(gestureList[i].element)
        }
    }

    function saveGesture() {
        var gestureString = gestureRecorder.getGestureString();

        if (gestureString && gestureString.length>1) {
            var item = document.createElement('li'),
                itemCanvas = document.createElement('canvas'),
                itemTitle = document.createElement('div'),
                itemDelete = document.createElement('div'),
                itemDeleteIcon = document.createElement('div'),
                itemContext = itemCanvas.getContext("2d"),
                itemTitleText = gestureNameInput.value,
                listCanvasHeight = 60,
                listCanvasWidth = 60;


            itemTitle.textContent = itemTitleText;
            itemTitle.classList.add('gesture-title');

            itemCanvas.classList.add('gesture-img');
            itemCanvas.classList.add('pull-left');
            itemCanvas.height = listCanvasHeight;
            itemCanvas.width = listCanvasWidth;

            itemDeleteIcon.classList.add('fa');
            itemDeleteIcon.classList.add('fa-times');

            itemDelete.classList.add('gesture-delete');
            itemDelete.appendChild(itemDeleteIcon);
            itemDelete.onclick = removeItem;


            item.classList.add('gesture-item');
            item.appendChild(itemCanvas);
            item.appendChild(itemTitle);
            item.appendChild(itemDelete);

            gestureNameInput.value = '';

            gestureList.push({
                title: itemTitleText,
                element: item
            });

            updateList();

            itemContext.fillStyle = "#FFFFFF";
            itemContext.fillRect(0, 0, listCanvasHeight+20, listCanvasWidth+10);
            itemContext.drawImage(canvas, 0, 0, client_h, client_w, 0, 0, listCanvasHeight+20, listCanvasWidth+10);
            clearCanvas();
            closeEditMode();
            clearRecCanvas();

            gestureTracker.addCurve(itemTitleText, JSON.parse(gestureRecorder.getGestureString()));
            console.log(JSON.parse(gestureRecorder.getGestureString()));
        } else {
            alert('At first make gesture');
        }
    }

    function checkForReturn (event) {
        if (event.keyCode === 13) {
            saveGesture();
        }
    }

    function clearRecCanvas() {
        context_recognize.clearRect(0, 0, client_h, client_w);
        canvas_recognize.width = canvas_recognize.width;
    }

    function clearCanvas() {
        context.clearRect(0, 0, client_h, client_w);
        canvas.width = canvas.width;
    }

    function curveFound(data) {
        var title = data.action;
        console.log('Gesture found! Title: ' + title + ", probability: " + data.probability);
    }

    function checkForGestures() {
        if(gestureList.length < 1) {
            document.getElementById('no-gestures-popup').style.top = '120px';
        }
    }

    function closeNoGesturesPopup() {
        document.getElementById('no-gestures-popup').style.top = '';
    }

    function hideDrawMessage() {
        document.getElementsByClassName('message')[1].classList.add("hidden");
    }

    function hideRecognizeMessage() {
        document.getElementsByClassName('message')[0].classList.add("hidden");
    }

    function addGesture () {
        document.getElementsByClassName('main')[0].classList.add("fullscreen");
        var canvasDraw = document.getElementById('draw');
        canvasDraw.classList.remove("hidden");
        canvasDraw.classList.add("visible");
        canvasDraw.getElementsByClassName('message')[0].classList.remove("hidden");
    }

    canvas.addEventListener('pointerdown', function (event) {
        clearCanvas();
        gestureRecorder.startRecord(event.layerX, event.layerY);
        context.strokeStyle = '#000000';
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
        document.getElementById('btnApply').classList.remove('hidden');
    }, false);

    canvas_recognize.addEventListener('pointerdown', function (event) {
        clearRecCanvas();
        context_recognize.strokeStyle = 'white';
        context_recognize.lineWidth = 10;
        context_recognize.moveTo(event.layerX, event.layerY);
    }, false);

    canvas_recognize.addEventListener('pointermove', function (event) {
        context_recognize.lineTo(event.layerX, event.layerY);
        context_recognize.stroke();
    }, false);

    canvas_recognize.addEventListener('pointerup', function (event) {
        context_recognize.lineTo(event.layerX, event.layerY);
        context_recognize.stroke();
    }, false);

    canvas_recognize.addEventListener('curve', curveFound);
    document.getElementById('draw').addEventListener('pointerdown', hideDrawMessage);
    document.getElementById('recognize').addEventListener('pointerdown', hideRecognizeMessage);
    document.getElementById('recognize').addEventListener('pointerup', checkForGestures);
    document.getElementById('btnApply').addEventListener('click', showPopup);
    document.getElementById('closeNamePopup').addEventListener('click', closePopup);
    document.getElementById('cancelNamePopup').addEventListener('click', closePopup);
    document.getElementsByClassName('btn-save')[0].onclick = saveGesture;
    document.getElementById('gestureNameInput').addEventListener('keydown', checkForReturn);
    document.getElementById('btnCancel').addEventListener('click', closeEditMode);
    document.getElementsByClassName('btn-clear')[0].onclick = clearList;
    document.getElementsByClassName('btn-ok')[0].onclick = closeNoGesturesPopup;
    document.getElementById('addGesture').onclick = addGesture;

})();