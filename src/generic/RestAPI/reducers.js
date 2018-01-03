import actions from './actions';
import {reduce} from '../helpers';

export default (state = {loading: false}, action) => reduce(state, action, {
  [actions.types.MERCHANTS_SUCCESS]: () => ({
    ...state,
    data   : action.data,
    loading: false,
  }),

  [actions.types.MERCHANTS_FETCH]: () => ({
    ...state,
    loading: true,
  }),
});

