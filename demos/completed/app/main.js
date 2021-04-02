define(["require", "exports", "tslib", "esri/intl", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "./LayerFX"], function (require, exports, tslib_1, intl_1, Map_1, MapView_1, FeatureLayer_1, LayerFX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = tslib_1.__importDefault(Map_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    LayerFX_1 = tslib_1.__importDefault(LayerFX_1);
    // latest 14 months of unemployment statistics
    var layer = new FeatureLayer_1.default({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer/2",
        minScale: 0,
        maxScale: 0
    });
    var map = new Map_1.default({
        basemap: "dark-gray-vector",
        layers: [layer]
    });
    var view = new MapView_1.default({
        container: "viewDiv",
        map: map,
        center: [-100, 40],
        zoom: 3
    });
    // register message bundle loader for LayerFX messages
    intl_1.registerMessageBundleLoader({
        pattern: "esri/demo/app/",
        fetchMessageBundle: function (bundleId, locale) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var relativePath, bundlePath, response;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            locale = intl_1.normalizeMessageBundleLocale(locale);
                            relativePath = bundleId.replace("esri/demo/", "");
                            bundlePath = "./" + relativePath + "_" + locale + ".json";
                            return [4 /*yield*/, fetch(bundlePath)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.json()];
                    }
                });
            });
        }
    });
    var layerFX = new LayerFX_1.default({ layer: layer });
    view.ui.add(layerFX, "top-right");
    // add to window for demo
    window.layerFX = layerFX;
});
//# sourceMappingURL=main.js.map