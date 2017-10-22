export const TOGGLE_COLLAPSE = 'TOGGLE_COLLAPSE';

export function toggleCollapse(answerId) {
  return {
    type: TOGGLE_COLLAPSE,
    answerId,
  };
}

export const CLEAR_COLLAPSE = 'CLEAR_COLLAPSE';

export function clearCollapse(answerId) {
  return {
    type: CLEAR_COLLAPSE,
    answerId,
  };
}