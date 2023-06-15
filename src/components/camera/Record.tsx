//code for recording videos
import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "react-native-vision-camera";

import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  lapArray: any[];
  timeObj: {};
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
  const timeObj = props.timeObj;

  const setStart = props.setStart;
  const setNow = props.setNow;
  const timeInterval = props.timeInterval;
  const setLapArray = props.setLapArray;
  const lapArray = props.lapArray;
  const setTimeInterval = props.setTimeInterval;

  //fucntion to start the timer of the screen
  const startTimer = () => {
    const now = new Date().getTime();
    setStart(now);
    setNow(now);
    setTimeInterval(
      setInterval(() => {
        setNow(new Date().getTime());
      }, 100)
    );
    // return stopwatch;
  };

  //function to stop timer
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

  //fucntion to generate a random key for saving purposes
  const generateKey = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
  const [newKey, setNewKey] = useState<string>();
  const [videoData, setVideoData] = useState<any>({});

  useEffect(() => {
    setNewKey(generateKey());
  }, []);

  //function to start recording, refer to react native vision camera for more information
  const startRecording = () => {
    setI(0);
    if (ready) {
      console.log("Start recording");
      setIsRecording(true);
      startTimer();
      camera?.startRecording({
        flash: onOrOff,
        onRecordingFinished: (video) => {
          // data here is on first render
          console.log("video data:", video);
          setVideoData(videoData);
          navigation.navigate("Review", { uri: video.path, key: newKey });
        },
        onRecordingError: (error) => console.error(error),
      });
    } else {
      console.log("Camera is not ready");
    }
  };

  //function to save the timings recorded with the random key generated
  const storeTimings = async (data: {}, key: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      // console.log("storing", jsonValue);
      await AsyncStorage.setItem(key, jsonValue);
      // alert("data saved");
    } catch (e) {
      // saving error
    }
  };

  //function to stop recording
  const stopRecording = () => {
    console.log("Stop recording");
    console.log(newKey);
    stopTimer();
    resetMarkers();
    setIsRecording(false);
    setLapArray([]);

    storeTimings(timeObj, newKey);
    camera?.stopRecording();
  };

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
