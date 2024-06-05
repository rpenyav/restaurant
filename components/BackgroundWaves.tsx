import React from "react";
import { View, StyleSheet } from "react-native";

const BackgroundWaves = () => {
  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        <View style={styles.wave} />
        <View style={styles.wave2} />
        <View style={styles.wave3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  waveContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#c7f9cc",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    width: "332%",
    height: "100%",
    backgroundColor: "#80ed99",
    borderRadius: 1000,
    borderColor: "#000",
    transform: [{ translateX: -50 }, { translateY: 50 }],
  },
  wave2: {
    position: "absolute",
    bottom: 0,
    width: "345%",
    height: "100%",
    backgroundColor: "#57cc99",
    borderRadius: 1000,
    transform: [{ translateX: -75 }, { translateY: 105 }],
  },
  wave3: {
    position: "absolute",
    bottom: 0,
    width: "355%",
    height: "95%",
    backgroundColor: "#38a3a5",
    borderRadius: 1000,
    transform: [{ translateX: -100 }, { translateY: 130 }],
  },
});

export default BackgroundWaves;
