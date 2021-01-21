import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import Handles = require("esri/core/Handles"); // handleowner wasn't working :(
import { init, on, watch } from "esri/core/watchUtils";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { LayerFXProperties, LayerEffectCollection } from "./interfaces";
import LayerEffect = require("./LayerEffect");

const FXCollection = Collection.ofType(LayerEffect);

@subclass("esri.demo.LayerFXViewModel")
class LayerFXViewModel extends Accessor {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: LayerFXProperties) {
    super(props);
  }

  initialize(): void {
    this.handles.add([
      on(this, "effects", "change", () => {
        this.notifyChange("statements");
      }),
      init(this, "layer", () => this.notifyChange("statements")),
      watch(this, "statements", (statements) => (this.layer.effect = statements))
    ]);
  }

  destroy() {
    this.handles.removeAll();
    this.handles.destroy();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  handles = new Handles();

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  effects
  //----------------------------------

  @property({
    readOnly: true,
    type: Collection.ofType(LayerEffect)
  })
  get effects(): LayerEffectCollection {
    return new FXCollection([
      new LayerEffect({
        id: "brightness",
        value: 20,
        enabled: true
      }),
      new LayerEffect({
        id: "opacity",
        value: 20,
        enabled: true
      })
    ]);
  }

  //----------------------------------
  //  layer
  //----------------------------------

  @property()
  layer: Required<{ effect: string }> = null;

  //----------------------------------
  //  statements
  //----------------------------------

  @property({
    readOnly: true
  })
  get statements(): string {
    const { layer, effects } = this;

    if (!layer) {
      return;
    }

    return effects.length
      ? effects
          .map((effect) => effect.statement)
          .toArray()
          .join(" ")
      : null;
  }
}

export = LayerFXViewModel;
