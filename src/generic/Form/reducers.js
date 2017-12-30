import _ from 'lodash';
import actions from './actions';
import {reduce} from '../helpers';

export default (state = {}, action) => reduce(state, action, {

  [actions.types.CREATE_FORM]: () => ({
    ...state,

    [action.model]: {
      ...state[action.model],
      ...action.data,
    },
  }),

  [actions.types.CHANGE_FIELD]: () => ({
    ..._.set(Object.assign(state), action.model, action.value)
  }),


  [actions.types.RESET_FORM]: () => ({    ...state,

    [action.model]: {},
  }),
});
