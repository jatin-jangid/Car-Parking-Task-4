// ParkingLotDrawing.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Touchable,
} from 'react-native';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {NoOfSpace} from '../Atom/ParkingLotCreation';
function ParkingLotDrawing({navigation}: any) {
  const NoOfSpaces = useRecoilValue(NoOfSpace);

  // Generate an array of parking spaces based on the user input
  const parkingSpaces = Array.from(
    {length: parseInt(NoOfSpaces)},
    (_, index) => index + 1,
  );

  const handleTilePress = () => {
    
    // Handle the tile click event
    console.log(`Tile ${NoOfSpaces} clicked`);
    navigation.navigate('EnterCarDetails', {
      tileNumber: NoOfSpaces,
    });
    // You can add logic to navigate or perform other actions here
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.headerText}>Parking Lot</Text>
            <TouchableOpacity
              onPress={() => handleTilePress()}
              style={styles.roundButton1}>
              <Text style={{fontSize: 22, color: 'black'}}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tilesContainer}>
            {parkingSpaces.map(spaceNumber => (
              <TouchableOpacity
                disabled={true}
                key={spaceNumber}
                style={styles.tile}>
                <Text style={styles.tileText}>{spaceNumber}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ParkingLotDrawing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
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
