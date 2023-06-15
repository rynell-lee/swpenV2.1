import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
}

const example = (props: Props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

export default example;

//not in use, for testing
