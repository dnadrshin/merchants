import keyMirror from 'keymirror';

const
  types = keyMirror({
    CREATE_FORM : null,
    CHANGE_FIELD: null,
    RESET_FORM  : null,
  }),

  createForm = (model, data) => ({model, data, type: types.CREATE_FORM}),
  changeField = (model, value) => ({model, value, type: types.CHANGE_FIELD}),
  resetForm = model => ({model, type: types.RESET_FORM});

export default {
  createForm, changeField, resetForm, types,
};
