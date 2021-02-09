import { subclass, property, aliasOf } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import { CSS, messages } from "./resources";
import Widget from "esri/widgets/Widget";
import WidgetProperties = __esri.WidgetProperties;
import { EffectLayer, LayerFXWidgetProperties } from "./interfaces";
import LayerFX from "./LayerFXViewModel";
import LayerEffect from "./LayerEffect";
import LayerFXViewModel from "./LayerFXViewModel";

@subclass("esri.demo.LayerFX")
class LayerFXView extends Widget {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: LayerFXWidgetProperties) {
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
  messages: Record<string, string> = messages;

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
      <div class={this.classes(CSS.root, CSS.esriWidget, CSS.esriWidgetPanel)}>
        <h2>{this.messages.title}</h2>
        <p>{this.messages.summary}</p>
        <div class={CSS.container}>{effects.map(this.renderEffect).toArray()}</div>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderEffect = (effect: LayerEffect) => {
    return (
      <fieldset class={this.classes({[CSS.disabledEffect]: !effect.enabled})}>
        <legend>{this.renderEffectEnabledLabel(effect)}</legend>
        {this.renderEffectValues(effect)}
      </fieldset>
    );
  };

  protected renderEffectEnabledLabel = (effect: LayerEffect) => {
    const { enabled } = effect;

    return (
      <label>
        {this.messages[effect.id]}
        <input
          class={CSS.checkbox}
          type="checkbox"
          checked={enabled}
          onchange={(event: Event) => this.updateEnabled(event, effect)}
        />
      </label>
    );
  };

  protected renderEffectValues = (effect: LayerEffect) => {
    return effect.values?.map((value, index) => this.renderEffectValue(effect, value, index));
  };

  protected renderEffectValue = (effect: LayerEffect, value: number, index: number) => {
    const { valueTypes, enabled } = effect;
    const valueType = valueTypes[index];
    const { min, max, id } = valueType;

    return this.renderEffectSliderLabel({
      enabled,
      name: id ? this.messages[id] : this.messages.value,
      min,
      max,
      value,
      oninput: (event: Event) => this.updateValue(event, effect, index)
    });
  };

  protected renderEffectSliderLabel = ({
                                         enabled,
                                         name,
                                         min,
                                         max,
                                         value,
                                         oninput
                                       }: {
    enabled: boolean;
    value: number;
    min: number;
    max: number;
    name: string;
    oninput: (event: Event) => void;
  }) => {
    return (
      <label>
        {name}:
        <input
          class={CSS.slider}
          disabled={!enabled}
          type="range"
          min={min}
          max={max}
          value={value}
          oninput={oninput}
        />
      </label>
    );
  };

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateEnabled = (event: Event, effect: LayerEffect) => {
    const target = event.currentTarget as HTMLInputElement;
    effect.enabled = target.checked;
  };

  private updateValue = (event: Event, effect: LayerEffect, index: number) => {
    const target = event.currentTarget as HTMLInputElement;
    const value = effect.values.slice();
    value[index] = target.valueAsNumber;
    effect.values = value;
  };
}

export = LayerFXView;
