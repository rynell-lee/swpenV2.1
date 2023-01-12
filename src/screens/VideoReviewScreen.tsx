import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { set } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";

type props = {
  video: String;
  name: String;
  route: {};
  params: {};
};
const VideoReviewScreen = (props: props) => {
  const navigation = useNavigation<any>();
  const [video, setVideo] = useState<String>(props.route.params.video.path);
  // const video = props.route.params.video.path; // figure out ltr

  const discard = () => {
    setVideo("undefined");
    navigation.navigate("Camera");
  };
  console.log(`video uri: ${video}`);
  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Button title="Discard" onPress={() => discard()} />
        <Button
          title="Annotate"
          onPress={() => navigation.navigate("Annotationhahaha")}
        />
      </View>
      <Video
        style={styles.video}
        source={{ uri: video }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  texts: {
    // backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  discard: {
    // left: 20,
    // fontSize: 18,
    // alignSelf: "flex-start",
  },
  annotate: {
    // position: "relative",
    // right: 20,
    // bottom: 10,
    // fontSize: 18,
    // alignSelf: "flex-end",
  },
});

export default VideoReviewScreen;
