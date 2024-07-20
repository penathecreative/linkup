# Linkup Chat App

Linkup is a mobile application designed to connect people through chat, creating friendships and fostering new relationships. Whether you're looking to chat with new friends or connect with potential partners, Linkup provides a platform to start conversations and build meaningful connections.

## Features

- **User Registration:** Enter your name and choose a background color for your chat interface.
- **Chat Interface:** Start chatting with others in a visually appealing and user-friendly environment.
- **Customizable Background:** Choose from a selection of background colors to personalize your chat experience.
- **Offline Support:** Continue using the app even when you lose internet connection.
- **Media Sharing:** Share images and your location in the chat.
- **Real-time Messaging:** Instant messaging using Firebase Firestore.
- **Anonymity:** Sign in anonymously to protect your identity.

## Technologies Used

- **React Native:** Framework for building native mobile applications using React.
- **React Navigation:** Library for navigation and routing.
- **Firebase:** Backend services including Firestore for real-time messaging and Firebase Storage for media file storage.
- **NetInfo:** Detects network connectivity.
- **Gifted Chat:** A fully customizable chat UI component.
- **AsyncStorage:** Local storage for caching messages.
- **Expo:** A framework and platform for universal React applications.

## Installation

To run the app locally:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install` or `yarn install`.
4. Start the Metro bundler with `npm start` or `yarn start`.
5. Use an iOS or Android simulator, or scan the QR code with the Expo Go app on your device to run the app.

## Error Handling

### Firebase Operations

- **Firestore Operations:** The app includes error handling for Firestore operations. If an error occurs while performing database operations, the app will log the error and show an alert message to the user.

### Network Connectivity

- **Network Status:** The app monitors the network status and disables Firestore operations when there is no internet connection. An alert message will be displayed to the user when the connection is lost.

### Media Permissions

- **Image Picker and Camera:** The app requests the necessary permissions before accessing the image library or camera. If the permissions are not granted, an alert message will be shown to the user.

### Location Services

- **Location Sharing:** The app requests the necessary permissions before accessing the user's location. If the permissions are not granted, an alert message will be shown to the user.

## Usage

1. **Sign In:** Start the app and enter your name. Choose a background color for your chat interface.
2. **Start Chatting:** Begin a conversation by navigating to the chat screen.
3. **Send Messages:** Type your message and hit send to chat with others.
4. **Share Media:** Use the custom actions to send images or share your location.
5. **Stay Connected:** The app will notify you if you lose internet connection and automatically re-enable Firestore operations when the connection is restored.

## Troubleshooting

- **Error: Element type is invalid:** Ensure all components are correctly imported and exported. Check that you haven't mixed up default and named imports.
- **Network Issues:** Verify your internet connection. The app will disable Firestore operations when there is no connection.
- **Permissions Issues:** Make sure you grant the necessary permissions for accessing media and location services.
