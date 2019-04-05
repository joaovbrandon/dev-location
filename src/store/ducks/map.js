import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    moveMapTo: ['cordinates'],
  },
  { prefix: 'map/' },
);

const INITIAL_STATE = {
  moveMapToCordinates: {
    longitude: 0,
    latitude: 0,
  },
};

export const moveMapTo = (state, action) => ({
  moveMapToCordinates: {
    longitude: action.cordinates.longitude,
    latitude: action.cordinates.latitude,
    timestamp: Date.now(),
  },
});

export default createReducer(INITIAL_STATE, {
  [Types.MOVE_MAP_TO]: moveMapTo,
});
