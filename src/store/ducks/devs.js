import { createActions, createReducer } from 'reduxsauce';
import { toast } from 'react-toastify';

export const { Types, Creators } = createActions(
  {
    addDevRequest: ['user', 'cordinates'],
    addDevSuccess: ['dev'],
    addDevFailure: null,
    removeDev: ['dev'],
  },
  { prefix: 'devs/' },
);

const INITIAL_STATE = {
  data: [],
  requesting: false,
  error: false,
};

export const addDevRequest = (state = INITIAL_STATE) => ({
  ...state,
  requesting: true,
});

export const addDevSuccess = (state = INITIAL_STATE, action) => ({
  data: [...state.data, action.dev],
  requesting: false,
  error: false,
});

export const addDevFailure = (state = INITIAL_STATE) => ({
  ...state,
  requesting: false,
  error: true,
});

export const removeDev = (state = INITIAL_STATE, action) => {
  toast.success('Dev removed!', { position: toast.POSITION.TOP_RIGHT });
  return {
    ...state,
    data: state.data.filter(dev => dev.id !== action.dev.id),
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_DEV_REQUEST]: addDevRequest,
  [Types.ADD_DEV_SUCCESS]: addDevSuccess,
  [Types.ADD_DEV_FAILURE]: addDevFailure,
  [Types.REMOVE_DEV]: removeDev,
});
