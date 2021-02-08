# Enhancing Widget Steps

## Preface

Look at the `t9n` directory and its contents. Note that we have a message bundle for English and one for Spanish. These are the languages that our widget will support. 

## Wire up `LayerFX.tsx` with t9n message bundles

Open `LayerFX.tsx` and let's wire up the t9n bundles, so the widget can consume them based on the browser locale.

We'll use the `@messageBundle` decorator on the `messages` property. We'll be using `"esri/demo/app/t9n/LayerFX"` as the bundle's ID.    

```tsx
@property()
@messageBundle("esri/demo/app/t9n/LayerFX")
messages: Record<string, string>;
```

This will configure the widget to load a `LayerFX` messages bundle whenever the browser locale changes. Since we were using the `messages` for the UI labels, we no longer need to make any changes in the widget.

## Configure how `LayerFX.tsx` message bundles are fetched

Even though the widget is now set up to load our custom message bundles, the API doesn't know where to fetch them from. We'll do this next in `main.ts`.

You'll need to import the bundle loader and a utility for normalizing locales.

```ts
import { registerMessageBundleLoader, normalizeMessageBundleLocale } from "esri/intl";
```

Then, all you need to do is to configure the loader to fetch the custom message bundles:

```ts
// register message bundle loader for LayerFX messages
registerMessageBundleLoader({
  pattern: "esri/demo/app/",
  async fetchMessageBundle(bundleId, locale) {
    locale = normalizeMessageBundleLocale(locale as any);
    const relativePath = bundleId.replace("esri/demo/", "");
    const bundlePath = `./${relativePath}_${locale}.json`;
    const response = await fetch(bundlePath);
    return response.json();
  }
});
```

If we refresh our app, we'll see that our widget now displays the appropriate messages depending on the browser locale. 
