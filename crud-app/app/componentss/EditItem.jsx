import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Modal, Pressable } from 'react-native';

export default function EditItem({ todo, onSaveTodo }) {
  const [text, setText] = useState(todo.text);

  const handleSaveTodo = () => {
    onSaveTodo({ ...todo, text })
  };

  return (
    <View>
          <TextInput
            style={styles.input}
            placeholder="Edit todo"
            value={text}
            onChangeText={setText}
          />
            <TouchableOpacity style={ [styles.button, styles.buttonSave]} onPress={handleSaveTodo}>
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