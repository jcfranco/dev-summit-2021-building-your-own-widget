import Accessor = require("esri/core/Accessor");
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { LayerEffectProperties, LayerEffectID, EffectValueType } from "./interfaces";
import { getEffectValueTypes } from "./layerFXUtils";

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
  //  enabled
  //----------------------------------

  @property()
  enabled = false;

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
  //  valueTypes
  //----------------------------------

  @property({
    readOnly: true
  })
  get valueTypes(): EffectValueType[] {
    return getEffectValueTypes(this.id);
  }

  //----------------------------------
  //  statement
  //----------------------------------

  @property({
    readOnly: true
  })
  get statement(): string {
    return this.getEffectTemplate(this.id, this.values);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  getEffectTemplate(effectId: LayerEffectID, value: number[]): string {
    // 50%, 12px, 50%
    const statement = this.valueTypes.map((valueType, index) => `${value[index]}${valueType.unit}`).join(",");

    // bloom(50%, 12px, 50%)
    return `${effectId}(${statement})`;
  }
}

export = LayerEffect;
