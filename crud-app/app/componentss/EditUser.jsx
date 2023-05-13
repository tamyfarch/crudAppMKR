import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Modal, Pressable } from 'react-native';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, where, query } from "firebase/firestore";
import { app, database } from "../../firebase";

export default function EditUser({ todo, setModalVisible }) {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedUserName, setUpdatedUserName] = useState('');
  const [name, setName] = useState(todo.name)
  const [username, setUsername] = useState(todo.username)

  console.log(updatedName)
  console.log(updatedUserName)


  const [id, setUid] = useState(todo.id);

  const handleSaveUpdate = () => {
    if (name !== updatedName || username !== updatedUserName) {
      updateDoc(doc(database, 'users', id), {
        name: updatedName,
        username: updatedUserName
      }).then(() => {
        console.log('updated')
        setModalVisible(false)
      }).catch((error) => {
        console.log(error)
      })
    }
  };
  
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Edit Name"
        value={updatedName}
        onChangeText={setUpdatedName}
      />
      <TextInput
        style={styles.input}
        placeholder="Edit Username"
        value={updatedUserName}
        onChangeText={setUpdatedUserName}
      />
      <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSaveUpdate}>
        <Text style={styles.textStyle}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSaveUpdate}>
        <Text style={styles.textStyle}>Save</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 280,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 5,
  },
  buttonSave: {
    backgroundColor: '#2196F3',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    alignSelf: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});