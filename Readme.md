# Expo ImagePicker Example

## Setup

Install expo-image-picker:

`$ expo install expo-image-picker`

Install expo-file-system:

`$ expo install expo-file-system`

Configure plugin in `app.json`:

```js
{
  "expo": {
    ...
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ]
  }
}
```
