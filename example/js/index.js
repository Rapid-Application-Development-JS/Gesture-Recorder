var $canvas = document.getElementById("canvas");
//var $canvasGesture = document.getElementById("canvasGesture");
//var gestureTracker = new window.GestureTracker($canvasGesture);
var context = $canvas.getContext("2d");
var $list = document.getElementById("list");
var pointerTracker = new PointerTracker($canvas);
var gestureRecorder = new GestureRecorder($canvas);
var isRecording = false;
var gestureRecordingName;
function recordNewGesture() {
	clearGesture();
	gestureRecordingName = prompt("Enter gesture name:");
	if (!gestureRecordingName || !gestureRecordingName.length) {
		return false;
	}
	document.title = "Recording: " + gestureRecordingName;
	isRecording = true;
	return true;
}
function clearGesture() {
	pointerTracker.destroy();
	gestureRecorder.destroy();
	var canvasWrapper = document.getElementById("canvas-wrapper");
	var height = $canvas.getAttribute("height");
	var width = $canvas.getAttribute("width");
	while (canvasWrapper.firstChild) {
		canvasWrapper.removeChild(canvasWrapper.firstChild);
	}
	$canvas = document.createElement("canvas");
	$canvas.setAttribute("id", "canvas");
	$canvas.setAttribute("height", height);
	$canvas.setAttribute("width", width);
	canvasWrapper.appendChild($canvas);
	context = $canvas.getContext("2d");
	pointerTracker = new PointerTracker($canvas);
	gestureRecorder = new GestureRecorder($canvas);
	$canvas.addEventListener("pointerdown", onPointerDown, false);
	$canvas.addEventListener("pointermove", onPointerMove, false);
	$canvas.addEventListener("pointerup", onPointerUp, false);
}
function saveGesture() {
	var gestureString = gestureRecorder.getGestureString();
	if (isRecording && gestureString === false) {
		alert("At first make gesture");
		return;
	}
	var item = document.createElement("li");
	item.classList.add("topcoat-list__item");
	var itemCanvas = document.createElement("canvas");
	var itemSpan = document.createElement("div");
	var itemContext = itemCanvas.getContext("2d");
	itemSpan.textContent = gestureRecordingName;
	itemCanvas.width = 96;
	itemCanvas.height = 96;
	$list.appendChild(item);
	item.appendChild(itemCanvas);
	item.appendChild(itemSpan);
	itemContext.fillStyle = "#009CD7";
	itemContext.fillRect(0, 0, 60, 80);
	itemContext.drawImage($canvas, 0, 0, 600, 800, 0, 0, 60, 80);
	context.clearRect(0, 0, 600, 800);
	isRecording = false;
	gestureRecorder.getGestureString();
	//gesture.addCurve(gestureString, JSONArray String);
	document.title = "Gesture Tracker";
}
function onPointerDown(event) {
	if (!isRecording) {
		if(recordNewGesture()) {
			onPointerDown(event);
		}
		return;
	}
	gestureRecorder.startRecord(event.layerX, event.layerY);
	context.strokeStyle = "#FFFFFF";
	context.lineWidth = 8;
	context.moveTo(event.layerX, event.layerY);
}
function onPointerMove(event) {
	if (!isRecording) {
		return;
	}
	gestureRecorder.addNewPoint(event.layerX, event.layerY);
	context.lineTo(event.layerX, event.layerY);
	context.stroke();
}
function onPointerUp(event) {
	if (!isRecording) {
		return;
	}
	gestureRecorder.stopRecord(event.layerX, event.layerY);
	console.log(gestureRecorder.getGestureString());
	context.lineTo(event.layerX, event.layerY);
	context.stroke();
}
$canvas.addEventListener("pointerdown", onPointerDown, false);
$canvas.addEventListener("pointermove", onPointerMove, false);
$canvas.addEventListener("pointerup", onPointerUp, false);

//$canvasGesture.addEventListener("curve", function (event) {
//	console.dir(event.action);
//	console.dir(event.probability);
//}, false);
