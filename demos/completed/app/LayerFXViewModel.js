define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/Collection", "esri/core/Handles", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "./LayerEffect"], function (require, exports, tslib_1, Accessor_1, Collection_1, Handles_1, watchUtils_1, decorators_1, LayerEffect_1) {
    "use strict";
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    Collection_1 = tslib_1.__importDefault(Collection_1);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    LayerEffect_1 = tslib_1.__importDefault(LayerEffect_1);
    var LayerEffectCollection = Collection_1.default.ofType(LayerEffect_1.default);
    var LayerFXViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(LayerFXViewModel, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function LayerFXViewModel(props) {
            var _this = _super.call(this, props) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this.handles = new Handles_1.default();
            //----------------------------------
            //  layer
            //----------------------------------
            _this.layer = null;
            return _this;
        }
        LayerFXViewModel.prototype.initialize = function () {
            var _this = this;
            this.handles.add(watchUtils_1.watch(this, "statements", function (statements) { return (_this.layer.effect = statements); }));
        };
        LayerFXViewModel.prototype.destroy = function () {
            this.handles.removeAll();
            this.handles.destroy();
        };
        Object.defineProperty(LayerFXViewModel.prototype, "effects", {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  effects
            //----------------------------------
            get: function () {
                return this._get("effects") || new LayerEffectCollection([
                    new LayerEffect_1.default({
                        id: "bloom",
                        values: [0, 0, 0]
                    }),
                    new LayerEffect_1.default({
                        id: "blur",
                        values: [0]
                    }),
                    new LayerEffect_1.default({
                        id: "brightness",
                        values: [100]
                    }),
                    new LayerEffect_1.default({
                        id: "contrast",
                        values: [100]
                    }),
                    new LayerEffect_1.default({
                        id: "drop-shadow",
                        values: [0, 0, 0]
                    }),
                    new LayerEffect_1.default({
                        id: "grayscale",
                        values: [0]
                    }),
                    new LayerEffect_1.default({
                        id: "hue-rotate",
                        values: [0]
                    }),
                    new LayerEffect_1.default({
                        id: "invert",
                        values: [0]
                    }),
                    new LayerEffect_1.default({
                        id: "opacity",
                        values: [100]
                    }),
                    new LayerEffect_1.default({
                        id: "saturate",
                        values: [100]
                    }),
                    new LayerEffect_1.default({
                        id: "sepia",
                        values: [0]
                    })
                ]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerFXViewModel.prototype, "state", {
            //----------------------------------
            //  state
            //----------------------------------
            get: function () {
                var layer = this.layer;
                var supportedLayer = layer && "effect" in layer;
                return supportedLayer ? (layer.loaded ? "ready" : "loading") : "disabled";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerFXViewModel.prototype, "statements", {
            //----------------------------------
            //  statements
            //----------------------------------
            get: function () {
                var effects = this.effects;
                return effects.length
                    ? effects
                        .filter(function (effect) { return effect.enabled; })
                        .map(function (effect) { return effect.statement; })
                        .toArray()
                        .join("\n")
                    : null;
            },
            enumerable: true,
            configurable: true
        });
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true,
                type: Collection_1.default.ofType(LayerEffect_1.default)
            })
        ], LayerFXViewModel.prototype, "effects", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerFXViewModel.prototype, "layer", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], LayerFXViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], LayerFXViewModel.prototype, "statements", null);
        LayerFXViewModel = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.LayerFXViewModel")
        ], LayerFXViewModel);
        return LayerFXViewModel;
    }(Accessor_1.default));
    return LayerFXViewModel;
});
//# sourceMappingURL=LayerFXViewModel.js.map