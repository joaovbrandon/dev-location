export const Types = {
  ADD_REQUEST: 'devs/ADD_REQUEST',
  ADD_SUCCESS: 'devs/ADD_SUCCESS',
  ADD_FAILURE: 'devs/ADD_FAILURE',
  REMOVE: 'devs/REMOVE',
};

const INITIAL_STATE = {
  data: [],
  requesting: false,
  error: false,
};

export default function devs(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case Types.ADD_SUCCESS:
      return {
        data: [...state.data, action.payload.dev],
        requesting: false,
        error: false,
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        requesting: false,
        error: true,
      };
    case Types.REMOVE:
      return {
        ...state,
        data: state.data.filter(dev => dev.id !== action.payload.dev.id),
      };
    default:
      return state;
  }
}

export const Creators = {
  addDevRequest: (user, cordinates) => ({
    type: Types.ADD_REQUEST,
    payload: { user, cordinates },
  }),

  addDevSuccess: dev => ({
    type: Types.ADD_SUCCESS,
    payload: { dev },
  }),

  addDevFailure: () => ({
    type: Types.ADD_FAILURE,
  }),

  removeDev: dev => ({
    type: Types.REMOVE,
    payload: { dev },
  }),
};
