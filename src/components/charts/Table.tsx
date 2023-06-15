import React, { useState } from "react";
import { View, Text, StyleSheet, LogBox } from "react-native";
//@ts-ignore
import { Table, Row, Rows } from "react-native-table-component";

interface props {
  data: any;
  headers: any;
}
LogBox.ignoreLogs([
  "Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.",
]);

const MyTable = (props: props) => {
  const [tableHead, setTableHead] = useState(props.headers);
  const [tableData, setTableData] = useState(props.data);

  // const text: object = { margin: 4, fontSize: 20 };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    maxWidth: 300,
    height: 400,
  },
  border: { borderWidth: 1, borderColor: "#ccc" },
  head: { height: 60, backgroundColor: "#f1f8ff" },
  text: { margin: 4, fontSize: 20 },
});

export default MyTable;
