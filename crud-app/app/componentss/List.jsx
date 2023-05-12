import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, ScrollView } from 'react-native';
import ListItem from './ListItem';
import EditItem from './EditItem';
import { Button, Icon } from 'react-native-elements'
import { Stack, usePathname, useRouter, useSearchParams } from "expo-router";

export default function List({ todos, setTodos }) {
  const [editTodo, setEditTodo] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const router = useRouter();

  const deleteTask = (task) => {
    setTodos(todos.filter(el => el.id !== task.id))
    setDeleteTodo(null)
    setDeleteModalVisible(false)
  }

  const handleSaveTodo = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    setEditTodo(null);
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
  };

  const handleDeleteTodo = (todo) => {
    setDeleteTodo(todo);
    setDeleteModalVisible(true)
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
            <Text style={styles.buttonText}>Edit Your Task</Text>
            <EditItem todo={editTodo} onSaveTodo={handleSaveTodo} />
          </View>
        </View>
      </Modal>
    </View>
  }

  return (
    <View>
      <Text style={styles.title}>My Tasks</Text>
      <ScrollView style={styles.contentContainer}>
      {todos.map((item, index) => {
        return (
          <View key={index} style={styles.item}>
            <View style={styles.container}>
              <ListItem key={index} id={item.id} text={item.text} />
              <TouchableOpacity style={styles.iconContainer} onPress={() => { handleEditTodo(item), setModalVisible(true) }}>
                <Icon style={styles.editIcon} name='edit' />
                <Text style={styles.deleteButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={() => {setDeleteTodo(item), setDeleteModalVisible(true)}}>
              <Icon name='delete' />
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
            {deleteModalVisible &&
              <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.buttonText}>Estas seguro que quiere eliminar esta tarea</Text>
                    <View style={styles.rowView}>
                    <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={() => deleteTask(deleteTodo)}>
                      <Text style={styles.textStyle}>Eliminar</Text>
                    </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            }
          </View>
        )
      })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentContainer: {
    marginBottom: 200
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 32
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#BCD8C1',
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 8
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
})