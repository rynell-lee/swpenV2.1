// code for annotation screen
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import BackMarker from "../components/general/Back";
import LoadVideo from "../components/annotations/LoadVideo";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import LapTable from "../components/annotations/LapTable";
import LineTool from "../components/annotations/LineTool";
//@ts-ignore
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
  const [videoUri, setVideoUri] = useState<string>("");
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

  //process the lap object, basically destructuring the code from camera screen
  const formatObj = (obj: any) => {
    let arr = [];
    for (const marker in obj) {
      let newObj: any = {};
      newObj["marker"] = marker;
      newObj["time"] = obj[marker];
      arr.push(newObj);
    }
    const length = arr.length;
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

  // this function is used to read data saved in asyncstorage
  const getData = async (key: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${key}`);
      console.log(jsonValue);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  //code not in use, was intitally used for scrubbing purposes
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

  //function to format time on screen
  const timeFormat = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = (time % 60).toFixed(0);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  //refer to component files for code
  return (
    <View style={styles.background}>
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
      ) : null}

      <View style={styles.panel}>
        <BackMarker destination={"Review"} />
        <LoadVideo setVideo={setVideoUri} uri={videoUri} setLaps={setLaps} />

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
            currentTime={currentTime}
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

        <View style={styles.refine}>
          <TouchableOpacity
            style={styles.buttonRefine}
            onPress={() => {
              // console.log(123);
              laps[distance] = timeFormat(sliderValue);
              console.log(laps);
              setLaps(laps);
              console.log(currentTime.toFixed(0));
              console.log(lapData);
            }}
          >
            <Text
              style={styles.buttonText}
            >{`Refine timestamp: ${distance}`}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chart", chartData)}
        >
          <Text style={styles.buttonText}>Statistics</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}>{showLine ? <LineTool /> : null}</View>
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
    top: 115,
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
    marginTop: 125,
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
    bottom: 100,
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
    bottom: 120,
  },
  table: {
    bottom: 130,
  },
});
export default AnnotationScreen;
