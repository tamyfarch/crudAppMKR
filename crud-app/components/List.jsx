import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';

export default function List({ todos, setTodos }) {
    const deleteTask = (task) => {
        setTodos(todos.filter(el => el.id !== task.id))
    }
    const editItem = (task) => {
       setTodos(todos.find(todo => todo.id === task.id))
    }
    return (
        <>
            <Text style={styles.title}>Todo List</Text>
            {todos.map((item, index) => {
                return (
                    <>
                        <ListItem key={index} id={item.id} text={item.text} />
                        <TouchableOpacity >
                            <Text style={styles.deleteButton} onPress={() => deleteTask(item)}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Text style={styles.deleteButton} onPress={() => editItem(item)}>Edit</Text>
                        </TouchableOpacity>
                    </>
                )
            })}
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        marginBottom: 20,
    },
});
