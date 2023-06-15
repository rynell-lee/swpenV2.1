//code to store metadata
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

interface QuestionnaireProps {
  isVisible: boolean;
  onClose: () => void;
  setMetadata: Function;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  isVisible,
  onClose,
  setMetadata,
}) => {
  //first row
  //all these states are the questions the metadata will have
  const [name, setName] = useState("");
  const [age, setAge] = useState<any>("");
  const [gender, setGender] = useState<any>("Male");
  const [date, setDate] = useState<any>("Date");

  //second row
  const [length, setLength] = useState<any>("25M");
  const [event, setEvent] = useState<any>("50M");
  const [stroke, setStroke] = useState<any>("Freestyle");
  const [type, setType] = useState<any>("Training");

  //thrid row
  const [compName, setCompName] = useState<any>("");
  const [round, setRound] = useState<any>("NIL");

  //code for date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  //function to format date
  const extractDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // console.warn("A date has been picked: ", date);
    const fullDate = extractDate(date);
    setDate(fullDate);
    hideDatePicker();
  };

  //function to submit data

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("Date:", date);
    console.log("Pool Length:", length);
    console.log("Event:", event);
    console.log("Stroke:", stroke);
    console.log("Event Type:", type);
    console.log("Competion Name:", compName);
    console.log("Round:", round);
    setMetadata(metadataArr);
    onClose(); // close the modal after submission
  };

  //function to handle canellations

  const handleCancel = () => {
    setName("");
    setAge("");
    setGender("");
    setDate("");
    setLength("");
    setEvent("");
    setStroke("");
    setType("Training");
    setCompName("NIL");
    setRound("NIL");
    onClose(); // close the modal without saving changes
  };

  const handleAgeChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setAge(num);
    }
  };

  //arrays for pickers aka the question choices
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const poolLengths = [
    { label: "25M", value: "25M" },
    { label: "50M", value: "50M" },
  ];

  const events = [
    { label: "50M", value: "50M" },
    { label: "100M", value: "100M" },
    { label: "200M", value: "1200M" },
    { label: "400M", value: "400M" },
    { label: "800M", value: "800M" },
    { label: "1500M", value: "1500M" },
  ];

  const strokes = [
    { label: "Freestyle", value: "Freestyle" },
    { label: "Breaststroke", value: "Breaststroke" },
    { label: "Backstroke", value: "Backstroke" },
    { label: "Butterfly", value: "Butterfly" },
    { label: "Medley", value: "Medley" },
  ];

  const eventType = [
    { label: "Training", value: "Training" },
    { label: "Competition", value: "Competition" },
  ];

  const rounds = [
    { label: "Preliminary Heats", value: "Preliminary Heats" },
    { label: "Semi Finals", value: "Semi Finals" },
    { label: "Finals", value: "Finals" },
  ];

  //data stored here to display as a table on screen later
  const metadataArr = [
    ["Name", name],
    ["Age", age],
    ["Gender", gender],
    ["Date", date],
    ["Pool Length", length],
    ["Event", event],
    ["Stroke", stroke],
    ["Event Type", type],
    ["Competition Name", compName],
    ["Round", round],
  ];

  const ShowLastRow = () => {
    return (
      <View>
        <View style={styles.rowHeaders}>
          <Text style={[styles.question, { marginLeft: 170 }]}>
            Competition Name
          </Text>
          <Text style={[styles.question, { marginLeft: 180 }]}>Round</Text>
        </View>

        <View style={styles.lastRow}>
          <TextInput
            style={styles.input}
            value={compName}
            onChangeText={setCompName}
            placeholder="Competition name"
          />
          <View style={styles.picker}>
            <Picker
              selectedValue={round}
              onValueChange={(itemValue, itemIndex) => setRound(itemValue)}
              itemStyle={styles.itemStyle}
              // onTouchStart={() => console.log("touchs")}
            >
              {rounds.map((level) => (
                <Picker.Item
                  key={level.value}
                  label={level.label}
                  value={level.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ alignItems: "center" }}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          onClose();
        }}
        onBackButtonPress={() => console.log("bye")}
      >
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Event Details</Text>
          <View style={styles.rowHeaders}>
            <Text style={styles.question}>Name</Text>
            <Text style={[styles.question, { marginLeft: 180 }]}>Age</Text>
            <Text style={[styles.question, { marginLeft: 190 }]}>Gender</Text>
            <Text style={[styles.question, { marginLeft: 160 }]}>Date</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
            <TextInput
              style={styles.input}
              value={age?.toString()}
              keyboardType="numeric"
              onChangeText={handleAgeChange}
              placeholder="Enter your age"
            />

            <View style={styles.picker}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                itemStyle={styles.itemStyle}
              >
                {genders.map((level) => (
                  <Picker.Item
                    key={level.value}
                    label={level.label}
                    value={level.value}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.dateContainer}
            >
              <View style={{ flexDirection: "row" }}>
                <FontAwesomeIcon name="calendar" size={24} color="black" />
                <Text style={styles.dateText}>{date}</Text>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowHeaders}>
            <Text style={styles.question}>Pool Length</Text>
            <Text style={[styles.question, { marginLeft: 130 }]}>Event</Text>
            <Text style={[styles.question, { marginLeft: 180 }]}>Stroke</Text>
            <Text style={[styles.question, { marginLeft: 170 }]}>
              Event Type
            </Text>
          </View>
          <View style={styles.row}>
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
            <View style={styles.picker}>
              <Picker
                selectedValue={event}
                onValueChange={(itemValue, itemIndex) => setEvent(itemValue)}
                itemStyle={styles.itemStyle}
              >
                {events.map((level) => (
                  <Picker.Item
                    key={level.value}
                    label={level.label}
                    value={level.value}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={stroke}
                onValueChange={(itemValue, itemIndex) => setStroke(itemValue)}
                itemStyle={styles.itemStyle}
              >
                {strokes.map((level) => (
                  <Picker.Item
                    key={level.value}
                    label={level.label}
                    value={level.value}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                itemStyle={styles.itemStyle}
              >
                {eventType.map((level) => (
                  <Picker.Item
                    key={level.value}
                    label={level.label}
                    value={level.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {type == "Competition" ? ShowLastRow() : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rowHeaders: {
    flexDirection: "row",
  },

  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    // alignItems: "centesr",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // position
    zIndex: 1,
    position: "absolute",
    // height: 500,
    width: "80%",
    marginLeft: 100,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    // paddingLeft: 200,/
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: 160,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: 160,
    height: 50,
  },
  buttonContainer: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    // paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0080ff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#cc0000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
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
  date: {
    margin: 20,
    flexDirection: "row",
  },
  dateText: {
    marginLeft: 50,
    // paddingBottom: 10,
    top: 5,
  },
});

export default Questionnaire;
