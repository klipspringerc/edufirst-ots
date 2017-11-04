import {
  CLEAR_FOLD,
  clearFoldAction,
  TOGGLE_FOLD,
  toggleFoldAction,
} from './toggle-fold';

describe('toggle-fold', () => {
  it('should create an action to toggle fold', () => {
    const expectedAction = {type: TOGGLE_FOLD};

    expect(toggleFoldAction()).toEqual(expectedAction);
  });

  it('should create an action to clear fold', () => {
    const expectedAction = {type: CLEAR_FOLD};

    expect(clearFoldAction()).toEqual(expectedAction);
  });
});