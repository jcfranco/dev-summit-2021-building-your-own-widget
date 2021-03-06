import Map from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import LayerFXView from "./LayerFXView";

// latest 14 months of unemployment statistics
const layer = new FeatureLayer({
  url:
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer/2",
  minScale: 0,
  maxScale: 0
});

const map = new Map({
  basemap: "dark-gray-vector",
  layers: [layer]
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-100, 40],
  zoom: 3
});

var layerFX = new LayerFXView({ layer });

view.ui.add(layerFX, "top-right");

// add to window for demo
(window as any).layerFX = layerFX;
