import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const fileUri = FileSystem.documentDirectory + "image1.base64";

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);

      // const fileUri = FileSystem.documentDirectory + "image1.base64";
      await FileSystem.writeAsStringAsync(
        fileUri,
        "data:image/png;base64," + result.base64,
        {
          encoding: FileSystem.EncodingType.UTF8,
        }
      );
    }
  };

  const loadImage = async () => {
    const info = await FileSystem.getInfoAsync(fileUri);

    if (!info.exists) {
      console.log("File not exists (yet!)");
    } else {
      console.log("File found! loading base64 image...");

      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      setImage(base64);
    }
  };

  const deleteImage = async () => {
    await FileSystem.deleteAsync(fileUri);
    setImage(null);
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <Button title="Delete image1.base64" onPress={deleteImage} />
    </View>
  );
}
