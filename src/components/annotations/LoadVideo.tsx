import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface props {
  setVideo: Function;
}
const LoadVideo = (props: props) => {
  // const [video, setVideo] = useState<string>("");
  const setVideo = props.setVideo;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      // console.log(video);
    }
  };

  return (
    <View style={styles.load}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      <TouchableOpacity onPress={pickImage}>
        <MaterialCommunityIcons
          name="rectangle-outline"
          size={140}
          color="black"
        />
        <Text style={styles.text}>Load video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  load: {
    // position: "absolute",
    // top: 10,
    alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    position: "absolute",
    top: 62,
  },
});

export default LoadVideo;
