//code for displaying a line tool
import React, { useState, useRef, useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Svg, { Line, Circle } from "react-native-svg";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const LineTool = () => {
  const [lineEnd, setLineEnd] = useState({ x: 600, y: 200 });
  const [lineStart, setLineStart] = useState({ x: 500, y: 300 });
  const [activeCircle, setActiveCircle] = useState(false);

  //function that generates the line

  const setActiveCircleFromEvent = (event: {
    nativeEvent: { x: any; y: any };
  }) => {
    const { x, y } = event.nativeEvent;

    const distanceToStart = Math.sqrt(
      Math.pow(x - lineStart.x, 2) + Math.pow(y - lineStart.y, 2)
    );
    const distanceToEnd = Math.sqrt(
      Math.pow(x - lineEnd.x, 2) + Math.pow(y - lineEnd.y, 2)
    );

    const circleRadius = 50;

    if (distanceToStart <= circleRadius) {
      setActiveCircle(true);
    } else if (distanceToEnd <= circleRadius) {
      setActiveCircle(false);
    } else {
      setActiveCircle(false);
    }
  };

  //code to extend the line
  const extendLine = (event: { nativeEvent: { x: any; y: any } }) => {
    const { x, y } = event.nativeEvent;
    // setLineEnd({ x, y });
    if (activeCircle === false) {
      setLineEnd({ x, y });
    } else if (activeCircle === true) {
      const dx = x - lineStart.x;
      const dy = y - lineStart.y;

      setLineStart({ x, y });
      setLineEnd((prevEnd) => ({ x: prevEnd.x + dx, y: prevEnd.y + dy }));
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={extendLine}
        onHandlerStateChange={setActiveCircleFromEvent}
      >
        <Svg height="100%" width="100%">
          <Line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            // rotation={45}
            stroke="red"
            strokeWidth="5"
          />
          <Circle
            cx={lineStart.x}
            cy={lineStart.y}
            r="10"
            fill="green"
            // rotation={45}
          />
          <Circle
            cx={lineEnd.x}
            cy={lineEnd.y}
            r="10"
            fill="blue"
            // rotation={45}
          />
        </Svg>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F5FCFF",
    // position: "absolute",
  },
  gestureContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
});
export default LineTool;
