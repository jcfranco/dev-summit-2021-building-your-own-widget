import Accessor from "esri/core/Accessor";
import Collection from "esri/core/Collection";
import Handles from "esri/core/Handles";
import { watch } from "esri/core/watchUtils";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { EffectLayer, LayerFXProperties, LayerEffectCollection, LayerFXState } from "./interfaces";
import LayerEffect from "./LayerEffect";

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
        values: [0, 0, 0]
      }),
      new LayerEffect({
        id: "blur",
        values: [0]
      }),
      new LayerEffect({
        id: "brightness",
        values: [100]
      }),
      new LayerEffect({
        id: "contrast",
        values: [100]
      }),
      new LayerEffect({
        id: "drop-shadow",
        values: [0, 0, 0]
      }),
      new LayerEffect({
        id: "grayscale",
        values: [0]
      }),
      new LayerEffect({
        id: "hue-rotate",
        values: [0]
      }),
      new LayerEffect({
        id: "invert",
        values: [0]
      }),
      new LayerEffect({
        id: "opacity",
        values: [100]
      }),
      new LayerEffect({
        id: "saturate",
        values: [100]
      }),
      new LayerEffect({
        id: "sepia",
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
    const { effects } = this;

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
