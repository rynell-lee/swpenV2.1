// code for camera screen
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  Camera,
  CameraPreset,
  useCameraDevices,
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

import eventJson from "../jsons/events.json";

interface Point {
  x: number;
  y: number;
}

interface props {
  dataObj: {};
  route: any;
}

const CameraScreen = ({ route }: any) => {
  const [permission, setPermission] = useState<boolean>(false);

  const { length, distance } = route.params;
  // console.log(length, distance);
  const ejson: any = eventJson;
  const distances = ejson[length][distance];
  // console.log(distances);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@metadata");
      // console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const [ready, SetReady] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      //getting phone permissions
      const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync();
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();

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

  //refer to react native visiion camera docs for more information
  //setting up device's camera
  const devices = useCameraDevices();
  const device = devices.back;

  //states for recording
  const [startRace, setStartRace] = useState<Boolean>(false);
  const [breakOut, setBreakOut] = useState<Boolean>(false);

  //states for settings
  const [flash, setFlash] = useState<Boolean>(false);
  //some presets for settings
  const [res, setRes] = useState<String>("FHD");
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [audio, setAudio] = useState<boolean>(true);
  const [course, setCourse] = useState<string>("25M");
  const [eventObj, setEventObj] = useState<any>({
    "Pool Length": course,
    Distance: distance,
  });
  const [distArray, setDistArray] = useState<Array<string>>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //states for timer
  const [start, setStart] = useState<number>(0);
  const [now, setNow] = useState<number>(0);
  const [lapArray, setLapArray] = useState<Array<any>>([]);
  const [timeInterval, setTimeInterval] = useState<any>();
  const [timeObj, setTimeObj] = useState({});
  //states for marker
  const [i, setI] = useState<number>(0);
  // const [current, setCurrent] = useState<any>();

  //determine resolution
  let resolution: CameraPreset | undefined;
  if (res === "HD") {
    resolution = "hd-1280x720";
  } else if (res === "FHD") {
    resolution = "hd-1920x1080";
  } else {
    resolution = "hd-3840x2160";
  }
  // console.log(`Resolution: ${resolution}`);

  //focus function, but does not work
  const focus = (event: any) => {
    try {
      let point: Point = {
        x: event.x,
        y: event.y,
      };
      console.log(point);
    } catch (err) {
      console.log(err);
    }
  };

  //useless function but here maybe for future use. it gets the x and y coordinate when tapping on screen
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(async (event: TapGestureHandlerEventPayload) => {
      // console.log(event);
      let point: Point = {
        x: event.x,
        y: event.y,
      };
      console.log(point);
    });
  //if statement if camera is denied..
  if (device === null || device === undefined) {
    return <LoadingScreen item={"Camera"} />;
  }

  //alot of self built components were exported and used here, refer to component files for code
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
            lapArray={lapArray}
            timeObj={timeObj}
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
            now={now}
            start={start}
            lapArray={lapArray}
            setLapArray={setLapArray}
            course={course}
            distances={distances}
            distArray={distArray}
            setTimeObj={setTimeObj}
          />
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
            course={course}
            setCourse={setCourse}
            // distance={distance}
            // setDistance={setDistance}
            toggleModal={toggleModal}
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
    left: "46%",
    top: 10,
    flex: 1,
    position: "absolute",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 50,
    // position: "absolute",
  },
  modalBox: {
    // position: "absolute",
    padding: 10,
    // paddingLeft: 100,
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    opacity: 1,
    width: 250,
    height: 200,
  },
  done: {
    fontSize: 20,
    alignSelf: "center",
  },
});

export default CameraScreen;
