import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, ScrollView } from 'react-native';
import ListItem from './ListItem';
import EditItem from './EditItem';
import { Icon } from 'react-native-elements'
import { useRouter } from "expo-router";
import { collection, getDocs, deleteDoc, doc, where, query } from "firebase/firestore";
import { database } from '../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function List({ todos, setTodos }) {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user, 'user afsdfasdfasdfasdf')
  const [editTodo, setEditTodo] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [tasks, setTasks] = useState([])

  /*const deleteTask = (task) => {
    setTodos(todos.filter(el => el.id !== task.id))
    setDeleteTodo(null)
    setDeleteModalVisible(false)
  }*/

  const deleteTask = async (deleteTodo) => {
    try {
      await deleteDoc(doc(database, 'user_tasks', deleteTodo.id));
      console.log(item.id)
      const updatedTodos = todos.filter((todo) => todo.id !== deleteTodo.id);
      setTodos(updatedTodos);
      setDeleteTodo(null)
      setDeleteModalVisible(false)
      console.log('funciona')
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  /* updateDoc(doc(database, 'user_tasks'), {
    task_data: updatedTodos
  }).then(() => {
    setTodos(updatedTodos);
    setEditTodo(null);
    console.log('updated')
  }).catch((error) => {
    console.log(error)
  }) */

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
  };

  const handleDeleteTodo = (todo) => {
    setDeleteTodo(todo);
    setDeleteModalVisible(true)
  };

  const getData = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDocs(query(collection(database, "user_tasks"), where('uid','==', user.uid))).then(docSnap => {
          setTasks(docSnap.docs.map((item) => {
            return { ...item.data(), id: item.id }
        }))
    });
      }
    });
  }

  useEffect(() => {
    getData();
  }, [todos]);

  {/* Inicio modal para editar tarea */}
  if (modalVisible) {
    return <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.buttonText}>Edit Your Task</Text>
            <EditItem todo={editTodo} setModalVisible={setModalVisible}/>
          </View>
        </View>
      </Modal>
    </View>
  }
  {/* Fin modal para editar tarea */}

  return (
    <View>
      <Text style={styles.title}>My Tasks</Text>
      <ScrollView style={styles.contentContainer}>
      {tasks.map((item, index) => {
        return (
          <View key={index} style={styles.item}>
            <View style={styles.container}>
              <ListItem key={index} id={item.uid} text={item.task_data} />
              <TouchableOpacity style={styles.iconContainer} onPress={() => { handleEditTodo(item), setModalVisible(true) }}>
                <Icon style={styles.editIcon} name='edit' />
                <Text style={styles.deleteButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={() => {handleDeleteTodo(item)}}>
              <Icon name='delete' />
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>

            {/* Inicio modal para eliminar tarea */}
            {deleteModalVisible ?
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
                      onPress={() => {deleteTask(deleteTodo), setDeleteModalVisible(!deleteModalVisible)}}>
                      <Text style={styles.textStyle}>Eliminar</Text>
                    </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>:<View></View>
            }
            {/* Fin modal para eliminar tarea */}
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