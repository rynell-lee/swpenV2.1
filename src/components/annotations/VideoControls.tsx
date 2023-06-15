//not in use, but this is another example of trying to build a smooth scrubber
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Scrubber from "react-native-scrubber";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

interface props {
  duration: number;
  value: number;
  isPlaying: boolean;
  setIsPlaying: Function;
  videoRef: any;
}
const VideoControls = (props: props) => {
  const duration = props.duration;
  const value = props.value;
  const isPlaying = props.isPlaying;
  const setIsPlaying = props.setIsPlaying;
  const videoRef = props.videoRef;

  const playOrpause = () => {
    if (isPlaying) {
      return (
        <View>
          <TouchableOpacity onPress={() => setIsPlaying(false)}>
            <Foundation name="pause" size={36} color="white" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={() => setIsPlaying(true)}>
            <Foundation name="play" size={36} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.controls}>
      {playOrpause()}
      <View style={styles.scrubber}>
        <Scrubber
          value={value / 1000} //position
          onSlide={() => console.log("scrub")}
          onSlidingStart={() => console.log("scrub")}
          onSlidingComplete={() => console.log("scrub")}
          totalDuration={duration / 1000}
          trackColor="#666"
          scrubbedColor="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    top: 600,
    width: 800,
    left: 50,
    flexDirection: "row",
    pointerEvents: "none",
  },
  scrubber: {
    width: 800,
    top: 15,
    left: 40,
    position: "absolute",
  },
});

export default VideoControls;
