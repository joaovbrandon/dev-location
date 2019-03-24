export const Types = {
  EXAMPLE: 'example/EXAMPLE',
  OTHER_EXAMPLE: 'example/OTHER_EXAMPLE',
};

const INITIAL_STATE = {
  example: null,
};

export default function example(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.EXAMPLE:
      return { ...state, example: action.payload.text };
    default:
      return state;
  }
}

export const Creators = {
  changeExample: text => ({
    type: Types.EXAMPLE,
    payload: { text },
  }),

  otherChangeExample: text => ({
    type: Types.OTHER_EXAMPLE,
    payload: { text },
  }),
};
