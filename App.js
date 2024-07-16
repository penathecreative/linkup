// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import { StyleSheet } from "react-native";

//import firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "[2024-07-15T14:59:36.520Z]  @firebase/auth: Auth (10.3.1)",
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
              db={db}
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
