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
import AsyncStorage from "@react-native-async-storage/async-storage";

interface props {
  setVideo: Function;
  uri: string;
  setLaps: Function;
}
const LoadVideo = (props: props) => {
  const setVideo = props.setVideo;
  const videoUri = props.uri;
  const setLaps = props.setLaps;

  const getData = async (key: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${key}`);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      console.log(result.assets[0]);
      getData(result.assets[0].assetId).then((data) => {
        console.log(data);
        setLaps(data.time);
      });
    }
  };

  return (
    <View style={styles.load}>
      <TouchableOpacity
        onPress={() => {
          pickImage();
        }}
        style={styles.button}
      >
        {/* <MaterialCommunityIcons
          name="rectangle-outline"
          size={140}
          color="black"
        /> */}
        <Text style={styles.buttonText}>Load video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  load: {
    // position: "absolute",
    // backgroundColor:'white',
    // top: 10,
    bottom: 80,
    alignItems: "center",
    // paddingBottom: 100,
    marginTop: 20,
    // justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    position: "absolute",
    top: 62,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    // position: "absolute",
    bottom: 35,
    marginTop: 40,
    // right: 20,
    left: 30,
  },
});

export default LoadVideo;

// {"albumId": "-2075821635", "creationTime": 1677847775000, "duration": 2.307, "filename": "VisionCamera-20230303_2049331716465144711582032.mp4", "height": 1080, "id": "1000000504", "mediaType": "video", "modificationTime": 1677847776000, "uri": "file:///storage/emulated/0/DCIM/VisionCamera-20230303_2049331716465144711582032.mp4", "width": 1920}

// {"assetId": "1000000504", "base64": null, "duration": 2307, "exif": null, "height": 1080, "rotation": 0, "type": "video", "uri": "file:///data/user/0/com.ssi.swpencamera/cache/ImagePicker/be5a8567-33fc-4a30-b2af-626de62b316b.mp4", "width": 1920}
