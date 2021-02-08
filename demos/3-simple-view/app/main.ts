import Map from "esri/Map";
import MapView from "esri/views/MapView";
import SimpleWidget from "./SimpleWidget";

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [-117.182541, 34.055569],
  zoom: 13
});

//----------------
//  widget setup
//----------------

const widget = new SimpleWidget();

view.ui.add(widget, "top-right");
