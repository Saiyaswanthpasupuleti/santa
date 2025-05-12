import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventProvider } from "./context/eventContext";

// Screens
import OrganizerScreen from "./OrganizerPage";
import ExcelUploadScreen from "./Excelsheet";
// import ParticipantList from "./ParticipantList"; // Optional

const Stack = createNativeStackNavigator();

export default function App() {
  const handleAuth = () => {
    console.log("✅ Authenticated successfully!");
  };

  return (
    <EventProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateEvent">
          <Stack.Screen
            name="CreateEvent"
            options={{ headerShown: false }}
          >
            {() => <OrganizerScreen onAuth={handleAuth} />}
          </Stack.Screen>

          <Stack.Screen
            name="ExcelUpload"
            component={ExcelUploadScreen}
            options={{ headerShown: false }}
          />

          {/* Optional route
          <Stack.Screen
            name="ParticipantsScreen"
            component={ParticipantList}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
  );
}
