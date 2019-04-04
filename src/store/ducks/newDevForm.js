import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    showNewDevForm: ['cordinates'],
    hideNewDevForm: null,
  },
  { prefix: 'newDevForm/' },
);

const INITIAL_STATE = {
  visible: false,
  cordinates: {},
};

export const showNewDevForm = (state, action) => ({
  visible: true,
  cordinates: action.cordinates,
});

export const hideNewDevForm = () => INITIAL_STATE;

export default createReducer(INITIAL_STATE, {
  [Types.SHOW_NEW_DEV_FORM]: showNewDevForm,
  [Types.HIDE_NEW_DEV_FORM]: hideNewDevForm,
});
