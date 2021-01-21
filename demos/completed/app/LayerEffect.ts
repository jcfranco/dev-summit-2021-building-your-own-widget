import Accessor = require("esri/core/Accessor");
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { LayerFXProperties, LayerEffectID, LayerEffectValue } from "./interfaces";

@subclass("esri.demo.LayerEffect")
class LayerEffect extends Accessor {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: any) {
    // todo
    super(props);
  }

  postInitialize(): void {
    //this.own();
  }

  destroy(): void {}

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  id
  //----------------------------------

  @property()
  id: LayerEffectID = null;

  //----------------------------------
  //  value
  //----------------------------------

  @property()
  value: LayerEffectValue = null;

  //----------------------------------
  //  enabled
  //----------------------------------

  @property()
  enabled = false;

  //----------------------------------
  //  scale
  //----------------------------------

  // todo?
  //@property()
  //scale: number = null;

  //----------------------------------
  //  statement
  //----------------------------------

  @property({
    dependsOn: ["id", "value"],
    readOnly: true
  })
  get statement(): string {
    const { id, value } = this;

    return this.getEffectTemplate(id, value);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // todo: getMin/Max/default

  getEffectTemplate(effectId: LayerEffectID, value: LayerEffectValue): string {
    const firstValue = Array.isArray(value) ? value[0] : value;

    if (typeof firstValue !== "number") {
      return null;
    }

    // going with % when possible
    // then px
    switch (effectId) {
      case "bloom":
        return `bloom(${value[0]}%, ${value[1]}px, ${value[2]}%)`;
      case "blur":
        return `blur(${firstValue}px)`;
      case "brightness":
        return `brightness(${firstValue}%)`;
      case "contrast":
        return `contrast(${firstValue}%)`;
      case "drop-shadow":
        return `drop-shadow(${value[0]}px, ${value[1]}px, ${value[2]}px)`;
      case "grayscale":
        return `grayscale(${firstValue}%)`;
      case "hue-rotate":
        return `hue-rotate(${firstValue}deg)`;
      case "invert":
        return `invert(${firstValue}%)`;
      case "opacity":
        return `opacity(${firstValue}%)`;
      case "saturate":
        return `saturate(${firstValue}%)`;
      case "sepia":
        return `sepia(${firstValue}%)`;
      default:
        return null;
    }
  }
}

export = LayerEffect;
