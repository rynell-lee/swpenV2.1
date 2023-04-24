import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import BackMarker from "../components/general/Back";
import { AVPlaybackStatus, Video } from "expo-av";
// import Scrubber from "react-native-scrubber";
import LoadVideo from "../components/annotations/LoadVideo";
// @ts-ignore
import VideoPlayer from "react-native-video-controls";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LapTable from "../components/annotations/LapTable";
import VideoControls from "../components/annotations/VideoControls";
import CustomVideoPlayer from "../components/annotations/CustomVideoPlayer";

interface props {
  video: string;
  route: {};
  params: {};
}
const AnnotationTest = (props: props) => {
  // const video = props.video;
  const videoRef = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [videoUri, setVideoUri] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [laps, setLaps] = useState<any>();

  const getData = async (key: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${key}`);
      console.log(jsonValue);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const [positionMillis, setPositionMillis] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleStatus = (status: any) => {
    console.log(status["positionMillis"]);
    setPositionMillis(status["positionMillis"]);
    // isLoaded
    //   ? setPositionMillis(status["positionMillis"])
    //   : setPositionMillis(0);
    // setStatus(() => status);
  };

  return (
    <View style={styles.background}>
      {videoUri != "" ? <CustomVideoPlayer /> : null}
      <View style={{ width: 60 }}>
        <BackMarker destination={"Review"} />
      </View>
      <View style={styles.panel}>
        <LoadVideo
          setVideo={setVideoUri}
          uri={videoUri}
          setLaps={setLaps}
          setDuration={setDuration}
        />
        {laps ? (
          <LapTable
            laps={laps}
            setValue={setValue}
            setIsPlaying={setIsPlaying}
          />
        ) : null}
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
    backgroundColor: "red",
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
  test: {
    width: 30,
  },
  scrubber: {
    top: 600,
    width: 800,
    left: 50,
  },
});
export default AnnotationTest;
