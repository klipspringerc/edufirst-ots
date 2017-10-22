import {CLEAR_FOLD, TOGGLE_FOLD} from '../actions/toggle-fold';

function toggleFold(state = {folded: true}, action) {
  switch (action.type) {
    case TOGGLE_FOLD:
      return {...state, folded: !state.folded};
    case CLEAR_FOLD:
      return {...state, folded: true};
    default:
      return state;
  }
}

export default toggleFold;