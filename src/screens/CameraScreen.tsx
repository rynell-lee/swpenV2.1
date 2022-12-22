import React, { useState, useEffect, useRef, useMemo } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Box, Row, Center, Column } from "native-base";
import {
  Camera,
  CameraDeviceFormat,
  CameraRuntimeError,
  useCameraDevices,
  useFrameProcessor,
} from "react-native-vision-camera";
import LoadingScreen from "./LoadingScreen";
import { useIsForeground } from "../hooks/useIsForeground";
import RecordButton from "../components/camera/Record";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import DistanceMarker from "../components/camera/DistanceMarker";
import * as MediaLibrary from "expo-media-library";

interface Point {
  x: number;
  y: number;
}

const CameraScreen = () => {
  const [permission, setPermission] = useState<boolean>(false);
  // const [mediaPermission, setMediaPermission] = useState<boolean>(false);
  const [ready, SetReady] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      if (
        cameraPermission !== "authorized" &&
        microphonePermission !== "authorized"
      ) {
        const newCameraPermission = await Camera.requestCameraPermission();
        const newMicrophonePermission =
          await Camera.requestMicrophonePermission();
        // const mediaLibraryPermission =
        //   await MediaLibrary.requestPermissionsAsync();
        setPermission(
          newCameraPermission === "authorized" &&
            newMicrophonePermission === "authorized"
        );
      } else {
        setPermission(
          cameraPermission === "authorized" &&
            microphonePermission === "authorized"
        );
      }
      // const devices = await Camera.getAvailableCameraDevices();
      // console.log(devices[0].devices);
    })();
  }, [setPermission]);

  //maybe can do some linking here to settings

  // console.log(`Permission granted: ${permission}`);
  const devices = useCameraDevices();
  const device = devices.back;
  console.log(` Does device support focus: ${device?.supportsFocus}`);
  const isAppForeground = useIsForeground();
  //right now using preset of 'high', temper with this next time when need to select res or framerate properly
  //specify funtion for muting !!

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
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isAppForeground}
          preset="high"
          video={true}
          audio={true}
          enableZoomGesture={true}
          onInitialized={() => SetReady(true)}
          onError={(error) => {
            console.log(error);
          }}
        />
      </GestureDetector>
      <View style={styles.record}>
        <RecordButton ready={ready} camera={cameraRef.current} />
      </View>
      <View>
        <DistanceMarker />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  record: {
    // backgroundColor: "white",
    alignSelf: "flex-end",
    top: "40%",
    right: 10,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default CameraScreen;
