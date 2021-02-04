import Map from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import LayerEffect from "./LayerEffect";
import LayerFX from "./LayerFX";

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

var layerEffect = new LayerEffect({ enabled: false, id: "contrast", values: [0] });
var layerFX = new LayerFX({ layer });

// add to window for demo
(window as any).layerFX = layerFX;
(window as any).layerEffect = layerEffect;
