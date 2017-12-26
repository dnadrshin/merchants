import keyMirror from 'keymirror';

const
  createForm = (model, data) => ({model, data, type: types.CREATE_FORM}),
  changeField = (model, value) => ({model, value, type: types.CHANGE_FIELD}),
  resetForm = model => ({model, type: types.RESET_FORM}),

types = keyMirror({
  CREATE_FORM: null,
  CHANGE_FIELD: null,
  RESET_FORM: null,
});

export default {createForm, changeField, resetForm, types};
