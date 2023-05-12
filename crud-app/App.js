import { Index } from '../crud-app/app/index'
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from 'react';

export default function App() {  
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Index/>
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
