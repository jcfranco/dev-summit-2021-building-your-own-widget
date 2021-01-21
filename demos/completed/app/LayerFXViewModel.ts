import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import MapView = require("esri/views/MapView");
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
        this.view.whenLayerView(layer).then(async (layerView) => {
          this.effects.forEach((effect) => {
            (layerView as any).effect = (effect as any).statement;
          });
        });
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
      value: 100,
      enabled: true
    })
  ]);

  //----------------------------------
  //  layer
  //----------------------------------

  @property()
  layer: Layer = null;

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  view: MapView = null;

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
