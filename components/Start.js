import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState(""); // State to hold the name input value
  const [background, setBackground] = useState(""); // State to hold selected background color
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"]; // List of available colors
  const auth = getAuth(); // Firebase Authentication handler

  //function that will alow users to sign-in anonymously
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          background: background,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/background-image.png")}
        style={styles.imageBackground}
      >
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
          <Text style={styles.chooseBgColor}>Choose Background Color</Text>
          {/* User selects background color */}
          <View style={styles.colorButtonContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selectedColor,
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "88%",
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontWeight: "300",
    fontSize: 16,
    opacity: 50,
  },
  chooseBgColor: {
    fontSize: 16,
    marginBottom: 10,
    color: "#FFFFFF",
    fontWeight: "300",
    opacity: 100,
  },
  colorButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  button: {
    width: "88%",
    padding: 15,
    backgroundColor: "#841584",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Start;
