import { BookOpen, Pen, Trash2, User } from "lucide-react-native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Student = ({ student, onUpdate, onDelete }) => {
  return (
    <View style={styles.outerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.nameCotainer}>
          <User color={"#F8FAFC"} size={18} />
        </View>
        <View style={{ width: 100 }}>
          <Text style={{ fontWeight: "500" }}>{student.nama}</Text>
          <Text style={styles.npmText}>NPM: {student.npm}</Text>
        </View>
      </View>
      <View style={styles.prodiContainer}>
        <BookOpen color={"#10B981"} size={16} style={{ marginRight: 5 }} />
        <Text style={{ fontSize: 12 }}>{student.program_studi}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => onUpdate(student)}>
          <View style={[styles.actionButton, { backgroundColor: "#14B8A6" }]}>
            <Pen color={"#F8FAFC"} size={18} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(student.id)}>
          <View style={[styles.actionButton, { backgroundColor: "#F43F5E" }]}>
            <Trash2 color={"#F8FAFC"} size={18} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Student;

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameCotainer: {
    width: 30,
    height: 30,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#10B981",
  },
  prodiContainer: {
    width: 120,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginHorizontal: 2,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  npmText: { fontSize: 12, fontWeight: "500", color: "#0D9488" },
});
