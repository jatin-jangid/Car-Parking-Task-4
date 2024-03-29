import {atom, selector, useRecoilValue} from 'recoil';
import {parkingSpace} from './ParkingLotCreation';

export interface ParkingObject {
  id: number;
  parked: boolean;
  parked_at: string; // Can be null or a timestamp (date.now())
  reg_no: null | string; // Can be null or a string
}

export const initializeParkingState = selector<ParkingObject[]>({
  key: 'initializeParkingState',
  get: ({get}) => {
    const spaces = get(parkingSpace);
    //@ts-ignore
    return Array.from({length: spaces}, (_, index) => ({
      id: index + 1, // Assuming ids start from 1
      parked: false,
      parked_at: '',
      reg_no: null,
    }));
  },
});

export const parkingState = atom<ParkingObject[]>({
  key: 'parkingState',
  default: initializeParkingState,
});
