//not in use, but this is another example of trying to build a smooth scrubber

import React, { useState } from "react";
import { View, StyleSheet, PanResponder, Animated } from "react-native";

const VideoScrubber = ({ onScrubbing, onScrubbingEnd }) => {
  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        onScrubbing(gestureState.x0);
      },
      onPanResponderMove: (evt, gestureState) => {
        onScrubbing(gestureState.moveX);
      },
      onPanResponderRelease: (evt, gestureState) => {
        onScrubbingEnd(gestureState.moveX);
      },
    })
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.scrubber,
          { transform: [{ translateX: new Animated.Value(0) }] },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    marginHorizontal: 10,
    backgroundColor: "gray",
    borderRadius: 10,
    width: 1000,
    left: 50,
  },
  scrubber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default VideoScrubber;
