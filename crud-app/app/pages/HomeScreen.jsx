import "expo-router/entry";
import { useRouter, useSearchParams } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Link, Stack } from "expo-router";
import { Icon } from 'react-native-elements'
import React, { useState, useEffect } from 'react';

import AddItem from '../componentss/AddItem';
import List from '../componentss/List';
import TopPage from '../componentss/TopPage';
import BottomNav from '../componentss/BottomNavigation';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
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
            
                <TopPage/>
                <AddItem onAddTodo={handleAddTodo} />
                <List todos={todos} setTodos={setTodos} />
            </SafeAreaView>
            <View style={styles.bottomNavContainer}>
                <BottomNav />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
        // backgroundColor: '#25292e',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // color: '#fff',
    },
    

});
