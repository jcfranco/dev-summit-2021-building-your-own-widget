import Accessor = require("esri/core/Accessor");
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { LayerEffectProperties, LayerEffectID, EffectValueType } from "./interfaces";

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
  //  values
  //----------------------------------

  @property()
  values: number[] = null;

  //----------------------------------
  //  enabled
  //----------------------------------

  @property()
  enabled = false;

  //----------------------------------
  //  name
  //----------------------------------

  @property()
  name: string = null;

  //----------------------------------
  //  statement
  //----------------------------------

  @property({
    readOnly: true
  })
  get statement(): string {
    const { id, values } = this;

    return this.getEffectTemplate(id, values);
  }

  //----------------------------------
  //  valueTypes
  //----------------------------------

  @property({
    readOnly: true
  })
  get valueTypes(): EffectValueType[] {
    return this.getEffectValueTypes(this.id);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  getEffectValueTypes(effectId: string): EffectValueType[] {
    switch (effectId) {
      case "bloom":
        return [
          {
            id: "strength",
            name: "Strength",
            min: 0,
            max: 100,
            unit: "%"
          },
          {
            id: "radius",
            name: "Radius",
            min: 0,
            max: 100,
            unit: "px"
          },
          {
            id: "threshold",
            name: "Threshold",
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      case "blur":
        return [
          {
            min: 0,
            max: 100,
            unit: "px"
          }
        ];
      case "brightness":
        return [
          {
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      case "contrast":
        return [
          {
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      case "drop-shadow":
        return [
          {
            name: "offsetX",
            min: 0,
            max: 100,
            unit: "px"
          },
          {
            name: "offsetY",
            min: 0,
            max: 100,
            unit: "px"
          },
          {
            name: "Blur radius",
            min: 0,
            max: 100,
            unit: "px"
          }
        ];
      case "grayscale":
        return [
          {
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      case "hue-rotate":
        return [
          {
            min: 0,
            max: 100,
            unit: "deg"
          }
        ];
      case "invert":
        return [
          {
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      case "opacity":
        return [
          {
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      case "saturate":
        return [
          {
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      case "sepia":
        return [
          {
            min: 0,
            max: 100,
            unit: "%"
          }
        ];
      default:
        return null;
    }
  }

  getEffectTemplate(effectId: LayerEffectID, value: number[]): string {
    const valueTypes = this.getEffectValueTypes(effectId);

    // 50%, 12px, 50%
    const statement = valueTypes.map((valueType, index) => `${value[index]}${valueType.unit}`).join(",");

    // bloom(50%, 12px, 50%)
    return `${effectId}(${statement})`;
  }
}

export = LayerEffect;
