import React, { useState, useEffect, useRef, useMemo } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Box, Row, Center, Column } from "native-base";
import {
  Camera,
  CameraDeviceFormat,
  CameraPreset,
  CameraRuntimeError,
  useCameraDevices,
  useFrameProcessor,
} from "react-native-vision-camera";
import LoadingScreen from "./LoadingScreen";
import { useIsForeground } from "../hooks/useIsForeground";
import RecordButton from "../components/camera/Record";
import DistanceMarker from "../components/camera/DistanceMarker";
import ExitMarker from "../components/camera/Exit";
import EndMarker from "../components/camera/EndMarker";
import Timer from "../components/camera/Timer";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { NavigatorProps } from "../../App";
import { useIsFocused } from "@react-navigation/native";
import Settings from "../components/camera/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Point {
  x: number;
  y: number;
}

interface props {
  dataObj: {};
  route: any;
}

const CameraScreen = (props: props) => {
  const [permission, setPermission] = useState<boolean>(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@metadata");
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const [length, setLength] = useState<string>("");
  // console.log(length);
  // console.log("async storage: ", data);
  // const length = "Short Course";

  const [ready, SetReady] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync();
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      //getdata
      getData().then((data) => setLength(data["Pool Length"]));
      //
      if (
        cameraPermission !== "authorized" &&
        microphonePermission !== "authorized" &&
        mediaLibraryPermission.status !== "granted"
      ) {
        const newCameraPermission = await Camera.requestCameraPermission();
        const newMicrophonePermission =
          await Camera.requestMicrophonePermission();
        const newMediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();
        setPermission(
          newCameraPermission === "authorized" &&
            newMicrophonePermission === "authorized" &&
            newMediaLibraryPermission.status === "granted"
        );
      } else {
        setPermission(
          cameraPermission === "authorized" &&
            microphonePermission === "authorized" &&
            mediaLibraryPermission.status === "granted"
        );
      }
    })();
  }, [setPermission]);

  //maybe can do some linking here to settings

  // console.log(`Permission granted: ${permission}`);
  const devices = useCameraDevices();
  const device = devices.back;
  // console.log(device?.formats[0].frameRateRanges);
  // console.log(` Does device support focus: ${device?.supportsFocus}`);
  const isAppForeground = useIsForeground();
  //right now using preset of 'high', temper with this next time when need to select res or framerate properly
  //specify funtion for muting !!

  //states for recording
  const [startRace, setStartRace] = useState<Boolean>(false);
  const [breakOut, setBreakOut] = useState<Boolean>(false);

  //states for settings
  const [flash, setFlash] = useState<Boolean>(false);
  const [res, setRes] = useState<String>("FHD");
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [audio, setAudio] = useState<boolean>(true);
  // console.log(`is flash on: ${flash}`);

  //states for timer
  const [start, setStart] = useState<number>(0);
  const [now, setNow] = useState<number>(0);
  const [lapArray, setLapArray] = useState<Array<any>>([
    [1, 1],
    [3, 3],
  ]);
  const [timeInterval, setTimeInterval] = useState<any>();
  //states for marker
  const [i, setI] = useState<number>(0);
  // const [current, setCurrent] = useState<any>();

  //determine res
  let resolution: CameraPreset | undefined;
  if (res === "HD") {
    resolution = "hd-1280x720";
  } else if (res === "FHD") {
    resolution = "hd-1920x1080";
  } else {
    resolution = "hd-3840x2160";
  }
  // console.log(`Resolution: ${resolution}`);

  const focus = (event: any) => {
    try {
      let point: Point = {
        x: event.x,
        y: event.y,
      };
      console.log(point);
      // return await cameraRef.current?.focus(point);
    } catch (err) {
      console.log(err);
    }
  };
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(async (event: TapGestureHandlerEventPayload) => {
      // console.log(event);
      let point: Point = {
        x: event.x,
        y: event.y,
      };
      console.log(point);
      // try {
      //   // cameraRef.current?.focus(point);
      // } catch (err) {
      //   console.error(err);
      // }
    });
  //if statement if camera is denied..
  if (device === null || device === undefined) {
    return <LoadingScreen item={"Camera"} />;
  }
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isFocused}
            preset={resolution}
            zoom={0}
            video={true}
            audio={audio}
            enableZoomGesture={true}
            onInitialized={() => SetReady(true)}
            onError={(error) => {
              console.log(error);
            }}
          />
        </GestureDetector>
        <View style={styles.record}>
          <RecordButton
            ready={ready}
            camera={cameraRef.current}
            flash={flash}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            setI={setI}
            timeInterval={timeInterval}
            setTimeInterval={setTimeInterval}
            setStart={setStart}
            setNow={setNow}
            setStartRace={setStartRace}
            setBreakOut={setBreakOut}
            setLapArray={setLapArray}
          />
        </View>
        <View style={styles.distance}>
          <DistanceMarker
            isRecording={isRecording}
            length={length}
            i={i}
            setI={setI}
            startRace={startRace}
            setStartRace={setStartRace}
            breakOut={breakOut}
            setBreakOut={setBreakOut}
            timeInterval={timeInterval}
            setTimeInterval={setTimeInterval}
            setStart={setStart}
            setNow={setNow}
            lapArray={lapArray}
            setLapArray={setLapArray}
          />
          {/* <EndMarker isRecording={isRecording} /> */}
        </View>
        <View style={styles.exit}>
          <ExitMarker isRecording={isRecording} />
        </View>
        <View style={styles.settings}>
          <Settings
            flash={flash}
            setFlash={setFlash}
            res={res}
            setRes={setRes}
            isRecording={isRecording}
            audio={audio}
            setAudio={setAudio}
          />
        </View>
      </GestureHandlerRootView>
      <View style={styles.timer}>
        <Timer
          now={now}
          start={start}
          isRecording={isRecording}
          lapArray={lapArray}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  record: {
    // backgroundColor: "white",
    alignSelf: "flex-end",
    top: "43%",
    right: 20,
  },
  distance: {
    // backgroundColor: "white",
    alignSelf: "flex-end",
    top: "60%",
    right: 20,
  },
  exit: {
    // backgroundColor: "white",
    bottom: "10%",
    width: 60,
    left: 10,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  settings: {
    alignSelf: "flex-end",
    bottom: "10%",
    right: 20,
  },
  timer: {
    // left: "46%",
    top: 10,
    flex: 1,
    position: "absolute",
  },
});

export default CameraScreen;
