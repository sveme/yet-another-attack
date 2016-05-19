import "babel-polyfill";
import View from "./view";
import Controller from "./controller";
import Model from "./model";

var view = new View(document);
var model = new Model(document);
var controller = new Controller(document, view, model);