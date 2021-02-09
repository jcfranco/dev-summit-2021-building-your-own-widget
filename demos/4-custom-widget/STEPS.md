# Custom Widget Steps

## Preface

This demo picks up after our previous two. Notice how we have all of the classes from the custom class demo as well as a simple starter widget. 

## Repurposing `LayerFX.ts` as our ViewModel

`LayerFX.ts` has all of the business logic that we want out of our widget, so let's reuse it. We'll rename it to `LayerFXViewModel.ts`.

The only change we'll make here is add a `state` prop for the View to know when it's ready for interaction.

```ts
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
```

## Beefing up our widget

If you look at `LayerFX.tsx`, you'll see that we have a barebones widget, similar to what we did in the previous demo. 
It's set up to take the base widget properties and to render a div with Hello World as its content.

First off, I'll want to add some properties that we'll be using when we render our widget's UI.

```ts
  //----------------------------------
  //  layer
  //----------------------------------
  
  @aliasOf("viewModel.layer")
  layer: EffectLayer;
  
  //----------------------------------
  //  messages
  //----------------------------------
  
  @property()
  messages: Record<string, string> = messages;
  
  //----------------------------------
  //  viewModel
  //----------------------------------
  
  @property()
  viewModel: LayerFXViewModel = new LayerFXViewModel();
```

After this, we'll need to update the constructor to allow setting these props. Luckily, we already have an interface that merges the LayerFX class props with the base widget ones.

```ts
  constructor(props?: LayerFXWidgetProperties) {
    super(props);
  }
```
   
Next, we'll move onto rendering. Let's add our main render method.

```tsx
  render() {
    const { effects } = this.viewModel;
  
    return (
      <div class={this.classes(CSS.root, CSS.esriWidget, CSS.esriWidgetPanel)}>
        <h2>{this.messages.title}</h2>
        <p>{this.messages.summary}</p>
        <div class={CSS.container}>{effects.map(this.renderEffect).toArray()}</div>
      </div>
    );
  }
```

Next we have supporting render methods to make them easier to manage.

```tsx
  protected renderEffect = (effect: LayerEffect) => {
    return (
      <fieldset class={this.classes({[CSS.disabledEffect]: !effect.enabled})}>
        <legend>{this.renderEffectEnabledLabel(effect)}</legend>
        {this.renderEffectValues(effect)}
      </fieldset>
    );
  };
  
  protected renderEffectEnabledLabel = (effect: LayerEffect) => {
    const { enabled } = effect;
  
    return (
      <label>
        {this.messages[effect.id]}
        <input
          class={CSS.checkbox}
          type="checkbox"
          checked={enabled}
          onchange={(event: Event) => this.updateEnabled(event, effect)}
        />
      </label>
    );
  };
  
  protected renderEffectValues = (effect: LayerEffect) => {
    return effect.values?.map((value, index) => this.renderEffectValue(effect, value, index));
  };
  
  protected renderEffectValue = (effect: LayerEffect, value: number, index: number) => {
    const { valueTypes, enabled } = effect;
    const valueType = valueTypes[index];
    const { min, max, id } = valueType;
  
    return this.renderEffectSliderLabel({
      enabled,
      name: id ? this.messages[id] : this.messages.value,
      min,
      max,
      value,
      oninput: (event: Event) => this.updateValue(event, effect, index)
    });
  };
  
  protected renderEffectSliderLabel = ({
                                         enabled,
                                         name,
                                         min,
                                         max,
                                         value,
                                         oninput
                                       }: {
    enabled: boolean;
    value: number;
    min: number;
    max: number;
    name: string;
    oninput: (event: Event) => void;
  }) => {
    return (
      <label>
        {name}:
        <input
          class={CSS.slider}
          disabled={!enabled}
          type="range"
          min={min}
          max={max}
          value={value}
          oninput={oninput}
        />
      </label>
    );
  };
```

Finally, we have some event handlers for updating the values of our checkboxes and sliders when the user interacts with them

```ts
   private updateEnabled = (event: Event, effect: LayerEffect) => {
    const target = event.currentTarget as HTMLInputElement;
    effect.enabled = target.checked;
  };
  
  private updateValue = (event: Event, effect: LayerEffect, index: number) => {
    const target = event.currentTarget as HTMLInputElement;
    const value = effect.values.slice();
    value[index] = target.valueAsNumber;
    effect.values = value;
  };
```

This wraps up our custom widget and we can take it for a spin.
