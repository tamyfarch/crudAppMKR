import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ListItem({ text }) {
    return (
        <View>
            <Text style={styles.todo}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    todo: {
        fontSize: 24,
        marginBottom: 10,
    },
});
