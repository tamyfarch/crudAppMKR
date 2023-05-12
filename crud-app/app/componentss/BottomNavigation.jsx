import React from 'react';
import { Pressable, StyleSheet, View} from 'react-native';
import { Link } from "expo-router";
import { Icon } from 'react-native-elements'
import { getAuth } from "firebase/auth";

export default function BottomNav() {
  const auth = getAuth();
  const user = auth.currentUser;

  const logOut = () => {
    auth.signOut()
  }
    return (
        <View style={styles.bottomNavContainer}>
            <View style={styles.itemContainer}>
              <Icon style={styles.iconWhite} name='person' />
              <Link href={'/details?name=pepe&lastname=perez'} >
                Details
              </Link>
            </View>
            <View style={styles.itemContainer}>
              <Icon name='home' />
              <Link href={ {pathname: '/'}} >
                Home
              </Link>
            </View>
            {auth ? <View style={styles.itemContainer}>
              <Icon name='login' />
              <Link href={{ pathname: '/login', params: { title: 'users', description: 'this is the users page' } }} >
                Login
              </Link>
            </View> : <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={() => {logOut()}}>
                      <Text style={styles.textStyle}>Log Out</Text>
                    </Pressable>}
            
            </View>
    );
}

const styles = StyleSheet.create({
    bottomNavContainer: {
        flexDirection: 'row',
        height:100,
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#D6DBB2'
    },
    itemContainer: {
        marginHorizontal: 28,
        alignItems:'center',
        width: 80,
        backgroundColor: '#ADB573',
        paddingVertical: 8,
        borderRadius: 16,
    },
});
