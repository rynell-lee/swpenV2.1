// refer to react-native-svg-charts docs for more information

import React from "react";
import { View, StyleSheet } from "react-native";
//@ts-ignore
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
//@ts-ignore
import * as shape from "d3-shape";
import { Circle, Text, Svg, G } from "react-native-svg";

interface props {
  x: any;
  y: any;
  xLabel: string;
  yLabel: string;
}

//line chart requires 2 set of data for x and y axis
const LineCharts = (props: props) => {
  const CustomLabel = ({ x, y, data, index }: any) => (
    <Text
      key={index}
      x={x(index)}
      y={y(data[index]) - 10} // Offset the label vertically above the circle
      fontSize={10}
      fill="black"
      textAnchor="middle"
    >
      {data[index]}
    </Text>
  );

  //additionaly functions to beautify the chart
  const CustomGrid = ({ x, y, data, ticks }: any) => (
    <Grid
      x={x}
      y={y}
      data={data}
      ticks={ticks}
      svg={{
        stroke: "rgba(0, 0, 0, 0.2)",
      }}
    />
  );

  //additionaly functions to beautify the chart

  const CustomCircle = ({ x, y, data, index }: any) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(data[index])}
      r={4}
      stroke="rgb(134, 65, 244)"
      strokeWidth={2}
      fill="white"
    />
  );

  //additionaly functions to beautify the chart

  const CustomCircles = ({ x, y, data }: any) => {
    return data.map((_: any, index: React.Key | null | undefined) => (
      <React.Fragment key={index}>
        <CustomCircle {...{ x, y, data, index }} />
        <CustomLabel {...{ x, y, data, index }} />
      </React.Fragment>
    ));
  };

  const xLabels = props.x;
  const xData = xLabels.map((_: any, index: any) => index);
  const yData = props.y;

  return (
    <View style={{ paddingTop: 30, maxWidth: 800, flex: 1 }}>
      <View style={{ flexDirection: "row", height: 300, padding: 20 }}>
        <YAxis
          data={yData}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{
            fill: "grey",
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value: any) => `${value}`}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={yData}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={{ top: 20, bottom: 20, left: 30, right: 30 }}
          curve={shape.curveLinear} // Use curveLinear for straight lines
        >
          <CustomGrid
            x={(value: any) => value}
            y={(value: any) => value}
            data={yData}
            ticks={10}
          />
          <CustomCircles
            x={(value: any) => value}
            y={(value: any) => value}
            data={yData}
          />
        </LineChart>
      </View>
      <Svg
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: "100%",
          height: 400,
        }}
      >
        <G x={0} y={0}>
          {/* Y-axis label */}
          <Text
            x={55}
            y={20}
            fontSize={12}
            fill="black"
            textAnchor="middle"
            rotation={0}
          >
            {props.yLabel}
          </Text>

          {/* X-axis label */}
          <Text x={745} y={340} fontSize={12} fill="black" textAnchor="middle">
            {props.xLabel}
          </Text>
        </G>
      </Svg>

      <XAxis
        data={xData}
        formatLabel={(value: any, index: any) => xLabels[index]}
        contentInset={{ left: 60, right: 60 }}
        svg={{
          fill: "grey",
          fontSize: 10,
        }}
        style={{ marginLeft: 20 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});
export default LineCharts;
