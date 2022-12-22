import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

type props = {
  item: String;
};

const LoadingScreen = ({ item }: props) => {
  const [spin, setSpin] = useState<boolean>(false);

  const toggleSpin = () => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 1500);
  };

  useEffect(() => {
    toggleSpin();
  }, []);

  return (
    <View style={styles.container}>
      <Spinner
        visible={spin}
        textContent={`${item} is loading...`}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default LoadingScreen;
