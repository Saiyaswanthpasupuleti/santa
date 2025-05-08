import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrganizerScreen from './OrganizerPage';
const Stack = createNativeStackNavigator();
import ExcelUploadScreen from './Excelsheet';
export default function App() {
  const handleAuth = () => {
    console.log("Authenticated!");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Organizer" options={{ headerShown: false }}>
          {(props) => <OrganizerScreen {...props} onAuth={handleAuth} />}
        </Stack.Screen> */}
      /  <Stack.Screen name="ExcelScreen" component={ExcelUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
