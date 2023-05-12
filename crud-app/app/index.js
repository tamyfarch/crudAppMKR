import "expo-router/entry";
import { useRouter, useSearchParams } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Link, Stack } from "expo-router";
import { Icon } from 'react-native-elements'
import React, { useState, useEffect } from 'react';
import HomeScreen from "./pages/HomeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

//generate array of 10 tasks with details
const tasks = Array.from({ length: 10 }, (v, i) => ({
    id: i,
    title: `Task ${i}`,
    description: `This is the description of task ${i}`,
    completed: false,
}));

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
        id: Math.random().toString(), 
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
            {/*
            <Text style={{ color: 'black' }} > Home </Text>
            <StatusBar style="auto" />
            <Link href={'/details?name=pepe&lastname=perez'} >
                Go to details
            </Link>*/}
            

            {/* 
            //duplicado
            <Link href={'/details?name=pepe&lastname=perez'} >
                Go to details
            </Link>

            <Link href={{ pathname: '/details', params: { name: 'john', lastname: 'doe' } }} >
                Go to details
            </Link>
            <Link href={{ pathname: '/pepe', params: { name: 'john', lastname: 'doe' } }} >
                Go to dynamic route
            </Link> */}

            {/* {tasks.map((task) => (
                <Link key={task.id} href={{ pathname: `/${task.id}`, params: { ...task } }} >
                    <Text style={{ }} > {task.title} </Text>
                </Link>
            ))} */}
            {/*<Link href={{ pathname: '/login', params: { title: 'users', description: 'this is the users page' } }} >
                <Text style={{  }} > login </Text>
        </Link>
            <SafeAreaView style={styles.container}>
                <TopPage/>
                <AddItem onAddTodo={handleAddTodo} />
                <List todos={todos} setTodos={setTodos} />
            </SafeAreaView>
            <SafeAreaView style={styles.bottomNavContainer}>
                <BottomNav/>
            </SafeAreaView>*/}
            <SafeAreaView style={styles.container}>
                <HomeScreen/>
            </SafeAreaView>
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
    }
});
