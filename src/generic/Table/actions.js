import keyMirror from 'keymirror';

const
  types = keyMirror({
    TABLE_TOGGLE_SORTING: null,
    SET_PAGINATION: null,
  }),

  setPagination = (key, limit, start) => ({key, limit, start, type: types.SET_PAGINATION}),
  toggleSorting = (key, column) => ({column, key, type: types.TABLE_TOGGLE_SORTING});

export default {types, setPagination, toggleSorting};
