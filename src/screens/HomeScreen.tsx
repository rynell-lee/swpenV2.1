import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { NavigatorProps } from "../../App";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";

const HomeScreen = ({ navigation }: NavigatorProps) => {
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log("tap");
    });
  return (
    <View>
      <Text>Home screen</Text>
      <Button title="Camera" onPress={() => navigation.navigate("Camera")} />
      <Button title="Loading" onPress={() => navigation.navigate("Loading")} />
      <GestureHandlerRootView>
        <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
          <View style={styles.ball} />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};
const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "red",
    alignSelf: "center",
  },
});

export default HomeScreen;
