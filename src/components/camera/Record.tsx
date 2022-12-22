import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "react-native-vision-camera";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";

// import Video from "react-native-video";

type props = {
  ready: Boolean;
  camera: Camera | null;
};
const RecordButton = (props: props) => {
  const ready = props.ready;
  const camera = props.camera;
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [video, setVideo] = useState<string>();
  const startRecording = () => {
    if (ready) {
      console.log("Start recording");
      setIsRecording(true);
      camera?.startRecording({
        flash: "off",
        onRecordingFinished: (video) => {
          console.log(video);
          setVideo(video.path); //video stored here
        },
        onRecordingError: (error) => console.error(error),
      });
    } else {
      console.log("Camera is not ready");
    }
  };
  const stopRecording = () => {
    console.log("Stop recording");
    setIsRecording(false);
    camera?.stopRecording();
  };

  if (video) {
    console.log("video recorded");
    //save video into library
    // MediaLibrary.saveToLibraryAsync(video).then(() => {
    //   setVideo(undefined);
    // });
    // return (
    //   <Video source={{ uri: video.path }} style={styles.backgroundVideo} />
    // );
  }
  return (
    <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
      {isRecording ? (
        <FontAwesome name="stop" size={80} color="red" />
      ) : (
        <FontAwesome name="dot-circle-o" size={80} color="red" />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});

export default RecordButton;
