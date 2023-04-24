import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";

interface QuestionnaireProps {
  isVisible: boolean;
  onClose: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  isVisible,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState<any>("");
  const [platforms, setPlatforms] = useState("");
  const experienceLevels = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
    { label: "Expert", value: "expert" },
  ];

  const handleSubmit = () => {
    // Do something with the user's responses here
    console.log("Name:", name);
    console.log("Experience:", experience);
    console.log("Platforms:", platforms);
    onClose(); // close the modal after submission
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.question}>What is your name?</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.question}>
          What is your experience level with React Native?
        </Text>
        <Picker
          selectedValue={experience}
          onValueChange={(itemValue, itemIndex) => setExperience(itemValue)}
          // style={styles.picker}
        >
          {experienceLevels.map((level) => (
            <Picker.Item
              key={level.value}
              label={level.label}
              value={level.value}
            />
          ))}
        </Picker>

        <Text style={styles.question}>
          What platforms have you developed apps for using React Native?
        </Text>
        <TextInput
          style={styles.input}
          value={platforms}
          onChangeText={setPlatforms}
          placeholder="Enter platforms"
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={onClose} color="#cc0000" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  picker: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30, // to ensure the text is not obscured by the dropdown icon
  },
  multiPicker: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
  },
  pickerItem: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Questionnaire;
