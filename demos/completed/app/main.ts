import { registerMessageBundleLoader, normalizeMessageBundleLocale } from "esri/intl";
import Map from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import LayerFX from "./LayerFX";

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

// register message bundle loader for LayerFX messages
registerMessageBundleLoader({
  pattern: "esri/demo/app/",
  async fetchMessageBundle(bundleId, locale) {
    locale = normalizeMessageBundleLocale(locale as any);
    const relativePath = bundleId.replace("esri/demo/", "");
    const bundlePath = `./${relativePath}_${locale}.json`;
    const response = await fetch(bundlePath);
    return response.json();
  }
});

var layerFX = new LayerFX({ layer });

view.ui.add(layerFX, "top-right");

// add to window for demo
(window as any).layerFX = layerFX;
