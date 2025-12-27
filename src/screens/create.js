import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { BookOpen, Info, Save, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Loading from "../components/loading";
import { createMahasiswa } from "../request/request-student";

const CreatePage = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateFailed, setIsCreateFailed] = useState(false);
  const [failedMsg, setFailedMsg] = useState("");

  const prodis = [
    { label: "Pilih Program Prodi", value: "" },
    { label: "Informatika", value: "Informatika" },
    { label: "Sistem Informasi", value: "Sistem Informasi" },
    { label: "Bisnis Digital", value: "Bisnis Digital" },
    { label: "Sains Data", value: "Sains Data" },
  ];

  const [student, setStudent] = useState({
    npm: "",
    nama: "",
    prodi: "",
  });

  const setStudentInformation = (field, newValue) =>
    setStudent({ ...student, [field]: newValue });

  const postData = async () => {
    setIsLoading(true);
    try {
      const response = await createMahasiswa({
        columns: ["npm", "nama", "program_studi"],
        data: Object.values(student),
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const addStudent = async () => {
    if (student.npm === "" || student.nama === "" || student.prodi === "") {
      setFailedMsg(
        "kolom npm atau nama atau program studi tidak boleh kosong."
      );
      setIsCreateFailed(true);
    } else {
      if (isCreateFailed) {
        setIsCreateFailed(false);
      }
      const isCreated = await postData();
      if (isCreated) {
        navigation.goBack();
      } else {
        setFailedMsg("Koneksi jaringan buruk.");
        setIsCreateFailed(true);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F1F5F9",
      }}
    >
      <Loading visible={isLoading} loadingMsg={"Menambahkan Data Mahasiswa"} />
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          ➕ Tambah Mahasiswa
        </Text>
        <Text style={{ fontWeight: "300", color: "white" }}>
          Masukkan data mahasiswa baru
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <View style={styles.columnContainer}>
            <User color={"#14B8A6"} size={16} style={{ marginRight: 5 }} />
            <Text style={{ fontWeight: "500" }}>Nama Lengkap</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={student.nama}
              onChangeText={(newText) => setStudentInformation("nama", newText)}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor={"#94A3B8"}
            />
          </View>
        </View>

        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <View style={styles.columnContainer}>
            <BookOpen color={"#14B8A6"} size={16} style={{ marginRight: 5 }} />
            <Text style={{ fontWeight: "500" }}>
              NPM (Nomor Pokok Mahasiswa)
            </Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={student.npm}
              onChangeText={(newText) => setStudentInformation("npm", newText)}
              placeholder="Masukkan npm lengkap"
              placeholderTextColor={"#94A3B8"}
            />
          </View>
        </View>

        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <View style={styles.columnContainer}>
            <BookOpen color={"#14B8A6"} size={16} style={{ marginRight: 5 }} />
            <Text style={{ fontWeight: "500" }}>Pilih Prodi</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={{ color: student.prodi === "" ? "#94A3B8" : "#1e1e1e" }}
              selectionColor={"white"}
              selectedValue={student.prodi}
              dropdownIconColor={"black"}
              onValueChange={(itemValue) =>
                setStudentInformation("prodi", itemValue)
              }
            >
              {prodis.map((prodi) => (
                <Picker.Item label={prodi.label} value={prodi.value} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontWeight: "500" }}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={addStudent}
          >
            <Save color={"#F8FAFC"} size={16} style={{ marginRight: 5 }} />
            <Text style={{ fontWeight: "500", color: "#F8FAFC" }}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isCreateFailed && (
        <View style={[styles.notifContainer, styles.errorContainer]}>
          <Text style={{ fontWeight: "bold", color: "#9B2C2C" }}>
            Gagal Menambahkan Data:{" "}
            <Text style={{ fontWeight: "500", color: "#C53030" }}>
              {failedMsg}
            </Text>
          </Text>
        </View>
      )}
      <View style={[styles.notifContainer, styles.tipsContainer]}>
        <View style={{ marginTop: 2, marginRight: 5 }}>
          <Info color={"#10B981"} size={20} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", color: "#0D9488" }}>
            Tips Pengisian
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "500", color: "#10B981" }}>
            Pastikan semua data diisi dengan benar dan lengkap. NPM harus unik
            untuk setiap mahasiswa
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CreatePage;

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#334155",
  },
  formContainer: {
    margin: 15,
    borderRadius: 15,
    backgroundColor: "#F8FAFC",
    elevation: 5,
  },
  columnContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  textInputContainer: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 0.2,
    backgroundColor: "#F1F5F9",
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 0.2,
    backgroundColor: "#F1F5F9",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    padding: 15,
    justifyContent: "space-evenly",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#F1F5F9",
  },
  actionButton: {
    width: "45%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F8FAFC",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#14B8A6",
    borderRadius: 10,
  },
  notifContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 2,
  },
  tipsContainer: {
    borderColor: "#14B8A6",
    backgroundColor: "#F0FDFA",
  },
  errorContainer: {
    marginBottom: 15,
    borderColor: "#E53E3E",
    backgroundColor: "#FFF5F5",
  },
});
