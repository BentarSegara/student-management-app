import { Plus, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StudentList from "../components/studentList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { request } from "../../nodejs-app/request";
import Loading from "../components/loading";
import { destroyMahasiswa, getMahasiswa } from "../request/request-student";

const Home = () => {
  const getURL = "http://192.168.0.102:3000/mahasiswa/detail";
  const deleteURL = "http://192.168.0.102:3000/mahasiswa/delete";

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [prodis, setProdi] = useState([]);

  const uniqueProdi = (mahasiswas) => [
    ...new Set(mahasiswas.map((mahasiswa) => mahasiswa.program_studi)),
  ];

  const fetchData = async () => {
    setModalMsg("Memuat Data Mahasiswa");
    setIsLoading(true);
    try {
      const response = await getMahasiswa();
      const responseData = response.data;
      const mahasiswas = responseData.data;
      const prodiList = uniqueProdi(mahasiswas);

      setStudents(mahasiswas);
      setSelectedStudents(mahasiswas);
      setProdi(prodiList);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id) => {
    setModalMsg("Menghapus Data Mahasiswa");
    setIsLoading(true);
    try {
      await destroyMahasiswa(id);
    } catch (err) {
      console.error("Gagal menghapus data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateStudent = (student) => {
    navigation.navigate("Update", { currStudent: student });
  };

  const onDeleteStudent = async (id) => {
    await deleteData(id);
    const newStudent = students.filter((student) => student.id !== id);
    setStudents(newStudent);
    setSelectedStudents(newStudent);
  };

  const searchStudent = (name) => {
    const lowerName = name.toLowerCase();
    const selectedStudent = students.filter((student) => {
      const studentName = student.nama.toLowerCase();
      return studentName.includes(lowerName);
    });
    setSelectedStudents(selectedStudent);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F1F5F9",
      }}
    >
      <Loading visible={isLoading} loadingMsg={modalMsg} />
      <View style={styles.header}>
        <Text style={styles.titleText}>📚 Sistem Manajemen Mahasiswa</Text>
        <Text style={{ fontWeight: "300", color: "white" }}>
          Kelola Data Mahasiswa
        </Text>
      </View>

      <View style={styles.studentInfoContainer}>
        <View style={styles.studentInfoCard}>
          <Text style={{ fontWeight: "bold", color: "#0D9488" }}>
            Total Mahasiswa
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {students.length}
          </Text>
        </View>
        <View style={styles.studentInfoCard}>
          <Text style={{ fontWeight: "bold", color: "#0D9488" }}>
            Program Studi
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {prodis.length}
          </Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Search color={"#94A3B8"} />
        <TextInput
          style={{ color: "#1e1e1e" }}
          onChangeText={(text) => {
            searchStudent(text);
          }}
          placeholder="Cari mahasiswa"
          placeholderTextColor={"#94A3B8"}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <View style={styles.toCreatePageContainer}>
          <Plus color={"#F8FAFC"} />
          <Text style={{ fontWeight: "500", color: "white" }}>
            Tambahkan Mahasiswa Baru
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.tableContainer}>
        <View style={styles.theadContainer}>
          <Text style={styles.theadText}>Mahasiswa</Text>
          <Text style={styles.theadText}>Program Studi</Text>
          <Text style={styles.theadText}>Aksi</Text>
        </View>
        {students.length !== 0 ? (
          <StudentList
            keyExtractor={(item) => item.id.toString()}
            data={selectedStudents}
            onUpdate={onUpdateStudent}
            onDelete={onDeleteStudent}
          />
        ) : (
          <View style={{ alignSelf: "center" }}>
            <Text style={{ color: "#78808bff" }}>
              Data Mahasiswa Masih Kosong
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 35,
    alignItems: "center",
    backgroundColor: "#334155",
  },
  studentInfoContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "space-evenly",
  },
  searchContainer: {
    width: "85%",
    padding: 5,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  toCreatePageContainer: {
    width: "85%",
    flexDirection: "row",
    marginVertical: 15,
    padding: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.2,
    borderRadius: 10,
    backgroundColor: "#10B981",
  },
  tableContainer: {
    width: "85%",
    height: "55%",
    alignSelf: "center",
  },
  theadContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    backgroundColor: "#475569",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  studentInfoCard: {
    padding: 20,
    borderRadius: 10,
    borderLeftColor: "#14B8A6",
    borderLeftWidth: 3,
    backgroundColor: "#F8FAFC",
    elevation: 5,
  },
  titleText: { fontSize: 20, fontWeight: "bold", color: "white" },
  theadText: { fontWeight: "500", color: "#F8FAFC", textAlign: "left" },
});
