import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import { init } from "esri/core/watchUtils";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { LayerFXProperties, LayerEffects } from "./interfaces";
import LayerEffect = require("./LayerEffect");
import Layer = require("esri/layers/Layer");

const LayerEffectCollection = Collection.ofType(LayerEffect);

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
    init(this, "layer", (layer) => {
      if (layer) {
        this.effects.forEach((effect) => {
          (layer as any).effect = (effect as any).statement;
        });
        const effect = this.effects
          .map((effect) => (effect as any).statement)
          .toArray()
          .join(", ");

        console.log(effect);
      }
    });
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
  //  effects
  //----------------------------------

  @property({
    type: Collection.ofType(LayerEffect)
  })
  effects: LayerEffects = new LayerEffectCollection([
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

  //----------------------------------
  //  layer
  //----------------------------------

  @property()
  layer: Layer = null;

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
}

export = LayerFXViewModel;
