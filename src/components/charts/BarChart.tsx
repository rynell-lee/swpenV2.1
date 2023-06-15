//code for bar charts, NOT IN USE
// refer to react-native-svg-charts docs for more information
import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
//@ts-ignore
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
interface props {
  data: any;
}
const BarCharts = (props: props) => {
  const data = props.data;
  console.log(data);

  const xAxisData = data.map((item) => item.distance);
  const yAxisData = data.map((item) => item.time);

  return (
    <View style={{ height: 1000, padding: 20 }}>
      <Text>Bar charts</Text>
      <View style={{ flexDirection: "row", height: 500 }}>
        <YAxis
          data={yAxisData}
          contentInset={{ top: 35, bottom: 35 }}
          svg={{ fontSize: 10, fill: "grey" }}
          min={0} // Ensure that the y-axis starts from zero
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ flex: 1 }}
            data={data}
            yAccessor={({ item }) => item.time}
            svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
            contentInset={{ top: 30, bottom: 30, left: 30, right: 30 }}
            spacingInner={0.2}
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{ marginHorizontal: -10, marginTop: 10 }}
            data={xAxisData}
            formatLabel={(value, index) => xAxisData[index]}
            contentInset={{ left: 120, right: 120 }}
            svg={{ fontSize: 10, fill: "grey" }}
          />
        </View>
      </View>
    </View>
  );
};

export default BarCharts;
