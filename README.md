# Gesture-Recorder
Easily create gesture patterns that you can record and save in touch based applications.
Use gesture-recorder to record your gesture and get it as a string or array.Then you can use your gesture to compare with other gestures with help of [Gesture](https://github.com/Rapid-Application-Development-JS/Gesture).

[Example](http://rapid-application-development-js.github.io/Gesture-Recorder/example/)

---

###Gesture-Recorder object
The first step for recording gestures in your code is to instantiate Gesture-Recorder object.

```javascript
var gestureRecorder = new GestureRecorder();
```

Then you should start record with function `startRecord`.

```javascript
gestureRecorder.startRecord(x, y);
```

Next steps are adding points with `addNewPoint` function.


```javascript
gestureRecorder.addNewPoint(x, y);
```

Finally, stop points recording with  `stopRecord`

```javascript
gestureRecorder.stopRecord(x, y);
```

After you stopped the record you can get result as string or as array.

```javascript
var resultAsString = gestureRecorder.getGestureString();
var resultAsArray = gestureRecorder.getGestureArray();
```


#####Example
```javascript

 var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        gestureRecorder = new GestureRecorder(),
        pointer = new PointerTracker(canvas);

    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
    canvas.style.height = document.body.clientHeight + "px";
    canvas.style.width = document.body.clientWidth + "px";

    canvas.addEventListener('pointerdown', function (event) {
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
        console.log('Gesture recorded: ' + gestureRecorder.getGestureString());
    }, false);



```