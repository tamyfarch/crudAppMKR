import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Modal, Pressable } from 'react-native';
import { updateDoc, doc } from "firebase/firestore";
import { database } from "../../firebase";

export default function EditUser({ todo, setModalVisible }) {
  const [updatedName, setUpdatedName] = useState();
  const [updatedUserName, setUpdatedUserName] = useState();
  const [id] = useState(todo.id);
  const [name] = useState(todo.name);
  const [username] = useState(todo.username);

  const handleSaveUpdate = () => {
    if(updatedName!=name && updatedUserName!=username){
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
    else if(updatedName!=name){
      updateDoc(doc(database, 'users', id), {
        name: updatedName
      }).then(() => {
        console.log('updated')
        setModalVisible(false)
      }).catch((error) => {
        console.log(error)
      })
    }
    else if(updatedUserName!=username){
      updateDoc(doc(database, 'users', id), {
        username: updatedUserName
      }).then(() => {
        console.log('updated')
        setModalVisible(false)
      }).catch((error) => {
        console.log(error)
      })
    }
    else if (updatedName==name){
      updateDoc(doc(database, 'users', id), {
        name: name
      }).then(() => {
        console.log('updated')
        setModalVisible(false)
      }).catch((error) => {
        console.log(error)
      })
    }
    else if (updatedUserName==username){
      updateDoc(doc(database, 'users', id), {
        username: username
      }).then(() => {
        console.log('updated')
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