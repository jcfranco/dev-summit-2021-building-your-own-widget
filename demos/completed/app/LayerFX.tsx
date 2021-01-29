import Widget = require("esri/widgets/Widget");
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import { EffectLayer, LayerFXWidgetProperties } from "./interfaces";
import { CSS, i18n } from "./resources";
import LayerFXViewModel = require("./LayerFXViewModel");
import LayerEffect = require("./LayerEffect");

// todo: i18n
// todo: drag and drop ordering for customizing?
// todo: could use calcite components for customizing?

@subclass("esri.demo.LayerFX")
class LayerFX extends Widget {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: LayerFXWidgetProperties) {
    super(props);
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  layer
  //----------------------------------

  @aliasOf("viewModel.layer")
  layer: EffectLayer;

  //----------------------------------
  //  viewModel
  //----------------------------------

  @property()
  viewModel: LayerFXViewModel = new LayerFXViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const { effects } = this.viewModel;

    return (
      <div class={this.classes(CSS.root, CSS.esriWidget)}>
        <h2>🤘☠️ LAYER.FX ☠️🤘</h2>
        <div class={CSS.container}>
          {effects.toArray().map((effect) => this.renderEffect(effect))}
        </div>
        {this.renderStatements()}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderStatements() {
    const { statements } = this.viewModel;

    return statements ? <pre>{statements}</pre> : null;
  }

  protected renderMultiValueEffect(effect: LayerEffect, value: number[]) {
    return value.map((val, index) => [
      <input
        type="range"
        min={effect.valueTypes[index].min}
        max={effect.valueTypes[index].max}
        value={val}
        oninput={(event: Event) => {
          const target = event.target as HTMLInputElement;
          value[index] = target.valueAsNumber;
          effect.value = value.slice();
        }}
      />,
      effect.valueTypes[index].name
    ]);
  }

  protected renderSingleValueEffect(effect: LayerEffect, value: number) {
    return (
      <label>
        <input
          type="range"
          min={effect.valueTypes[0].min}
          max={effect.valueTypes[0].max}
          value={value}
          oninput={(event: Event) => {
            const target = event.target as HTMLInputElement;
            effect.value = target.valueAsNumber;
          }}
        />
        Value
      </label>
    );
  }

  // todo: can do NLS for these
  protected renderEffect(effect: LayerEffect) {
    const { enabled, value } = effect;
    return (
      <fieldset>
        <legend>{effect.id}</legend>
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onchange={(event: Event) => {
              const target = event.target as HTMLInputElement;
              effect.enabled = target.checked;
            }}
          />
          Enabled
        </label>
        {Array.isArray(value)
          ? this.renderMultiValueEffect(effect, value)
          : this.renderSingleValueEffect(effect, value)}
      </fieldset>
    );
  }
}

export = LayerFX;
