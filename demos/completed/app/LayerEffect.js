define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "./layerFXUtils"], function (require, exports, tslib_1, Accessor_1, decorators_1, layerFXUtils_1) {
    "use strict";
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var LayerEffect = /** @class */ (function (_super) {
        tslib_1.__extends(LayerEffect, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function LayerEffect(props) {
            var _this = _super.call(this, props) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  enabled
            //----------------------------------
            _this.enabled = false;
            //----------------------------------
            //  id
            //----------------------------------
            _this.id = null;
            //----------------------------------
            //  values
            //----------------------------------
            _this.values = null;
            return _this;
        }
        Object.defineProperty(LayerEffect.prototype, "valueTypes", {
            //----------------------------------
            //  valueTypes
            //----------------------------------
            get: function () {
                return layerFXUtils_1.getEffectValueTypes(this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerEffect.prototype, "statement", {
            //----------------------------------
            //  statement
            //----------------------------------
            get: function () {
                return this.getEffectTemplate(this.id, this.values);
            },
            enumerable: true,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        LayerEffect.prototype.getEffectTemplate = function (effectId, value) {
            // 50%, 12px, 50%
            var statement = this.valueTypes
                .filter(function (valueType, index) { return typeof value[index] === "number"; })
                .map(function (valueType, index) { return "" + value[index] + valueType.unit; })
                .join(",");
            // bloom(50%, 12px, 50%)
            return effectId + "(" + statement + ")";
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffect.prototype, "enabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffect.prototype, "id", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffect.prototype, "values", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], LayerEffect.prototype, "valueTypes", null);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], LayerEffect.prototype, "statement", null);
        LayerEffect = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.LayerEffect")
        ], LayerEffect);
        return LayerEffect;
    }(Accessor_1.default));
    return LayerEffect;
});
//# sourceMappingURL=LayerEffect.js.map