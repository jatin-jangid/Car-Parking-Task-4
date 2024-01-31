import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
function EnterCarDetails({route, navigation}: any) {
  const {tileNumber} = route.params;
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
        }}>
        <View>
          <Text style={{color: 'white', marginBottom: 10}}>
            Enter Car's Registration Number
          </Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={'grey'}
            placeholder="Registration Number"
            keyboardType="numeric"
            // onChangeText={setParkingNumber}
            // value="ParkingNumber"
          />
        </View>
        <View>
          <Text style={{color: 'white', marginBottom: 10}}>Parkin Time</Text>
          <View style={styles.timeView}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'grey'}
              placeholder="Time"
              keyboardType="numeric"
              // onChangeText={setParkingNumber}
              // value="ParkingNumber"
            />
            {/* <TouchableOpacity
              //   onPress={handleOnPress}
              style={styles.button}>
              <Text>SUBMIT</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <Text style={{color: 'white'}}>Tile Number</Text>
        <Text style={{color: 'white'}}>{tileNumber}</Text> */}
      </View>
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
    backgroundColor: 'lightgreen',
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
});
