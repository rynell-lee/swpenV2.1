import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "react-native-vision-camera";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { NavigatorProps } from "../../../App";
import { useNavigation } from "@react-navigation/native";

// import Video from "react-native-video";

type props = {
  ready: Boolean;
  camera: Camera | null;
  flash: Boolean;
  isRecording: Boolean;
  setIsRecording: Function;
  setI: Function;
  timeInterval: any;
  setTimeInterval: Function;
  setStart: Function;
  setNow: Function;
  setStartRace: Function;
  setBreakOut: Function;
  setLapArray: Function;
};
const RecordButton = (props: props) => {
  const navigation = useNavigation<any>(); //check the data type next time
  const ready = props.ready;
  const camera = props.camera;
  const flash = props.flash;
  const setI = props.setI;
  const onOrOff = flash ? "on" : "off";
  // const [isRecording, setIsRecording] = useState<Boolean>(false);
  const isRecording = props.isRecording;
  const setIsRecording = props.setIsRecording;
  const setStartRace = props.setStartRace;
  const setBreakOut = props.setBreakOut;
  const [video, setVideo] = useState<string>();

  //timer function
  //will be left here maybe i can use a timer to record total length of video too
  const setStart = props.setStart;
  const setNow = props.setNow;
  const timeInterval = props.timeInterval;
  const setLapArray = props.setLapArray;
  // const setTimeInterval = props.setTimeInterval;
  // const startTimer = () => {
  //   const now = new Date().getTime();
  //   setStart(now);
  //   setNow(now);
  //   setTimeInterval(
  //     setInterval(() => {
  //       setNow(new Date().getTime());
  //     }, 100)
  //   );
  //   // return stopwatch;
  // };
  const stopTimer = () => {
    clearInterval(timeInterval);
    setStart(0);
    setNow(0);
  };

  //reset distance markers
  const resetMarkers = () => {
    setStartRace(false);
    setBreakOut(false);
    setI(0);
  };

  const startRecording = () => {
    setI(0);
    if (ready) {
      console.log("Start recording");
      setIsRecording(true);
      // startTimer();
      camera?.startRecording({
        flash: onOrOff,
        onRecordingFinished: (video) => {
          console.log(video);
          setVideo(video.path); //video stored here
          navigation.navigate("Review", { video });
        },
        onRecordingError: (error) => console.error(error),
      });
    } else {
      console.log("Camera is not ready");
    }
  };
  const stopRecording = () => {
    console.log("Stop recording");
    stopTimer();
    resetMarkers();
    setIsRecording(false);
    setLapArray([]);
    camera?.stopRecording();
  };

  //find a way to hide settings

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
const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default RecordButton;
