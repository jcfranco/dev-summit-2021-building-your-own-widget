import Widget from "esri/widgets/Widget";
import { tsx } from "esri/widgets/support/widget";
import { subclass, property } from "esri/core/accessorSupport/decorators";
import WidgetProperties = __esri.WidgetProperties;

const CSS = {
  base: "simple-widget",
  enabled: "simple-widget--enabled"
};

@subclass("esri.demo.SimpleWidget")
class SimpleWidget extends Widget {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(params?: WidgetProperties) {
    super(params);
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @property()
  enabled = false;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const { enabled } = this;

    const rootClasses = {
      [CSS.base]: true,
      [CSS.enabled]: enabled
    };

    return (
      <div class={this.classes(rootClasses)} onclick={this._toggle} >
        {enabled ? "Enabled" : "Disabled"}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _toggle = (): void => {
    this.enabled = !this.enabled;
  };
}

export = SimpleWidget;
