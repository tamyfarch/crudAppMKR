import { useRouter, useSearchParams } from "expo-router";
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Container, TouchableOpacity, Modal, Pressable, TextInput, Image } from "react-native";
import { Icon } from 'react-native-elements'
import BottomNav from "./componentss/BottomNavigation";
import EditUser from './componentss/EditUser';

export default function details() {
    const [editTodo, setEditTodo] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();
    const { name, lastname, username } = useSearchParams();
    console.log(name, username);

    const handleEditTodo = (todo) => {
        setEditTodo(todo);
      };

    if (editTodo) {
        return <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.buttonText}>Edit Your User Information</Text>
                <EditUser todo={editTodo} onSaveTodo={handleSaveTodo} />
              </View>
            </View>
          </Modal>
        </View>
      }

    return (
        <View style={styles.cooontainer}>
        <View style={styles.container}>
        <View style={styles.imageContainer}>
      <Image
        style={styles.tinyLogo}
        source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
      />
      </View>
            <View style={styles.rowContainer}>
                <Text style={styles.title}>My Profile</Text>
                <TouchableOpacity style={styles.iconContainer} onPress={() => { setModalVisible(true) }}>
                <Icon style={styles.editIcon} name='edit' />
              </TouchableOpacity>
            </View>
            <View style={styles.borderBottom}>
                <Text style={styles.userInfo}>Name</Text>
            </View>
            <View style={styles.borderBottom}>
                <Text style={styles.userInfo}>Username</Text>
            </View>
                <Text style={styles.userInfo}>Email</Text>
            {/*<Button title="Go back" onPress={() => router.back()} />*/}
            {modalVisible &&
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.buttonText}>Edit Your User Information</Text>
                    {/*Comienzo del componente para el edit user*/}
                    <View style={styles.inputContainer}>
                    <Text style={styles.textTitleEdit}>Name</Text>
                    <TextInput
            style={styles.input}
            placeholder="Edit Name"
          />
          <Text style={styles.textTitleEdit}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Edit Username"
          />
          <Text style={styles.textTitleEdit}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Edit Email"
          />
          </View>
          {/*Fin del componente para el edit user*/}
                    <View style={styles.rowView}>
                    <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={() => deleteTask(deleteTodo)}>
                      <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            }
        </View >
        <View style={styles.bottomNavContainer}>
            <BottomNav/>
        </View>
        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        paddingTop: 50,
      },
      tinyLogo: {
        width: 100,
        height: 100,
      },    
    borderBottom: {
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1,
        marginBottom: 16,
        width:'80%',
    },
    userInfo: {
        fontSize: 20,
        alignSelf: 'auto',
        color: 'gray',
        width: '100%',
        textAlign: 'center',
        marginBottom: 16
    },
    inputContainer: {
        textAlign: 'left',
        width: '100%'
    },
    textTitleEdit: {
        marginLeft: 4,
        color: 'gray'
    },
    input: {
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        padding: 16,
        marginVertical: 6,
      },
    cooontainer: {
        flex:1,
        justifyContent: 'space-between'
    },
    container: {
        padding: 20,
        paddingVertical: 50,
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 8,
        marginTop: "20%",
        alignItems: 'center',
        gap: 12
      },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
        alignSelf: "center",
        paddingBottom: 12,
      },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    buttonText: {
        color: '#051C60',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 24
      },
    editIcon: {
        color: 'white'
      },
    buttonSave: {
        backgroundColor: '#2196F3',
      },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100,
        alignSelf: 'center'
      },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    buttonOpen: {
        backgroundColor: '#F194FF',
      },
    buttonClose: {
        backgroundColor: '#2196F3',
      },
    rowView: {
        flexDirection: 'row',
        gap: 32,
        marginTop: 16
      }
});