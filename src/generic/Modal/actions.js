import keyMirror from 'keymirror';

const
  types = keyMirror({
    OPEN_MODAL : null,
    CLOSE_MODAL: null,
  }),

  openModal = uniqueId => ({uniqueId, type: types.OPEN_MODAL}),
  closeModal = uniqueId => ({uniqueId, type: types.CLOSE_MODAL});

export default {openModal, closeModal, types};
