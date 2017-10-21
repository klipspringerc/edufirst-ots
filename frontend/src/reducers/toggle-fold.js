import {TOGGLE_FOLD} from '../actions/toggle-fold';

function toggleFold(state = {folded: true}, action) {
  if (action.type === TOGGLE_FOLD) {
    return {
      ...state,
      folded: !state.folded,
    };
  } else {
    return state;
  }
}

export default toggleFold;