import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import Handles = require("esri/core/Handles"); // handleowner wasn't working :(
import { watch } from "esri/core/watchUtils";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { EffectLayer, LayerFXProperties, LayerEffectCollection, LayerFXState } from "./interfaces";
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
    this.handles.add([watch(this, "statements", (statements) => (this.layer.effect = statements))]);
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
        id: "bloom",
        name: "Bloom",
        value: [0, 0, 0]
      }),
      new LayerEffect({
        id: "blur",
        name: "Blur",
        value: 0
      }),
      new LayerEffect({
        id: "brightness",
        name: "Brightness",
        value: 0
      }),
      new LayerEffect({
        id: "contrast",
        name: "Contrast",
        value: 0
      }),
      new LayerEffect({
        id: "drop-shadow",
        name: "Drop shadow",
        value: [0, 0, 0]
      }),
      new LayerEffect({
        id: "grayscale",
        name: "Grayscale",
        value: 0
      }),
      new LayerEffect({
        id: "hue-rotate",
        name: "Hue rotate",
        value: 0
      }),
      new LayerEffect({
        id: "invert",
        name: "Invert",
        value: 0
      }),
      new LayerEffect({
        id: "opacity",
        name: "Opacity",
        value: 0
      }),
      new LayerEffect({
        id: "saturate",
        name: "Saturate",
        value: 0
      }),
      new LayerEffect({
        id: "sepia",
        name: "Sepia",
        value: 0
      })
    ]);
  }

  //----------------------------------
  //  layer
  //----------------------------------

  @property()
  layer: EffectLayer = null;

  //----------------------------------
  //  state
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
             .filter((effect) => effect.enabled)
             .map((effect) => effect.statement)
             .toArray()
             .join("\n")
           : null;
  }

  @property({
    readOnly: true
  })
  get state(): LayerFXState {
    const { layer } = this;

    return layer && "effect" in layer ? (layer.loaded ? "ready" : "loading") : "disabled";
  }

  //----------------------------------
  //  statements
  //----------------------------------
}

export = LayerFXViewModel;
