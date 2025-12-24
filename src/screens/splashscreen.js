import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace("Home");
    }, 1000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#334155",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        📚 Sistem Manajemen Mahasiswa
      </Text>
    </View>
  );
};

export default SplashScreen;
