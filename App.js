import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet } from "react-native";

import ImageStorage from "./src/services/ImageStorage";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const filename = "image1.base64";

  const initializeAsync = async () => {
    const loadedImage = await ImageStorage.loadImageAsync(filename);
    if (loadedImage) setImage(loadedImage);
  };

  const handleCamera = async () => {
    const storedImage = await ImageStorage.storeImageAsync(filename, true);
    if (storedImage) setImage(storedImage);
  };

  const handleMediaLibrary = async () => {
    const storedImage = await ImageStorage.storeImageAsync(filename, false);
    if (storedImage) setImage(storedImage);
  };

  const handleDelete = async () => {
    await ImageStorage.deleteImageAsync(filename);
    setImage(null);
  };

  useEffect(() => {
    initializeAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Store Image (Camera)" onPress={handleCamera} />
      <Button
        title="Store Image (Media Library)"
        onPress={handleMediaLibrary}
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Delete image1.base64" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  image: { width: 200, height: 200 },
});
