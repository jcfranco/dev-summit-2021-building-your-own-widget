define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./resources", "./LayerFXViewModel", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, widget_1, resources_1, LayerFXViewModel_1, Widget_1) {
    "use strict";
    LayerFXViewModel_1 = tslib_1.__importDefault(LayerFXViewModel_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var LayerFX = /** @class */ (function (_super) {
        tslib_1.__extends(LayerFX, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function LayerFX(props) {
            var _this = _super.call(this, props) || this;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new LayerFXViewModel_1.default();
            //--------------------------------------------------------------------------
            //
            //  Protected Methods
            //
            //--------------------------------------------------------------------------
            _this.renderEffectSliderLabel = function (_a) {
                var enabled = _a.enabled, name = _a.name, min = _a.min, max = _a.max, value = _a.value, oninput = _a.oninput;
                return (widget_1.tsx("label", null,
                    name,
                    ":",
                    widget_1.tsx("input", { class: resources_1.CSS.slider, disabled: !enabled, type: "range", min: min, max: max, value: value, oninput: oninput })));
            };
            _this.renderEffectValue = function (effect, value, index) {
                var valueTypes = effect.valueTypes, enabled = effect.enabled;
                var valueType = valueTypes[index];
                var min = valueType.min, max = valueType.max, id = valueType.id;
                return _this.renderEffectSliderLabel({
                    enabled: enabled,
                    name: id ? _this.messages[id] : _this.messages.value,
                    min: min,
                    max: max,
                    value: value,
                    oninput: function (event) { return _this.updateValue(event, effect, index); }
                });
            };
            _this.renderEffectValues = function (effect) {
                var _a;
                return (_a = effect.values) === null || _a === void 0 ? void 0 : _a.map(function (value, index) { return _this.renderEffectValue(effect, value, index); });
            };
            _this.renderEffectEnabledLabel = function (effect) {
                var enabled = effect.enabled;
                return (widget_1.tsx("label", null,
                    _this.messages[effect.id],
                    widget_1.tsx("input", { class: resources_1.CSS.checkbox, type: "checkbox", checked: enabled, onchange: function (event) { return _this.updateEnabled(event, effect); } })));
            };
            _this.renderEffect = function (effect) {
                var _a;
                return (widget_1.tsx("fieldset", { class: _this.classes((_a = {}, _a[resources_1.CSS.disabledEffect] = !effect.enabled, _a)) },
                    widget_1.tsx("legend", null, _this.renderEffectEnabledLabel(effect)),
                    _this.renderEffectValues(effect)));
            };
            //--------------------------------------------------------------------------
            //
            //  Private Methods
            //
            //--------------------------------------------------------------------------
            _this.updateEnabled = function (event, effect) {
                var target = event.currentTarget;
                effect.enabled = target.checked;
            };
            _this.updateValue = function (event, effect, index) {
                var target = event.currentTarget;
                var value = effect.values.slice();
                value[index] = target.valueAsNumber;
                effect.values = value;
            };
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        LayerFX.prototype.render = function () {
            var effects = this.viewModel.effects;
            return (widget_1.tsx("div", { class: this.classes(resources_1.CSS.root, resources_1.CSS.esriWidget, resources_1.CSS.esriWidgetPanel) },
                widget_1.tsx("h2", null, this.messages.title),
                widget_1.tsx("p", null, this.messages.summary),
                widget_1.tsx("div", { class: resources_1.CSS.container }, effects.map(this.renderEffect).toArray())));
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.layer")
        ], LayerFX.prototype, "layer", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("esri/demo/app/t9n/LayerFX")
        ], LayerFX.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerFX.prototype, "viewModel", void 0);
        LayerFX = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.LayerFX")
        ], LayerFX);
        return LayerFX;
    }(Widget_1.default));
    return LayerFX;
});
//# sourceMappingURL=LayerFX.js.map