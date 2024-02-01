import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ParkingLotCreation from './Screens/ParkingLotCreation';
import ParkingLotDrawing from './Screens/ParkingLotDrawing';
import EnterCarDetails from './Screens/EnterCarDetails';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ParkingLotCreation">
          <Stack.Screen
            name="ParkingLotCreation"
            component={ParkingLotCreation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ParkingLotDrawing"
            component={ParkingLotDrawing}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EnterCarDetails"
            component={EnterCarDetails}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
