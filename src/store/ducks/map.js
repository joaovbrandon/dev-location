import { createActions, createReducer } from 'reduxsauce';
import { FlyToInterpolator } from 'react-map-gl';

export const { Types, Creators } = createActions(
  {
    moveMapTo: ['cordinates'],
    mapViewportChange: ['newViewport'],
  },
  { prefix: 'map/' },
);

const INITIAL_STATE = {
  viewport: {
    transitionInterpolator: new FlyToInterpolator(),
    transitionDuration: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: 0,
    latitude: 0,
    zoom: 1.5,
  },
};

export const moveMapTo = (state = INITIAL_STATE, action) => ({
  viewport: {
    ...state.viewport,
    longitude: action.cordinates.longitude,
    latitude: action.cordinates.latitude,
    transitionDuration: 3000,
    zoom: 12,
  },
});

export const mapViewportChange = (state = INITIAL_STATE, action) => ({
  viewport: {
    ...state.viewport,
    ...action.newViewport,
  },
});

export default createReducer(INITIAL_STATE, {
  [Types.MOVE_MAP_TO]: moveMapTo,
  [Types.MAP_VIEWPORT_CHANGE]: mapViewportChange,
});
