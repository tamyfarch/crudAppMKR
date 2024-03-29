import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Modal, Pressable } from 'react-native';
import { updateDoc, doc } from "firebase/firestore";
import { database } from '../../firebase';


export default function EditItem({ todo, setModalVisible }) {
  const [updatedText, setUpdatedText] = useState(todo.text);
  
  const [id, setUid] = useState(todo.id);
  const [text, setText] = useState(todo.text);

  const handleSaveTodo = () => {
    if(updatedText!=text){
      updateDoc(doc(database, 'user_tasks', id), {
        task_data: updatedText
      }).then(() => {
        console.log('updated')
        setModalVisible(false)
      }).catch((error) => {
        console.log(error)
      })
    }
    else{
        setModalVisible(false)
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