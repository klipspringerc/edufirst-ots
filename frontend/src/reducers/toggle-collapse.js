import {CLEAR_COLLAPSE, TOGGLE_COLLAPSE} from '../actions/toggle-collapse';

export default function collapse(state = {
  collapsed: [],
}, action) {
  switch (action.type) {
    case TOGGLE_COLLAPSE:
      return {
        ...state,
        collapsed: state.collapsed.map(c => c.answerId === action.answerId
            ? {
              ...c,
              collapsed: !c.collapsed,
            }
            : c),
      };
    case CLEAR_COLLAPSE:
      return {...state, collapsed: []};
    default:
      return state;
  }
}