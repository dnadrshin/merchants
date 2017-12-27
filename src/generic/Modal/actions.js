import keyMirror from 'keymirror';

const
  openModal = uniqueId => ({uniqueId, type: types.OPEN_MODAL}),
  closeModal = uniqueId => ({uniqueId, type: types.CLOSE_MODAL}),

types = keyMirror({
  OPEN_MODAL: null,
  CLOSE_MODAL: null,
});

export default {openModal, closeModal, types};
