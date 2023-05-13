import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Modal, Pressable } from 'react-native';
import { Stack, usePathname, useRouter, useSearchParams } from "expo-router";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, where, query } from "firebase/firestore";
import { app, database } from '../../firebase';


export default function EditItem({ todo }) {
  const router = useRouter();

  const [updatedText, setUpdatedText] = useState(todo.text);
  
  const [id, setUid] = useState(todo.id);
  const [text, setText] = useState(todo.text);

  const handleSaveTodo = () => {
    if(updatedText!=text){
      updateDoc(doc(database, 'user_tasks', id), {
        task_data: updatedText
      }).then(() => {
        console.log('updated')
      }).catch((error) => {
        console.log(error)
      })
    }
    else{
      updateDoc(doc(database, 'user_tasks', id), {
        task_data: text
      }).then(() => {
        console.log('updated')
      }).catch((error) => {
        console.log(error)
      })
    }
  };


  console.log(todo.id)

  return (
    <View>
          <TextInput
            style={styles.input}
            placeholder="Edit todo"
            value={updatedText}
            onChangeText={setUpdatedText}
          />
            <View style={styles.rowView}>
                    <TouchableOpacity style={ [styles.button, styles.buttonSave]} onPress={handleSaveTodo}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [styles.button, styles.buttonSave]} onPress={handleSaveTodo}>
                      <Text style={styles.textStyle}>Save</Text>
                    </TouchableOpacity>
                    </View>
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
  },
  rowView: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 16,
    alignSelf: 'center'
  }
});