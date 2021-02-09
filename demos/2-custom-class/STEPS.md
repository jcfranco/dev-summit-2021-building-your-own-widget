# Writing a class

## Inspect

Let's start off by looking at some boilerplate for creating a module or class.

- View `app/LayerFX.ts`
- View `app/LayerEffect.ts`

These have the minimum required to create a class in 4x. All we're doing here is creating a class that extends `esri/core/Accessor`, which is the base of all 4x classes.

## LayerEffect.ts

### Add Lifecycle

```ts
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

constructor(props?: LayerEffectProperties) {
  super(props);
}
```

### Import dependencies

```ts
import { LayerEffectProperties } from "./interfaces";
import { getEffectValueTypes } from "./layerFXUtils";
```

### Add properties

```ts
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
  // returns the unit, and min & max values for the effect.
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
  const statement = this.valueTypes
      .filter((valueType, index) => typeof value[index] === "number")
      .map((valueType, index) => `${value[index]}${valueType.unit}`)
      .join(",");

  // bloom(50%, 12px, 50%)
  return `${effectId}(${statement})`;
}
```

## LayerFX.ts

### Add Lifecycle

```ts
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

constructor(props?: LayerFXProperties) {
  super(props);
}
```

### Import dependencies

```ts
import { LayerFXProperties } from "./interfaces";
import Collection from "esri/core/Collection";
import Handles from "esri/core/Handles";
import { watch } from "esri/core/watchUtils";
import LayerEffect from "./LayerEffect";
```

### Create collection

```ts
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
  return this._get("effects") ||  new LayerEffectCollection([
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

- import `LayerEffectCollection` from interfaces
- import `EffectLayer` from interfaces

### Add lifecycle methods for handles

```ts
initialize(): void {
  // layer.effect = "bloom(50%, 12px, 50%)"
  this.handles.add(watch(this, "statements", (statements) => (this.layer.effect = statements)));
}

destroy() {
  this.handles.removeAll();
  this.handles.destroy();
}
```

### Test out classes

We have now implemented our classes and we can test it in our demo page.

#### LayerEffect

Inspect the layerEffect class

```js
layerEffect;
```

Change the ID on the class

```js
layerEffect.id = "bloom";
```

View the class again

```js
layerEffect;
```

#### LayerFX

Inspect the layerFX class

```js
layerFX;
```

Enable the first item and set values.

```js
layerFX.effects.getItemAt(0).enabled = true;
layerFX.effects.getItemAt(0).values = [10, 20, 30];
```

View statements

```js
layerFX.statements;
```

Enable the second item and set values.

```js
layerFX.effects.getItemAt(1).enabled = true;
layerFX.effects.getItemAt(1).values = [10];
```

View statements

```js
layerFX.statements;
```
