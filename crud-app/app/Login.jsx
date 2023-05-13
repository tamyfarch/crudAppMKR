import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import BottomNav from "./componentss/BottomNavigation";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const { email, password } = data;
      console.log({ email, password });
      const user = await signInWithEmailAndPassword(auth, email, password);

      console.log(user);
      if (user) {
        router.push('/')
      }

    } catch (e) {
      console.log(e);
      Alert.alert("Oops", e.message);
    }
    setLoading(false);
  };

  const onSignUpPress = () => {
    router.push("/SignUp");
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Login</Text>
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password should be minimum 3 characters long",
              },
            }}
          />

          <CustomButton
            text={loading ? "Loading..." : "Sign In"}
            onPress={handleSubmit(onSignInPressed)}
          />

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    paddingVertical: 50,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 8,
    marginTop: "40%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
    alignSelf: "center",
    paddingBottom: 16,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default login;
