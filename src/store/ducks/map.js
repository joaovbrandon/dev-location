import { FlyToInterpolator } from 'react-map-gl';

export const Types = {
  MOVE_TO: 'map/MOVE_TO',
  VIEWPORT_CHANGE: 'map/VIEWPORT_CHANGE',
};

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

export default function map(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.MOVE_TO:
      return {
        viewport: {
          ...state.viewport,
          longitude: action.payload.cordinates.longitude,
          latitude: action.payload.cordinates.latitude,
          transitionDuration: 3000,
          zoom: 12,
        },
      };
    case Types.VIEWPORT_CHANGE:
      return {
        viewport: {
          ...state.viewport,
          ...action.payload.newViewport,
        },
      };
    default:
      return state;
  }
}

export const Creators = {
  moveMapTo: cordinates => ({
    type: Types.MOVE_TO,
    payload: { cordinates },
  }),

  mapViewportChange: newViewport => ({
    type: Types.VIEWPORT_CHANGE,
    payload: { newViewport },
  }),
};
