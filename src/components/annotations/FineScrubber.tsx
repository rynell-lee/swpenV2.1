//attempt at building a fine scrubbing slider, not working hence not in use
import React, { useState, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import Video from "react-native-video";
import { PanGestureHandler } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";

const FineScrubber = ({ videoSource, style }: any) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const videoRef = useRef(null);

  const onGestureEvent = (event: { nativeEvent: { x: any } }) => {
    const { x } = event.nativeEvent;
    const scrubbedTime = (x / style.width) * duration;
    videoRef?.current.seek(scrubbedTime);
  };

  const onLoad = (data: { duration: React.SetStateAction<number> }) => {
    setDuration(data.duration);
  };

  const onProgress = (data: { currentTime: React.SetStateAction<number> }) => {
    if (!isSliding) {
      setCurrentTime(data.currentTime);
    }
  };

  const onSlidingStart = () => {
    setIsSliding(true);
  };

  const onSlidingComplete = (value: React.SetStateAction<number>) => {
    videoRef?.current.seek(value);
    setCurrentTime(value);
    setIsSliding(false);
  };

  return (
    <View style={style}>
      <Video
        source={{ uri: videoSource }}
        style={StyleSheet.absoluteFill}
        ref={videoRef}
        onLoad={onLoad}
        onProgress={onProgress}
        resizeMode="contain"
        // paused
      />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onValueChange={setCurrentTime}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
      />
      <Text style={styles.timeLabel}>{currentTime.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeLabel: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: "white",
    fontSize: 16,
  },
  slider: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 40,
  },
});

export default FineScrubber;
