import _ from 'lodash';
import reduce from '../helpers/reduce';
import actions from './actions';

export default (state = {}, action) => reduce(state, action, {
  [actions.types.TABLE_TOGGLE_SORTING]: () => ({
    ...state,

    [action.key]: {
      ...state[action.key],

      sorting: _.get(state[action.key], 'sorting.column') === action.column
        ? state[action.key].sorting.order === 'asc'
          ? {column: action.column, order: 'desc'}
          : {column: action.column, order: 'asc'}

        : {column: action.column, order: 'asc'},
    },
  }),

  [actions.types.SET_PAGINATION]: () => ({
    ...state,

    [action.key]: {
      ...state[action.key],

      pagination: {limit: action.limit, start: action.start},
    },
  }),
});
