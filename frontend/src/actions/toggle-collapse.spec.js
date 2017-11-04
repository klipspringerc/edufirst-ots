import {
  CLEAR_COLLAPSE,
  clearCollapse,
  TOGGLE_COLLAPSE,
  toggleCollapse,
} from './toggle-collapse';

const answerId = 1;
describe('toggle-collapse', () => {
  it('should create an action to toggle collapse', () => {
    const expectedAction = {type: TOGGLE_COLLAPSE, answerId};

    expect(toggleCollapse(answerId)).toEqual(expectedAction);
  });

  it('should create an action to clear collapse', () => {
    const expectedAction = {type: CLEAR_COLLAPSE, answerId};

    expect(clearCollapse(answerId)).toEqual(expectedAction);
  });
});