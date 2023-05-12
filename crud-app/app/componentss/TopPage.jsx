import React, { useState } from 'react';
import { useRouter, useSearchParams } from "expo-router";
import { TouchableOpacity, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { getAuth } from "firebase/auth";

export default function TopPage() {
    const [open, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen ? setIsOpen(false) :
        setIsOpen(true)
    };

    const handleAddTodo = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        user.signOut()
    };
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            navigate('Auth');
        } catch (e) {
            console.log(e);
        }
    }
    const { name, lastname, username } = useSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Hola {name}!</Text>
            <TouchableOpacity style={styles.button} onPress={signOutUser()}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 30
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        marginLeft: 20,
        marginTop: 20,
    },
});
