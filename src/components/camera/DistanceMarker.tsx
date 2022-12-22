import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const DistanceMarker = () => {
  return (
    <TouchableOpacity onPress={() => console.log("marker pressed")}>
      <FontAwesome5 name="map-marker" size={80} color="black" />
    </TouchableOpacity>
  );
};

export default DistanceMarker;
