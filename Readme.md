# Expo ImagePicker with Local FileSystem Storage

This example uses ImagePicker to get images from Camera or MediaLibrary and store them on expo FileSystem.

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

# Usage

Get 'ImageStorage.js` from [src/services/ImageStorage.js](src/services/ImageStorage.js)

To **load** saved image from FileSystem (returns base64 image or null if filename not exists):

`const loadedImage = await ImageStorage.loadImageAsync(filename);`

To **get and store** an image from Camera to FileSystem (returns base64 image or null if failed):

`const storedImage = await ImageStorage.storeImageAsync(filename, true);`

To **get and store** an image from MediaLibrary to FileSystem (returns base64 image or null if failed):

`const storedImage = await ImageStorage.storeImageAsync(filename, false);`

To **delete** a saved image:

`await ImageStorage.deleteImageAsync(filename);`

Check [App.js](App.js) for complete example.
