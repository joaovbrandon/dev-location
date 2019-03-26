export const Types = {
  SHOW: 'newDevForm/SHOW',
  HIDE: 'newDevForm/HIDE',
};

const INITIAL_STATE = {
  visible: false,
  cordinates: {},
};

export default function newDevForm(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.SHOW:
      return {
        visible: true,
        cordinates: action.payload.cordinates,
      };
    case Types.HIDE:
      return {
        visible: false,
        cordinates: {},
      };
    default:
      return state;
  }
}

export const Creators = {
  showNewDevForm: cordinates => ({
    type: Types.SHOW,
    payload: { cordinates },
  }),

  hideNewDevForm: () => ({
    type: Types.HIDE,
  }),
};
