import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { pickerOptions, displayPicker } from "./PickerOptions";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MdModal2 = (props: any) => {
  const navigation = useNavigation<any>();
  const isModalVisible = props.visible;
  const toggleModal = props.toggle;
  const showPicker = true;
  const pickerOption = 2;

  //data obj
  // const dataObj = props.obj;
  const [dataObj, setDataObj] = useState<any>(props.obj);
  // console.log(dataObj);
  const category = dataObj["Category"] ? dataObj["Category"] : null;
  const length = dataObj["Pool Length"] ? dataObj["Pool Length"] : null;
  const type = dataObj["Type of race"] ? dataObj["Type of race"] : null;

  //name
  const [name, setName] = useState("");
  if (name) {
    // console.log(name);
    dataObj.Name = name;
  }

  //comp name
  const [compName, setCompName] = useState("");
  if (compName) {
    // console.log(name);
    dataObj["Competiton Name"] = compName;
  }
  //check if competition or not
  const isCompetition = (type: any) => {
    if (type == "Competition")
      return (
        <Fumi
          label={`${type} Name`}
          iconClass={FontAwesomeIcon}
          iconName={"plane"}
          iconColor={"#f95a25"}
          iconSize={20}
          // iconWidth={40}
          inputPadding={16}
          onChangeText={(name) => setCompName(name)}
        />
      );
  };

  //code for date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setDate] = useState<any>();
  let fullDate = "Select date";
  if (date) {
    fullDate =
      date.getDate() +
      "-" +
      Number(date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    dataObj["Date"] = fullDate;
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  //store data with async storage
  const storeData = async (data: {}) => {
    try {
      const jsonValue = JSON.stringify(data);
      // await AsyncStorage.setItem("test", "hello");

      await AsyncStorage.setItem("@metadata", jsonValue);
      // alert("data saved");
    } catch (e) {
      // saving error
    }
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        backdropColor={"#00000080"}
        animationIn={"slideInRight"}
        animationOut={"slideOutRight"}
        // onBackdropPress={toggleModal}
      >
        <View style={styles.box}>
          <View style={styles.modalBox}>
            <View style={styles.navigators}>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.back}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Camera");
                  storeData(dataObj);
                }}
              >
                <Text style={styles.back}>Skip</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headers}>Metadata screen</Text>
            <Fumi
              label={`${category} Name`}
              iconClass={FontAwesomeIcon}
              iconName={"plane"}
              iconColor={"#f95a25"}
              iconSize={20}
              // iconWidth={40}
              inputPadding={16}
              onChangeText={(name) => setName(name)}
            />
            {isCompetition(type)}
            {/* <Button
              title="Show Date Picker"
              onPress={showDatePicker}
              style={styles.date}
            /> */}
            <TouchableOpacity onPress={showDatePicker} style={styles.date}>
              <FontAwesomeIcon name="calendar" size={24} color="black" />
              <Text style={styles.dateText}>{fullDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {pickerOptions(pickerOption, category, length, type)?.map(
              (x, index) => displayPicker(showPicker, x, index, dataObj)
            )}
            <Button
              title="Display current data"
              onPress={() => console.log(dataObj)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headers: {
    fontSize: 30,
    paddingBottom: 100,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    position: "absolute",
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 400,
    // height: undefined,
  },
  back: {
    //temp css
    fontSize: 20,
    color: "blue",
    backgroundColor: "yellow",
    // alignSelf: "center",
  },
  date: {
    margin: 20,
    flexDirection: "row",
  },
  dateText: {
    marginLeft: 20,
  },
  navigators: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default MdModal2;
