import React from "react";
import { FlatList } from "react-native";
import Student from "./studentRow";

const StudentList = ({ keyExtractor, data, onDelete, onUpdate }) => {
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data}
      renderItem={({ item }) => (
        <Student student={item} onDelete={onDelete} onUpdate={onUpdate} />
      )}
    />
  );
};

export default StudentList;
