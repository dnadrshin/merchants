import React from 'react';
import Form from '../';
import InputField from '../InputField';
import CheckBoxField from '../CheckBoxField';
import {createStore, combineReducers} from 'redux';
import formReducer from '../reducers';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() })

const
  data = {
    id: '1',
    firstname: 'sdfdsf',
    lastname: 'sdfsdf',
    avatarUrl: 'http://sdsfd.com',
    email: 'sdfsf@sdsdf.com',
    phone: '34534345',
    hasPremium: true,
    bids: [
      {
        id: '1',
        carTitle: 'BMW',
        amount: 10,
        created: 'somedate'
      },
      {
        id: '2',
        carTitle: 'VW',
        amount: 10,
        created: 'somedate'
      },
      {
        id: '3',
        carTitle: 'Mers',
        amount: 10,
        created: 'somedate'
      },
    ]
  },

  store = createStore(combineReducers({
    form: formReducer,
  })),

  instance = Enzyme.mount(<Provider store={store}>
    <Form model="editModal" data={data} >
      <InputField model="editModal.phone" name="phone" lable="Phone" />
      <CheckBoxField model="editModal.hasPremium" lable="Premium" />
    </Form>
  </Provider>);


describe('Form component', () => {
  it('render form with two Field with proper values', () => {
    expect(toJson(instance)).toMatchSnapshot();
    expect(instance.find('input[name="phone"]').props().value).toBe('34534345');
    expect(instance.find('input[type="checkbox"]').props().checked).toBe(true);
  });

  it('changed field value changing store', () => {
    instance.find('input[name="phone"]').simulate('change', {target: {value: '+1111122222'}});
    instance.find('input[type="checkbox"]').simulate('change', {target: {checked: false}});
    expect(toJson(instance)).toMatchSnapshot();
    expect(store.getState().form.editModal.phone).toBe('+1111122222');
    expect(store.getState().form.editModal.hasPremium).toBe(false);
  });
});
