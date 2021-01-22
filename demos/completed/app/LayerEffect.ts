import Accessor = require("esri/core/Accessor");
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { LayerEffectProperties, LayerEffectID, LayerEffectValue } from "./interfaces";

@subclass("esri.demo.LayerEffect")
class LayerEffect extends Accessor {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: LayerEffectProperties) {
    super(props);
  }

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

  // todo?  This could complicate things since scale would need to use effect object.
  //@property()
  //scale: number = null;

  //----------------------------------
  //  statement
  //----------------------------------

  @property({
    readOnly: true
  })
  get statement(): string {
    const { id, value } = this;

    return this.getEffectTemplate(id, value);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // todo: add props for min/max?
  getEffectTemplate(effectId: LayerEffectID, value: LayerEffectValue): string {
    const firstValue = Array.isArray(value) ? value[0] : value;

    if (typeof firstValue !== "number") {
      return null;
    }

    // going with % when possible then px or deg depending on effect
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
