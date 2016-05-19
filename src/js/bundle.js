(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//var dragDrop = require("drag-drop"),

var imageType = /^image\//;

var uploadLink = document.getElementById("uploadLink"),
uploadInput = document.getElementById("uploadInput"),
dropbox = document.getElementById("content");

var images = [];

function handleDroppedFiles(files){
  handleFiles(files);
}
function handleSelectedFiles(){
  handleFiles(this.files);
}

function handleFiles(files){
  if ((images.length + files.length) < 2){
    images.push(files[0]); // needs to account for 1 or 2 file situations, files is always a fileList TODO
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
  var fileURL = window.URL.createObjectURL(files[0]);
  Caman("#canvas-id", fileURL, function(){
    this.resize({
        width:"500",
        height: "500"
    });
    this.newLayer(function(){
      var fileURL2 = window.URL.createObjectURL(files[1]);
      this.setBlendingMode('softlight');
      this.opacity(20);
      this.overlayImage(fileURL2);
    })
    this.render();
  });
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

// events
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

// file select dialog
uploadInput.addEventListener("change", handleSelectedFiles, false);
uploadLink.addEventListener("click", function(e){
  if (uploadInput){
    uploadInput.click();
  };
  e.preventDefault();
}, false);

},{}]},{},[1]);
