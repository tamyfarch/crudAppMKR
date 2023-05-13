import "expo-router/entry";
import { StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from "expo-router";
import React, { useState, useEffect } from 'react';
import HomeScreen from "./pages/HomeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    
  /*const [todos, setTodos] = useState([]);
    
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
    */
  
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: '#D6DBB2'
                    },
                }}
            />
            <SafeAreaView style={styles.container}>
                <HomeScreen/>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
    }
});
