import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const storeImageAsync = async (filename, camera = true) => {
  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  };

  let result = null;

  if (camera) {
    result = await ImagePicker.launchCameraAsync(options);
  } else {
    result = await ImagePicker.launchImageLibraryAsync(options);
  }

  if (!result.cancelled) {
    const base64 = "data:image/png;base64," + result.base64;
    const fileUri = FileSystem.documentDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    return base64;
  }

  return null;
};

const loadImageAsync = async (filename) => {
  const fileUri = FileSystem.documentDirectory + filename;
  const info = await FileSystem.getInfoAsync(fileUri);

  if (!info.exists) {
    console.log(`File ${filename} not exists (yet!)`);
  } else {
    console.log(`File ${filename} found! loading base64 image...`);

    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    return base64;
  }

  return null;
};

const deleteImageAsync = async (filename) => {
  const fileUri = FileSystem.documentDirectory + filename;
  await FileSystem.deleteAsync(fileUri);
};

const ImageStorage = {
  storeImageAsync,
  loadImageAsync,
  deleteImageAsync,
};

export default ImageStorage;
