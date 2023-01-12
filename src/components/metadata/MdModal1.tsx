import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { pickerOptions, displayPicker } from "./PickerOptions";
import MdModal2 from "./MdModal2";
import showAlert from "./Alert";

const MdModal1 = (props: any) => {
  //md context not in use yet

  //props
  const navigate = props.navigation;
  const isModalVisible = props.visible;
  const toggleModal = props.toggle;
  const showPicker = props.picker.condition;
  const pickerOption = props?.picker?.option; //which picker to show
  const dataObj = props.obj;
  // if (dataObj !== undefined) {
  //   console.log(dataObj);
  // }

  //for md modal 2
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  //condition to render modal2
  const renderModal2 = (obj: any) => {
    if (
      obj["Category"] !== false &&
      obj["Pool Length"] !== false &&
      obj["Type of race"] !== false
    ) {
      console.log("got them all");
      toggleModal2();
    } else {
      // console.warn("missing entries");
      showAlert();
    }
  };

  const Modal2 = (obj: any) => {
    if (obj !== undefined) {
      if (
        obj["Category"] !== false &&
        obj["Pool Length"] !== false &&
        obj["Type of race"] !== false
      ) {
        return (
          <MdModal2
            visible={isModalVisible2}
            toggle={toggleModal2}
            navigation={navigate}
            obj={dataObj}
          />
        );
      }
      // showAlert();
    }
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        backdropColor={"#00000080"}
        onBackdropPress={toggleModal}
        // animationOut={"slideOutLeft"}
      >
        <View style={styles.box}>
          <View style={styles.modalBox}>
            {pickerOptions(pickerOption)?.map((x, index) =>
              displayPicker(showPicker, x, index, dataObj)
            )}
            <TouchableOpacity
              onPress={() => {
                renderModal2(dataObj);
              }}
            >
              <Text style={styles.next}>Next</Text>
              {Modal2(dataObj)}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    opacity: 1,
    width: 400,
    height: 300,
  },
  next: {
    //temp css
    fontSize: 20,
    color: "blue",
    backgroundColor: "yellow",
    alignSelf: "center",
  },
});

export default MdModal1;
