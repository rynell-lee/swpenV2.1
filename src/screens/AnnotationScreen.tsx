import React, { useState, useEffect, useRef, useMemo } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import BackMarker from "../components/general/Back";
import { Video } from "expo-av";
import LoadVideo from "../components/annotations/LoadVideo";
// @ts-ignore
import VideoPlayer from "react-native-video-controls";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";

interface props {
  video: string;
}
const AnnotationScreen = (props: props) => {
  // const video = props.video;
  const [video, setVideo] = useState<string>("");

  //

  return (
    <View style={styles.background}>
      {/* <Video
        style={styles.video}
        source={{ uri: video }}
        // useNativeControls
        // resizeMode="contain"
        // isLooping
      /> */}
      {video != "" ? (
        <VideoPlayer
          source={{ uri: video }}
          disableBack={true}
          style={styles.video}
          scrubbing={120}
        />
      ) : null}
      <View style={{ width: 60 }}>
        <BackMarker destination={"Review"} />
      </View>

      <View style={styles.panel}>
        <LoadVideo setVideo={setVideo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "black",
    flex: 1,
  },
  panel: {
    backgroundColor: "grey",
    width: 210,
    height: "150%",
    alignSelf: "flex-end",
    position: "absolute",
  },
  video: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    height: 680,
    width: 1000,
    left: 0,
    top: 0,
  },
  load: { position: "absolute" },
});
export default AnnotationScreen;
