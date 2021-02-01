import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import Handles = require("esri/core/Handles");
import { watch } from "esri/core/watchUtils";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { EffectLayer, LayerFXProperties, LayerEffectCollection, LayerFXState } from "./interfaces";
import LayerEffect = require("./LayerEffect");

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
    this.handles.add(watch(this, "statements", (statements) => (this.layer.effect = statements)));
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
    return new LayerEffectCollection([
      new LayerEffect({
        id: "bloom",
        name: "Bloom",
        values: [0, 0, 0]
      }),
      new LayerEffect({
        id: "blur",
        name: "Blur",
        values: [0]
      }),
      new LayerEffect({
        id: "brightness",
        name: "Brightness",
        values: [100]
      }),
      new LayerEffect({
        id: "contrast",
        name: "Contrast",
        values: [100]
      }),
      new LayerEffect({
        id: "drop-shadow",
        name: "Drop shadow",
        values: [0, 0, 0]
      }),
      new LayerEffect({
        id: "grayscale",
        name: "Grayscale",
        values: [0]
      }),
      new LayerEffect({
        id: "hue-rotate",
        name: "Hue rotate",
        values: [0]
      }),
      new LayerEffect({
        id: "invert",
        name: "Invert",
        values: [0]
      }),
      new LayerEffect({
        id: "opacity",
        name: "Opacity",
        values: [100]
      }),
      new LayerEffect({
        id: "saturate",
        name: "Saturate",
        values: [100]
      }),
      new LayerEffect({
        id: "sepia",
        name: "Sepia",
        values: [0]
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
  get state(): LayerFXState {
    const { layer } = this;
    const supportedLayer = layer && "effect" in layer;

    return supportedLayer ? (layer.loaded ? "ready" : "loading") : "disabled";
  }

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
          .filter((effect) => effect.enabled)
          .map((effect) => effect.statement)
          .toArray()
          .join("\n")
      : null;
  }
}

export = LayerFXViewModel;
