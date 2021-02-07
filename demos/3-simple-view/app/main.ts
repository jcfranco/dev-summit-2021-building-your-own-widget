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
  center: [-116.538433, 33.824775],
  zoom: 13
});

//----------------
//  widget setup
//----------------

const widget = new SimpleWidget();

view.ui.add(widget, "top-right");
