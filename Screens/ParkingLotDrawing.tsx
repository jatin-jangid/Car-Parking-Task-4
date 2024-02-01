// ParkingLotDrawing.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Touchable,
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {parkingSpace} from '../Atom/ParkingLotCreation';
import {ParkingObject, parkingState} from '../Atom/ParkingState';

function ParkingLotDrawing({navigation}: any) {
  const NoOfSpaces = useRecoilValue(parkingSpace);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [parkingData, setParkingData] = useRecoilState(parkingState);
  const [index, setIndex] = useState(0);
  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString(),
  );
  // Generate an array of parking spaces based on the user input
  const parkingSpaces = Array.from(
    {length: parseInt(NoOfSpaces)},
    (_, index) => index + 1,
  );
  const convertToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const calculateFare = () => {
    // Assuming parked time is fixed at 1:00 PM
    const ParkedAt = parkingData[index].parked_at;

    // Convert times to minutes for easier calculation
    const parkedTimeMinutes = convertToMinutes(ParkedAt);
    const currenttime = convertToMinutes(currentTime.toString());

    // Calculate hours parked
    const hoursParked = (currenttime - parkedTimeMinutes) / 60;

    // Calculate fare based on the rules
    let calculatedFare = 10; // Initial fare for the first 2 hours
    if (hoursParked > 2) {
      // Additional fare for each consecutive hour
      calculatedFare += 10 * Math.floor(hoursParked - 2);
    }
    console.log('This is calculated fare', calculatedFare);
    setFare(calculatedFare);
  };
  useEffect(() => {
    // const currentTime = new Date(); // Get the current time
    let intervalId: NodeJS.Timeout | null = null;
    calculateFare();
    if (showModal) {
      intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
    }
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [showModal]);

  // console.log('Status', parkingData);

  const handleAddVehicleToParking = () => {
    const availableParking = parkingData.filter(obj => !obj.parked);
    if (availableParking.length === 0) {
      Alert.alert('Alert', 'No available parking spots');
      return;
    }

    const randomTile = Math.floor(Math.random() * availableParking.length);

    const randomSelectedParkingSpot = availableParking[randomTile];
    console.log(
      'Randomly Selected Parking spot is : ',
      randomSelectedParkingSpot.id,
    );
    // Handle the tile click event`
    // console.log('Parking status', randomSelectedParkingSpot.parked);
    navigation.navigate('EnterCarDetails', {
      tileNumber: randomSelectedParkingSpot.id,
    });
    // You can add logic to navigate or perform other actions here
  };

  const handlePaymentForParking = () => {
    setLoading(true);
    fetchPay();
    setTimeout(paymentProcessCompleted, 2000);
  };

  const renderParkingSpace = ({item}: {item: ParkingObject}) => {
    return (
      <TouchableOpacity
        disabled={!item.parked}
        key={item.id}
        style={[
          styles.tile,
          {backgroundColor: item.parked ? 'gray' : 'lightgreen'},
        ]}
        onPress={() => {
          setIndex(item.id - 1);
          setShowModal(!showModal);
        }}>
        <Text style={styles.tileText}>{item.id}</Text>
      </TouchableOpacity>
    );
  };

  const fetchPay = () => {
    // const index = /* specify the index */;
    const url = 'https://httpstat.us/200';
    const data = {
      'car-registration': parkingData[index].reg_no,
      charge: fare,
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      // .then(response => response.json())
      .then(Response => {
        console.log('This is response : ', Response);
      })
      .catch(error => {
        console.error('Error during fetchPay:', error);
      });
  };

  const paymentProcessCompleted = () => {
    setParkingData(prevParkingData => {
      return prevParkingData.map(parkingObj =>
        parkingObj.id === index + 1
          ? {
              ...parkingObj,
              parked: false,
              parked_at: '',
              reg_no: null,
            }
          : parkingObj,
      );
    });
    setLoading(false);
    setShowModal(!showModal);
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView */}
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.headerText}>Parking Lot</Text>
          <TouchableOpacity
            onPress={() => handleAddVehicleToParking()}
            style={styles.roundButton1}>
            <Text style={{fontSize: 22, color: 'black'}}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tilesContainer}>
          <FlatList
            data={parkingData}
            renderItem={renderParkingSpace}
            keyExtractor={item => String(item.id)}
            numColumns={4} // Set the number of columns as per your design
          />
        </View>
      </View>

      {/* MODAL */}

      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>
          <Text style={{color: 'white', fontSize: 30, marginBottom: 40}}>
            Parking Details
          </Text>
          <Text style={{color: 'white', fontSize: 18}}>
            Registration Number :{' '}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'green',
              marginBottom: 15,
              fontWeight: '500',
            }}>
            {parkingData[index].reg_no}
          </Text>
          <Text style={{color: 'white', fontSize: 18}}>Parked Time :</Text>
          <Text
            style={{
              fontSize: 18,
              color: 'green',
              marginBottom: 15,
              fontWeight: '500',
            }}>
            {parkingData[index].parked_at}
          </Text>
          <Text style={{color: 'white', fontSize: 18}}>Current Time :</Text>
          <Text
            style={{
              fontSize: 18,
              color: 'green',
              marginBottom: 15,
              fontWeight: '500',
            }}>
            {currentTime.toString()}
          </Text>
          <Text style={{color: 'white', fontSize: 18}}>Fare : </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'green',
              marginBottom: 15,
              fontWeight: '500',
            }}>
            {fare}
          </Text>
          {loading ? (
            <View style={styles.modalbutton}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.modalbutton}
              onPress={handlePaymentForParking}>
              <Text style={styles.modalbuttontext}>Pay</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      {/* </ScrollView */}
    </View>
  );
}

export default ParkingLotDrawing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'black',
  },
  modalContainer: {
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
    // flexDirection: 'row',
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
    // backgroundColor: 'lightgreen',
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
  modalbutton: {
    backgroundColor: 'lightpink',
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 15,
    // borderWidth: 2,
    borderRadius: 10,
  },
  modalbuttontext: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
  },
});
