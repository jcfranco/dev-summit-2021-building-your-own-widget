import Widget from "esri/widgets/Widget";
import { tsx } from "esri/widgets/support/widget";
import { subclass } from "esri/core/accessorSupport/decorators";
import WidgetProperties = __esri.WidgetProperties;

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

  // put props here

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return <div/>;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // put private methods here
}

export = SimpleWidget;
