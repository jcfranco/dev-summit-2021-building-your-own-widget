import Widget = require("esri/widgets/Widget");
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import { LayerFXWidgetProperties } from "./interfaces";
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
  layer: Required<{ effect: string }>;

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

    const sliders = effects.toArray().map((effect) => this.renderEffect(effect));

    return <div class={this.classes(CSS.root, CSS.esriWidget)}>{sliders}</div>;
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  // todo: can do NLS for effect ID
  protected renderEffect(effect: LayerEffect) {
    return (
      <fieldset>
        <label>
          {effect.id}
          <input
            type="range"
            min="1"
            max="100"
            value={effect.value}
            class="slider"
            oninput={(event: Event) => {
              const target = event.target as HTMLInputElement;
              effect.value = target.valueAsNumber;
            }}
          ></input>
        </label>
      </fieldset>
    );
  }
}

export = LayerFX;
