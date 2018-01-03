import keyMirror from 'keymirror';

const
  types = keyMirror({
    MERCHANTS_SUCCESS: null,
    MERCHANTS_FETCH  : null,
  }),

  merchantsSuccess = data => ({data, type: types.MERCHANTS_SUCCESS}),
  merchantsFetch = () => ({type: types.MERCHANTS_FETCH}),

  getMerchants = params => dispatch => {
    dispatch(merchantsFetch());

    return fetch(`/API/merchants?${new URLSearchParams(Object.entries(params)).toString()}`)
      .then(resp => resp.json())
      .then(merchants => dispatch(merchantsSuccess(merchants)));
  };

export default {getMerchants, merchantsSuccess, types};
