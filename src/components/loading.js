import React from "react";

import { View, Modal, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = ({ visible, loadingMsg }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.msgcontainer}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{loadingMsg}</Text>
          <ActivityIndicator size={"large"} style={{ marginTop: 10 }} />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  msgcontainer: {
    padding: 15,
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e9f3ff",
    borderRadius: 10,
    elevation: 5,
  },
});
