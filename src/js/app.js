(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO separate into mvc
// view helpers
function create(type, id){
	var el = document.createElement(type);
	el.id = id;
	return el;
}
var imageType = /^image\//;

var uploadButton = `<input id=\"uploadInput\" multiple accept=\"image/*\" type=\"file\" style=\"display:none;\" />
				<a title="Upload images" href=\"#\" id=\"uploadLink\">
					<img id=\"uploadImg\" alt=\"Upload button\" src=\"src/icons/beforeUpload.png\"></img>
				</a>`,
closeButtonStr = `<a title="Remove images" href=\"#\" id=\"closeLink\">
	<img id=\"closeIcon\" alt=\"Undo\" src=\"src/icons/undo.png\"></img>
</a>`,
contentElement = document.getElementById("content"),
closeElement = document.createElement("div"),
uploadElement = document.createElement("div");
uploadElement.innerHTML = uploadButton;
closeElement.innerHTML = closeButtonStr;
closeElement.id = "closeButton"
uploadElement.id = "upload";

contentElement.appendChild(create("canvas", "canvas-id"));
toggleState(true);

var uploadLink = document.getElementById("uploadLink"),
uploadInput = document.getElementById("uploadInput")

var images = [];

function handleDroppedFiles(files){
  handleFiles(files);
}
function handleSelectedFiles(){
  handleFiles(this.files);
}

function handleFiles(files){
  if ((images.length + files.length) < 2){
    images.push(files[0]);
    }
  else if ((images.length + files.length) == 2){
    for (var i = 0, numFiles = files.length; i < numFiles; i++){
      images.push(files[i]);
    }
    loadImages(images);
  }
}

function loadImages(files){
  if(!imageType.test(files[0].type) || (!imageType.test(files[1].type))){
    return;
  }
	if (document.getElementById('canvas-id') == null){
		contentElement.appendChild(create("canvas", "canvas-id"));
	}
  var fileURL = window.URL.createObjectURL(files[0]);
  // Use Caman to resize, load, overlay and blend the images
  Caman("#canvas-id", fileURL, function(){
    this.resize({
        width:"500",
        height: "500"
    });
    this.newLayer(function(){
      var fileURL2 = window.URL.createObjectURL(files[1]);
      this.setBlendingMode('normal');
      this.opacity(50);
      this.overlayImage(fileURL2);
    });
    this.render();
		toggleState(false);
  });
}

function toggleState(display){
	if (display){
		// state: ready for upload
		contentElement.appendChild(uploadElement);
		if (document.getElementById('closeButton')){
			contentElement.removeChild(closeElement);
		}
	}
	else{
		// state: remove the upload button
		contentElement.removeChild(uploadElement);
		contentElement.insertBefore(closeElement, document.getElementById('canvas-id'));
	};
}

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleDroppedFiles(files);
}

/* events */
contentElement.addEventListener("dragenter", dragenter, false);
contentElement.addEventListener("dragover", dragover, false);
contentElement.addEventListener("drop", drop, false);
// file select dialog
uploadInput.addEventListener("change", handleSelectedFiles, false);
uploadLink.addEventListener("click", function(e){
  if (uploadInput){
    uploadInput.click();
  };
  e.preventDefault();
}, false);

closeElement.addEventListener("click", function(e){
	//files = [];
	images = [];
	contentElement.removeChild(document.getElementById("canvas-id"));
	toggleState(true);
}, false);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gVE9ETyBzZXBhcmF0ZSBpbnRvIG12Y1xuLy8gdmlldyBoZWxwZXJzXG5mdW5jdGlvbiBjcmVhdGUodHlwZSwgaWQpe1xuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXHRlbC5pZCA9IGlkO1xuXHRyZXR1cm4gZWw7XG59XG52YXIgaW1hZ2VUeXBlID0gL15pbWFnZVxcLy87XG5cbnZhciB1cGxvYWRCdXR0b24gPSBgPGlucHV0IGlkPVxcXCJ1cGxvYWRJbnB1dFxcXCIgbXVsdGlwbGUgYWNjZXB0PVxcXCJpbWFnZS8qXFxcIiB0eXBlPVxcXCJmaWxlXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lO1xcXCIgLz5cblx0XHRcdFx0PGEgdGl0bGU9XCJVcGxvYWQgaW1hZ2VzXCIgaHJlZj1cXFwiI1xcXCIgaWQ9XFxcInVwbG9hZExpbmtcXFwiPlxuXHRcdFx0XHRcdDxpbWcgaWQ9XFxcInVwbG9hZEltZ1xcXCIgYWx0PVxcXCJVcGxvYWQgYnV0dG9uXFxcIiBzcmM9XFxcInNyYy9pY29ucy9iZWZvcmVVcGxvYWQucG5nXFxcIj48L2ltZz5cblx0XHRcdFx0PC9hPmAsXG5jbG9zZUJ1dHRvblN0ciA9IGA8YSB0aXRsZT1cIlJlbW92ZSBpbWFnZXNcIiBocmVmPVxcXCIjXFxcIiBpZD1cXFwiY2xvc2VMaW5rXFxcIj5cblx0PGltZyBpZD1cXFwiY2xvc2VJY29uXFxcIiBhbHQ9XFxcIlVuZG9cXFwiIHNyYz1cXFwic3JjL2ljb25zL3VuZG8ucG5nXFxcIj48L2ltZz5cbjwvYT5gLFxuY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIiksXG5jbG9zZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxudXBsb2FkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG51cGxvYWRFbGVtZW50LmlubmVySFRNTCA9IHVwbG9hZEJ1dHRvbjtcbmNsb3NlRWxlbWVudC5pbm5lckhUTUwgPSBjbG9zZUJ1dHRvblN0cjtcbmNsb3NlRWxlbWVudC5pZCA9IFwiY2xvc2VCdXR0b25cIlxudXBsb2FkRWxlbWVudC5pZCA9IFwidXBsb2FkXCI7XG5cbmNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZShcImNhbnZhc1wiLCBcImNhbnZhcy1pZFwiKSk7XG50b2dnbGVTdGF0ZSh0cnVlKTtcblxudmFyIHVwbG9hZExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZExpbmtcIiksXG51cGxvYWRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkSW5wdXRcIilcblxudmFyIGltYWdlcyA9IFtdO1xuXG5mdW5jdGlvbiBoYW5kbGVEcm9wcGVkRmlsZXMoZmlsZXMpe1xuICBoYW5kbGVGaWxlcyhmaWxlcyk7XG59XG5mdW5jdGlvbiBoYW5kbGVTZWxlY3RlZEZpbGVzKCl7XG4gIGhhbmRsZUZpbGVzKHRoaXMuZmlsZXMpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVGaWxlcyhmaWxlcyl7XG4gIGlmICgoaW1hZ2VzLmxlbmd0aCArIGZpbGVzLmxlbmd0aCkgPCAyKXtcbiAgICBpbWFnZXMucHVzaChmaWxlc1swXSk7XG4gICAgfVxuICBlbHNlIGlmICgoaW1hZ2VzLmxlbmd0aCArIGZpbGVzLmxlbmd0aCkgPT0gMil7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bUZpbGVzID0gZmlsZXMubGVuZ3RoOyBpIDwgbnVtRmlsZXM7IGkrKyl7XG4gICAgICBpbWFnZXMucHVzaChmaWxlc1tpXSk7XG4gICAgfVxuICAgIGxvYWRJbWFnZXMoaW1hZ2VzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2FkSW1hZ2VzKGZpbGVzKXtcbiAgaWYoIWltYWdlVHlwZS50ZXN0KGZpbGVzWzBdLnR5cGUpIHx8ICghaW1hZ2VUeXBlLnRlc3QoZmlsZXNbMV0udHlwZSkpKXtcbiAgICByZXR1cm47XG4gIH1cblx0aWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMtaWQnKSA9PSBudWxsKXtcblx0XHRjb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGUoXCJjYW52YXNcIiwgXCJjYW52YXMtaWRcIikpO1xuXHR9XG4gIHZhciBmaWxlVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbMF0pO1xuICAvLyBVc2UgQ2FtYW4gdG8gcmVzaXplLCBsb2FkLCBvdmVybGF5IGFuZCBibGVuZCB0aGUgaW1hZ2VzXG4gIENhbWFuKFwiI2NhbnZhcy1pZFwiLCBmaWxlVVJMLCBmdW5jdGlvbigpe1xuICAgIHRoaXMucmVzaXplKHtcbiAgICAgICAgd2lkdGg6XCI1MDBcIixcbiAgICAgICAgaGVpZ2h0OiBcIjUwMFwiXG4gICAgfSk7XG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpe1xuICAgICAgdmFyIGZpbGVVUkwyID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbMV0pO1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ25vcm1hbCcpO1xuICAgICAgdGhpcy5vcGFjaXR5KDUwKTtcbiAgICAgIHRoaXMub3ZlcmxheUltYWdlKGZpbGVVUkwyKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXHRcdHRvZ2dsZVN0YXRlKGZhbHNlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVN0YXRlKGRpc3BsYXkpe1xuXHRpZiAoZGlzcGxheSl7XG5cdFx0Ly8gc3RhdGU6IHJlYWR5IGZvciB1cGxvYWRcblx0XHRjb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZCh1cGxvYWRFbGVtZW50KTtcblx0XHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlQnV0dG9uJykpe1xuXHRcdFx0Y29udGVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoY2xvc2VFbGVtZW50KTtcblx0XHR9XG5cdH1cblx0ZWxzZXtcblx0XHQvLyBzdGF0ZTogcmVtb3ZlIHRoZSB1cGxvYWQgYnV0dG9uXG5cdFx0Y29udGVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodXBsb2FkRWxlbWVudCk7XG5cdFx0Y29udGVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNsb3NlRWxlbWVudCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcy1pZCcpKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gZHJhZ2VudGVyKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnb3ZlcihlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJvcChlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgZHQgPSBlLmRhdGFUcmFuc2ZlcjtcbiAgdmFyIGZpbGVzID0gZHQuZmlsZXM7XG5cbiAgaGFuZGxlRHJvcHBlZEZpbGVzKGZpbGVzKTtcbn1cblxuLyogZXZlbnRzICovXG5jb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGRyYWdlbnRlciwgZmFsc2UpO1xuY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdvdmVyLCBmYWxzZSk7XG5jb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wLCBmYWxzZSk7XG4vLyBmaWxlIHNlbGVjdCBkaWFsb2dcbnVwbG9hZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgaGFuZGxlU2VsZWN0ZWRGaWxlcywgZmFsc2UpO1xudXBsb2FkTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gIGlmICh1cGxvYWRJbnB1dCl7XG4gICAgdXBsb2FkSW5wdXQuY2xpY2soKTtcbiAgfTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSwgZmFsc2UpO1xuXG5jbG9zZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuXHQvL2ZpbGVzID0gW107XG5cdGltYWdlcyA9IFtdO1xuXHRjb250ZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhcy1pZFwiKSk7XG5cdHRvZ2dsZVN0YXRlKHRydWUpO1xufSwgZmFsc2UpO1xuIl19
