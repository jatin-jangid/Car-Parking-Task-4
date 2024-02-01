import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {parkingState} from '../Atom/ParkingState';
import {parkingSpace} from '../Atom/ParkingLotCreation';
function EnterCarDetails({route, navigation}: any) {
  const {tileNumber} = route.params;
  const [carRegistration, setCarRegistration] = useState('');
  const [parkingData, setParkingData] = useRecoilState(parkingState);
  //   const {data} = route.params;

  const [parkingTime, setParkingTime] = useState('');
  const regex = /[A-Z]{2}\d{2}[A-Z]{2}\d{4}/;

  const handleSetCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setParkingTime(currentTime);
  };

  const handleSubmit = () => {
    // console.log('Car reg', carRegistration);
    // console.log('park time', parkingTime);
    if (regex.test(carRegistration)) {
      setParkingData(prevParkState => {
        return prevParkState.map(parkingSpace => {
          if (parkingSpace.id === tileNumber) {
            return {
              ...parkingSpace,
              parked: true,
              parked_at: parkingTime,
              reg_no: carRegistration,
            };
          } else {
            return parkingSpace;
          }
        });
      });
      navigation.navigate('ParkingLotDrawing');
      //   navigate('/lot');
    } else {
      Alert.alert('Alert', 'Enter valid Registration number');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          borderColor: 'white',
          borderWidth: 1,
          height: 300,
          width: '90%',
          padding: 30,
          borderRadius: 10,
          margin: 10,
        }}>
        <View>
          <Text style={{color: 'white', marginBottom: 10}}>
            Enter Car's Registration Number
          </Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={'grey'}
            placeholder="MP09VC5952"
            value={carRegistration}
            onChangeText={RegistrationNumber => {
              setCarRegistration(RegistrationNumber);
            }}
          />
        </View>
        <View>
          <Text style={{color: 'white', marginBottom: 10}}>Parking Time</Text>
          <View>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'grey'}
              value={parkingTime}
              //   editable={false}
              placeholder="Time"
            />
            <TouchableOpacity
              onPress={handleSetCurrentTime}
              style={styles.button}>
              <Text style={{color: 'black'}}>Get Time</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={{color: 'white'}}>Tile Number</Text>
        <Text style={{color: 'white'}}>{tileNumber}</Text> */}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={carRegistration.length == 0 || parkingTime === ''}>
        <Text style={styles.buttonText}>Park</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EnterCarDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  timeView: {
    flexDirection: 'row',
  },

  button: {
    backgroundColor: 'lightyellow',
    width: 150,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    // marginTop: 10,
    alignSelf: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: 'lightgreen',
    width: 60,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  tileText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    // color: '#ffffff',
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
});
