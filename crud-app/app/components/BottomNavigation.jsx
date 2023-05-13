
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Link } from "expo-router";
import { Icon } from "react-native-elements";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default function BottomNav() {
  const [logOutButton, setLogOutButton] = useState(true);
  const [modalLogOutButton, setModalLogOutButton] = useState(false);

  const handleModalLogout = () => {
    if(logOutButton){
      setModalLogOutButton(!modalLogOutButton);
    }
    else{
      setModalLogOutButton(!modalLogOutButton);
    }
  };
  const handlelogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setLogOutButton(!logOutButton);
      } else {
        setLogOutButton(logOutButton);
      }
    });
  }, []);

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.itemContainer}>
        <Icon style={styles.iconWhite} name="person" />
        <Link href={"/Profile"}>Profile</Link>
      </View>
      <View style={styles.itemContainer}>
        <Icon name="home" />
        <Link href={{ pathname: "/" }}>Home</Link>
      </View>
      {logOutButton ? (
        <View style={styles.itemContainer}>
          <Icon name="login" />
          <Link
            href={{
              pathname: "/Login",
              params: { title: "users", description: "this is the users page" },
            }}
          >
            Login
          </Link>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleModalLogout}
        >
          <Icon name="logout" />
          <Text>Log Out</Text>
        </TouchableOpacity>
      )}
      {modalLogOutButton && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLogOutButton}
          onRequestClose={() => {
            setModalLogOutButton(!modalLogOutButton);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.buttonText}>
                Are you sure you want to log out?
              </Text>
              <View style={styles.rowView}>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => setModalLogOutButton(!modalLogOutButton)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {handlelogout, setModalLogOutButton(!modalLogOutButton)}}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavContainer: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D6DBB2",
  },
  itemContainer: {
    marginHorizontal: 28,
    alignItems: "center",
    width: 80,
    backgroundColor: "#ADB573",
    paddingVertical: 8,
    borderRadius: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#051C60",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 24,
  },
  editIcon: {
    color: "white",
  },
  buttonSave: {
    backgroundColor: "#2196F3",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  rowView: {
    flexDirection: "row",
    gap: 32,
    marginTop: 16,
  },
});

