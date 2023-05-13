import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { database } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function AddItem({ onAddTodo }) {
    const collectionRef = collection(database, "user_tasks");
    const [text, setText] = useState('');
    
    const handleAddTodo = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid
        onAddTodo(text);
        addDoc(collectionRef, {
            task_data: text,
            uid: uid
        })
        setText('');
    };
    
    

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a new task"
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#E57A44',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginLeft: 20,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#E57A44',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 16,
        marginRight: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
