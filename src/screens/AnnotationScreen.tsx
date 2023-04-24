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
import { Video } from "expo-av";
import LoadVideo from "../components/annotations/LoadVideo";
// @ts-ignore
import VideoPlayer from "react-native-video-controls";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LapTable from "../components/annotations/LapTable";
import LineTool from "../components/annotations/LineTool";
//@ts-ignore
import { debounce } from "lodash";
import CustomVideoPlayer from "../components/annotations/CustomVideoPlayer";
import StrokeCounter from "../components/annotations/StrokeCounter";
import { useNavigation } from "@react-navigation/native";

interface props {
  video: string;
  route: {};
  params: {};
}
const AnnotationScreen = (props: props) => {
  const navigation = useNavigation<any>();

  const videoRef = useRef(null);
  // const video = props.video;
  const [videoUri, setVideoUri] = useState<string>("");
  // const [videoDuration, setVideoDuration] = useState<number>()
  const [id, setId] = useState<string>();
  const [laps, setLaps] = useState<any>();
  const [showLine, setShowLine] = useState<boolean>(false);
  const [paused, setPaused] = useState(false);
  const [distance, setDistance] = useState<any>("0M");
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [justJumped, setJustJumped] = useState(false);
  const [strokes, setStrokes] = useState(0);
  const [strokeObj, setStrokeObj] = useState<object>({});

  //process the lap object
  const formatObj = (obj: any) => {
    let arr = [];
    for (const marker in obj) {
      let newObj: any = {};
      newObj["marker"] = marker;
      newObj["time"] = obj[marker];
      arr.push(newObj);
    }
    const length = arr.length;
    // return [arr[length - 1], arr[length - 2], ...arr].splice(0, length);
    return arr;
  };

  const lapData = formatObj(laps);

  //data to pass to charts screen
  const chartData = {
    strokes: strokeObj,
    laps: lapData,
  };

  //toggle line

  const toggleLine = () => {
    setShowLine(!showLine);
  };

  // how
  // console.log(props.route);

  //

  const getData = async (key: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${key}`);
      console.log(jsonValue);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const onProgress = (data: { currentTime: React.SetStateAction<number> }) => {
    if (!isSeeking) {
      setCurrentTime(data.currentTime);
      // setIsPlaying(true);
    }
  };

  const onSeekStart = () => {
    setIsSeeking(true);
  };

  const onSeekEnd = () => {
    setIsSeeking(false);
    console.log("Scrubber moved to:", currentTime);
  };

  const timeFormat = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = (time % 60).toFixed(0);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // const onSeek = (data: { seekTime: React.SetStateAction<number> }) => {
  //   // setCurrentTime(data.seekTime);
  //   console.log("scrubber moved to:", data.seekTime);
  //   // setIsPlaying(true);
  // };

  return (
    <View style={styles.background}>
      {/* <Video
        style={styles.video}
        source={{ uri: video }}
        // useNativeControls
        // resizeMode="contain"
        // isLooping
      /> */}
      {videoUri != "" ? (
        <CustomVideoPlayer
          videoUri={videoUri}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          paused={paused}
          setPaused={setPaused}
          justJumped={justJumped}
          setJustJumped={setJustJumped}
          ref={videoRef}
        />
      ) : // <VideoPlayer
      //   ref={videoRef}
      //   source={{ uri: videoUri }}
      //   disableBack={true}
      //   disableFullscreen={true}
      //   style={styles.video}
      //   videoStyle={styles.videoOnly}
      //   scrubbing={10}
      //   seekColor={"red"}
      //   useTextureView={true}r
      //   // controlAnimationTiming={}
      //   // controlTimeout={10000}
      //   onProgress={onProgress}
      //   seekStart={onSeekStart}
      //   seekEnd={onSeekEnd}
      //   // progressUpdateInterval={10}
      //   // seek={value}
      //   paused={isPlaying}
      //   // setCurrentTime={value}
      //   // onSeek={onSeek}
      //   // onSlidingComplete={onSeek}
      // />
      null}
      {/* <View style={styles.back}>
        <BackMarker destination={"Review"} />
      </View> */}
      <View style={styles.panel}>
        <BackMarker destination={"Review"} />
        <LoadVideo setVideo={setVideoUri} uri={videoUri} setLaps={setLaps} />
        {/* <Button title="Charts" onPress={() => navigation.navigate("Chart")} /> */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chart", chartData)}
        >
          <Text style={styles.buttonText}>Chart</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.buttonLine}
          onPress={() => {
            toggleLine();
            console.log("line");
          }}
        >
          <Text style={styles.buttonText}>LINE TOOL</Text>
        </TouchableOpacity>
        <View style={styles.counter}>
          <StrokeCounter
            laps={laps}
            strokes={strokes}
            setStrokes={setStrokes}
            strokeObj={strokeObj}
            setStrokeObject={setStrokeObj}
          />
        </View>
        <View style={styles.table}>
          {laps ? (
            <LapTable
              setSliderValue={setSliderValue}
              laps={laps}
              lapData={lapData}
              setPaused={setPaused}
              setDistance={setDistance}
              setCurrentTime={setCurrentTime}
              setJustJumped={setJustJumped}
            />
          ) : null}
        </View>

        {/* <Button
          title="Line tool"
          onPress={() => {
            toggleLine();
            console.log("line");
          }}
        /> */}
        <View style={styles.refine}>
          <TouchableOpacity
            style={styles.buttonRefine}
            onPress={() => {
              // console.log(123);
              laps[distance] = timeFormat(sliderValue);
              console.log(laps);
              setLaps(laps);
              console.log(currentTime.toFixed(0));
            }}
          >
            <Text
              style={styles.buttonText}
            >{`Refine timestamp: ${distance}`}</Text>
          </TouchableOpacity>
          {/* <Button
            title={`Refine timestamp: ${distance}`}
            onPress={() => {
              // console.log(123);
              laps[distance] = timeFormat(sliderValue);
              console.log(laps);
              setLaps(laps);
              console.log(currentTime.toFixed(0));
            }}
          /> */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chart", chartData)}
        >
          <Text style={styles.buttonText}>Statistics</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            console.log(123);
          }}
        >
          <Text style={styles.refine}>Refine timestamp: {distance}</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.line}>{showLine ? <LineTool /> : null}</View>

      {/* <View style={styles.test}>
        <Button
          title={"check data"}
          onPress={() => {
            getData(id).then((data) => setData(data));
            console.log(data);
          }}
        />
      </View> */}
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
    width: 220,
    height: "150%",
    alignSelf: "flex-end",
    position: "absolute",
  },
  video: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    height: 650,
    width: 1000,
    left: 0,
    top: 0,
  },
  videoOnly: {
    // top: 0,
    height: 565,
    width: 995,
    position: "absolute",
    flex: 1,
  },
  load: { position: "absolute" },
  test: {
    width: 30,
  },
  line: {
    flex: 1,
    height: 565,
    width: 995,
    position: "absolute",
    // opacity: 0,
  },
  back: {
    position: "absolute",
    left: 980,
    top: 0,
    width: 60,
    height: 60,
    // flex: 1,
  },
  refine: {
    top: 160,
    // borderColor: "black",
    // borderWidth: 1,
    // // fontSize: 18,
    // // color: "yellow",
    // // height: 18,
    // position: "absolute",
    // flex: 1,
  },
  charts: {
    bottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    // position: "absolute",
    marginTop: 180,
    bottom: 80,
    right: 20,
    left: 2,
  },
  buttonLine: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    // position: "absolute",
    bottom: 80,
    right: 20,
    left: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonRefine: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    // position: "absolute",
    bottom: 80,
    right: 20,
    left: 2,
    marginTop: 80,
  },
  counter: {
    bottom: 80,
  },
  table: {
    bottom: 80,
  },
});
export default AnnotationScreen;
