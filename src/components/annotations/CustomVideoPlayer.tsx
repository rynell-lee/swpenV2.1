import React, { useState, useRef, forwardRef } from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
//@ts-ignore
// import Slider from "react-native-smooth-slider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//@ts-ignore
import { debounce } from "lodash";
import { Foundation } from "@expo/vector-icons";

interface props {
  videoUri: string;
  currentTime: number;
  setCurrentTime: Function;
  sliderValue: number;
  setSliderValue: Function;
  paused: boolean;
  setPaused: Function;
  justJumped: boolean;
  setJustJumped: Function;
  // ref: any;
}

const CustomVideoPlayer = forwardRef((props: props, ref) => {
  const videoUri = props.videoUri;
  const currentTime = props.currentTime;
  const setCurrentTime = props.setCurrentTime;
  const sliderValue = props.sliderValue;
  const setSliderValue = props.setSliderValue;
  const paused = props.paused;
  const setPaused = props.setPaused;
  const justJumped = props.justJumped;
  const setJustJumped = props.setJustJumped;
  const videoRef = ref;
  //   const [currentTime, setCurrentTime] = useState(0);
  //   const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  //   const [paused, setPaused] = useState(false);
  // const videoRef = useRef(null);

  const debouncedSeek = debounce((value: any) => {
    videoRef?.current.seek(value);
  }, 10); // Adjust debounce time (in ms) for desired smoothness

  ///testing stuff
  const [timer, setTimer] = useState(0);

  // const interval = setInterval(function () {
  //   setTimer(timer + 10); // increase timer by 10ms
  // }, 1000);

  /////
  const playOrpause = () => {
    if (!paused) {
      return (
        <View style={{ width: 20 }}>
          <TouchableOpacity onPress={() => setPaused(true)}>
            <Foundation name="pause" size={36} color="white" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ width: 20 }}>
          <TouchableOpacity onPress={() => setPaused(false)}>
            <Foundation name="play" size={36} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(Math.abs(seconds) / 3600);
    const m = Math.floor((Math.abs(seconds) % 3600) / 60);
    const s = Math.floor(Math.abs(seconds) % 60);

    const sign = seconds < 0 ? "-" : "";

    return h > 0
      ? `${sign}${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      : `${sign}${m.toString().padStart(2, "0")}:${s
          .toString()
          .padStart(2, "0")}`;
  };

  return (
    <View>
      <Video
        source={{
          uri: videoUri,
        }}
        ref={videoRef}
        onProgress={({ currentTime }) => {
          if (justJumped) {
            setJustJumped(false);
            videoRef?.current.seek(sliderValue);
          } else {
            setCurrentTime(currentTime);
            setSliderValue(currentTime);
          }
        }}
        onLoad={({ duration }) => setDuration(duration)}
        resizeMode="contain"
        paused={paused}
        style={styles.video}
      />
      <View style={styles.controls}>
        {playOrpause()}
        <Slider
          value={sliderValue}
          onValueChange={(value) => {
            setSliderValue(value);
            videoRef?.current.seek(value);
            setIsSliding(true);
          }}
          onSlidingComplete={(value) => {
            videoRef?.current.seek(value);
            setCurrentTime(value);
            setIsSliding(false);
          }}
          maximumValue={duration}
          style={styles.slider}
          step={0.01}
        />

        <Text style={styles.timer}>{formatTime(duration - sliderValue)}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 560,
    right: 110,
    // position: "absolute",
  },
  slider: {
    width: 900,
    height: 40,
    // position: "absolute",
    left: 15,
  },
  controls: {
    top: 40,
    flexDirection: "row",
    margin: 10,
    width: 950,
  },
  timer: {
    left: 15,
    top: 10,
    color: "white",
  },
});

export default CustomVideoPlayer;

// {/* <Slider
//         value={currentTime}

//         onValueChange={(value) => {
//           setCurrentTime(value);
//           // videoRef?.current.seek(value);
//           debouncedSeek(value);
//         }}
//         onSlidingComplete={(value) => videoRef?.current.seek(value)}
//         maximumValue={duration}
//         step={0.1}
//         style={{ width: "100%", height: 40 }}
//       /> */}

//       {/* <Button
//         title="Log Current Time"
//         onPress={() => {
//           console.log("Current time value:", currentTime);
//         }}
//       /> */}
