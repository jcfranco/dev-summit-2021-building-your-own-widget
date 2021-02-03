# Writing a class

## Inspect

Let's start off by looking at some boilerplate for creating a module or class.

See `app/LayerFX.ts`
See `app/LayerEffect.ts`

This is the minimum required to create a class in 4x. All we're doing here is creating a class that extends `esri/core/Accessor`, which is the base of all 4x classes.

## LayerEffect

### Import dependencies

```ts
import { getEffectValueTypes } from "./layerFXUtils";
```

### Add props

```ts
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
```

### Add Private methods

```ts
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
```

## LayerFX

### Import dependencies

```ts
import Collection from "esri/core/Collection";
import Handles from "esri/core/Handles";
import { watch } from "esri/core/watchUtils";
import LayerEffect from "./LayerEffect";

const LayerEffectCollection = Collection.ofType(LayerEffect);
```

### Add vars

```ts
//--------------------------------------------------------------------------
//
//  Variables
//
//--------------------------------------------------------------------------

handles = new Handles();
```

### Add props

```ts
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
```

We've now implemented the properties from our API design. Properties defined this way can be watched for changes and initialized by a constructor object.

### Import missing interfaces

```
import `LayerEffectCollection` and `EffectLayer` from interfaces
```

### Add lifecycle methods for handles

```ts
initialize(): void {
  this.handles.add(watch(this, "statements", (statements) => (this.layer.effect = statements)));
}

destroy() {
  this.handles.removeAll();
  this.handles.destroy();
}
```

### Test out class

We have now implemented our class and we can test it in our demo page.

```js
// should throw an error
itemScore.load();
```

```js
// should set itemId
itemScore.itemId = "f5a89635bb394f7da2f9c82cdd73e459";
```

```js
// should load() item and have all props
itemScore.load();
```
