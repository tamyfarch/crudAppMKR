import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from "../../firebase";

export default function TopPage() {
    const [name, setName] = useState([])

    const auth = getAuth();

    const getData = () => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            getDocs(query(collection(database, "users"), where('uid', '==', user.uid))).then(docSnap => {
              setName(docSnap.docs.map((item) => {
                return { ...item.data(), id: item.id }
              }))
            });
          } 
        });
    
      }

      useEffect(() => {
        getData();
      }, []);


    return (
        <View style={styles.container}>
            {name.map((item, index) => {
          return (
            <Text style={styles.title} key={index} id={item.uid}>Welcome {item.name}</Text>
          )
        })}
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
