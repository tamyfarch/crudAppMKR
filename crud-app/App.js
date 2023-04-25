import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import AddItem from './components/AddItem';
import List from './components/List';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('todos')
      .then(data => {
        if (data !== null) {
          setTodos(JSON.parse(data));
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos))
      .catch(error => {
        console.error(error);
      });
  }, [todos]);

  const handleAddTodo = text => {
    const newTodo = {
      id: Math.random().toString(), // generate a unique id using Math.random()
      text: text
    };
    setTodos([...todos, newTodo]);
  };


  return (
    <SafeAreaView style={styles.container}>
      <AddItem onAddTodo={handleAddTodo} />
      <List todos={todos} setTodos={setTodos} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});