import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {NoOfSpace} from '../Atom/ParkingLotCreation';
function ParkingLotCreation({navigation}: any) {
  // const [ParkingNumber, setParkingNumber] = useState('');
  const [ParkingNumber, setParkingNumber] = useRecoilState<string>(NoOfSpace);
  const handleOnPress = () => {
    if (ParkingNumber == '0' || ParkingNumber.length === 0) {
      return;
    } else {
      navigation.navigate('ParkingLotDrawing');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={'grey'}
        placeholder="Enter Parking Spaces you want"
        keyboardType="numeric"
        onChangeText={setParkingNumber}
        // value="ParkingNumber"
      />
      <TouchableOpacity
        onPress={handleOnPress}
        style={
          ParkingNumber.length == 0 ? styles.disabledButton : styles.button
        }>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ParkingLotCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 300,
  },
  button: {
    backgroundColor: 'lightgreen',
    width: 150,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: 'grey',
    width: 150,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    // color: '#ffffff',
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
});
