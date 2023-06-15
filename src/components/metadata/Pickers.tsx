import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";

export const PoolLengthPicker = (length: any, setLength: any) => {
  const poolLengths = [
    { label: "25M", value: "25M" },
    { label: "50M", value: "50M" },
  ];
  return (
    <View style={styles.picker}>
      <Picker
        selectedValue={length}
        onValueChange={(itemValue, itemIndex) => setLength(itemValue)}
        itemStyle={styles.itemStyle}
      >
        {poolLengths.map((level) => (
          <Picker.Item
            key={level.value}
            label={level.label}
            value={level.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export const distancePicker = (distance: any, setDistance: any) => {
  const distances = [
    { label: "50M", value: "50M" },
    { label: "100M", value: "100M" },
    { label: "200M", value: "200M" },
    { label: "400M", value: "400M" },
    { label: "800M", value: "800M" },
    { label: "1500M", value: "1500M" },
  ];
  return (
    <View style={styles.picker}>
      <Picker
        selectedValue={distance}
        onValueChange={(itemValue, itemIndex) => setDistance(itemValue)}
        itemStyle={styles.itemStyle}
      >
        {distances.map((level) => (
          <Picker.Item
            key={level.value}
            label={level.label}
            value={level.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 160,
    // height: 60,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30, // to ensure the text is not obscured by the dropdown icon
    zIndex: 1, // set the zIndex to ensure it is displayed above other elements
    // position: "absolute",
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
