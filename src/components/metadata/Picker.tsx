import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const PickerSelect = (props: any) => {
  const [placeholder, ...options] = props.options;
  const dataObj = props.obj;
  // if (dataObj !== undefined) {
  //   console.log(dataObj);
  // }
  //   console.log(placeholder);
  //   console.log(options);

  //useState
  const [selectedOption, setSelectedOption] = useState();

  //add selected option to data obj
  if (selectedOption !== undefined) {
    dataObj[placeholder] = selectedOption;
  }
  // console.log(dataObj);

  //map options function
  const mapOptions = (arr: any) => {
    return arr.map((x: any, index: any) => (
      <Picker.Item label={`${x}`} value={`${x}`} key={index} />
    ));
  };

  //pickerJsx function
  const PickerJsx = (callback: any) => {
    return (
      <View>
        <Text>{placeholder}</Text>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
        >
          <Picker.Item label={"Please select..."} value={false} key={10000} />
          {callback}
        </Picker>
      </View>
    );
  };

  return <View>{PickerJsx(mapOptions(options))}</View>;
};

const styles = StyleSheet.create({});

export default PickerSelect;
