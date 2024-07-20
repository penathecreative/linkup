import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { userID } = route.params;

  const { name, background } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      // Create a query to get the "messages" collection from the Firestore database
      navigation.setOptions({ title: name });

      // Create a query to get the "messages" collection from the Firestore database
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );
      // Unsubscribe function of onSnapshot()
      unsubMessages = onSnapshot(messagesQuery, (documentsSnapshot) => {
        let newMessages = [];
        // Iterate through each document in the snapshot
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    //Clean Up Code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Call this function if the isConnected prop turns out to be false in useEffect()
  const loadCachedMessages = async () => {
    // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn’t been set yet in AsyncStorage.
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const renderCustomActions = (props) => {
    return (
      <CustomActions
        storage={storage}
        userID={userID}
        {...props}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" || Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Chat.propTypes = {
  db: PropTypes.object.isRequired,
  storage: PropTypes.object.isRequired, // Added this line
  route: PropTypes.shape({
    params: PropTypes.shape({
      userID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default Chat;
