import actions from './actions';
import {reduce} from '../helpers';

export default (state = {}, action) => reduce(state, action, {

  [actions.types.OPEN_MODAL]: () => ({
    ...state,
    [action.uniqueId]: {show: true},
  }),

  [actions.types.CLOSE_MODAL]: () => ({
    ...state,
    [action.uniqueId]: {show: false},
  }),
});
