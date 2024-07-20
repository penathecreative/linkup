// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import { useEffect } from "react-native";
import { useEffect } from "react";

//import firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Define a new state that represents the network connectivity status
import { useNetInfo } from "@react-native-community/netinfo";

import { LogBox, Alert } from "react-native";
LogBox.ignoreLogs([
  "[2024-07-17T15:43:49.208Z]  @firebase/auth: Auth (10.3.1)",
  "AsyncStorage has been extracted from",
]);

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC-uIPhBdiXehgMH0eWMyJvt8ucDlRlXkI",
    authDomain: "linkupapp-db7a8.firebaseapp.com",
    projectId: "linkupapp-db7a8",
    storageBucket: "linkupapp-db7a8.appspot.com",
    messagingSenderId: "292001710983",
    appId: "1:292001710983:web:882d4268c29fe8443a4922",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  //Disable Firestore when there’s no connection and enable it otherwise
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
        />

        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
