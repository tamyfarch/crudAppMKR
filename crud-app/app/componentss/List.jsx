import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, ScrollView } from 'react-native';
import ListItem from './ListItem';
import EditItem from './EditItem';
import { Button, Icon } from 'react-native-elements'
import { Stack, usePathname, useRouter, useSearchParams } from "expo-router";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, where, query } from "firebase/firestore";
import { app, database } from '../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function List({ todos, setTodos }) {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user, 'user afsdfasdfasdfasdf')
  const collectionRef = collection(database, "user_tasks");
  const [editTodo, setEditTodo] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [tasks, setTasks] = useState([])
  const [ taskId, setTaskId ] = useState('')
  const router = useRouter();

/*   const uid = user.uid */

  /*const deleteTask = (task) => {
    setTodos(todos.filter(el => el.id !== task.id))
    setDeleteTodo(null)
    setDeleteModalVisible(false)
  }*/

  const deleteTask = async (deleteTodo) => {
    try {
      // Delete the document with the specified ID
      await deleteDoc(doc(database, 'user_tasks', deleteTodo.id));
      console.log(item.id)
      // Remove the deleted task from the list of tasks
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

 /*  const getData = () => {
    getDocs(collectionRef)
    .then((response) => {
      setTasks(response.docs.map((item) => {
          return item.data()
      }))
    })
  } */

  const getData = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        getDocs(query(collection(database, "user_tasks"), where('uid','==', user.uid))).then(docSnap => {
          setTasks(docSnap.docs.map((item) => {
            return { ...item.data(), id: item.id }
        }))
    });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    
  }

  useEffect(() => {
    getData();
  }, [todos]);


  console.log(tasks, 'tasks')

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
            <EditItem todo={editTodo} />
          </View>
        </View>
      </Modal>
    </View>
  }

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