import Widget = require("esri/widgets/Widget");
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";
import { messageBundle, tsx } from "esri/widgets/support/widget";
import { EffectLayer, LayerFXWidgetProperties } from "./interfaces";
import { CSS } from "./resources";
import LayerFXViewModel = require("./LayerFXViewModel");
import LayerEffect = require("./LayerEffect");

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
  //  messages
  //----------------------------------

  @property()
  @messageBundle("esri/demo/app/t9n/LayerFX")
  messages: Record<string, string>;

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
        <h2>{this.messages.title}</h2>
        <div class={CSS.container}>{effects.map(this.renderEffect).toArray()}</div>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  private renderEffectSliderLabel({
    name,
    min,
    max,
    value,
    oninput
  }: {
    value: number;
    min: number;
    max: number;
    name: string;
    oninput: (event: Event) => void;
  }) {
    return (
      <label>
        {name}
        <input type="range" min={min} max={max} value={value} oninput={oninput} />
      </label>
    );
  }

  protected renderEffectValue(effect: LayerEffect, value: number, index: number) {
    const { valueTypes } = effect;
    const valueType = valueTypes[index];
    const { name, min, max } = valueType;

    return this.renderEffectSliderLabel({
      name: name || this.messages.value,
      min,
      max,
      value,
      oninput: (event: Event) => this.updateValue(event, effect, index)
    });
  }

  protected renderEffectValues(effect: LayerEffect) {
    return effect.values?.map((value, index) => this.renderEffectValue(effect, value, index));
  }

  protected renderEffectEnabledLabel(effect: LayerEffect) {
    const { enabled } = effect;

    return (
      <label>
        {this.messages.enabled}
        <input
          type="checkbox"
          checked={enabled}
          onchange={(event: Event) => this.updateEnabled(event, effect)}
        />
      </label>
    );
  }

  protected renderEffect = (effect: LayerEffect) => {
    return (
      <fieldset>
        <legend>{this.messages[effect.id]}</legend>
        {this.renderEffectEnabledLabel(effect)}
        {this.renderEffectValues(effect)}
      </fieldset>
    );
  };

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateEnabled = (event: Event, effect: LayerEffect) => {
    const target = event.target as HTMLInputElement;
    effect.enabled = !!target.checked;
  };

  private updateValue = (event: Event, effect: LayerEffect, index: number) => {
    const target = event.target as HTMLInputElement;
    const value = effect.values.slice();
    value[index] = target.valueAsNumber;
    effect.values = value;
  };
}

export = LayerFX;
