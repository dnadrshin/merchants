import _ from 'lodash';
import React from 'react';
import Modal from '../Modal';
import InputField from '../Form/InputField';
import CheckBoxField from '../Form/CheckBoxField';
import Form from '../Form';
import {compose, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import rest from '../../Merchants/rest';

const
  EditModal = (props: {
    save: ()=>{},
    data: {},
  }) => <Modal
    save={props.save}
    header={`Edit Merchant #${_.get(props.data, 'id')}`}
  >
    <Form model="editModal" data={props.data}>
      <InputField model="editModal.firstname" name="firstName" lable="First Name" />
      <InputField model="editModal.lastname" name="lastName" lable="Last Name" />
      <InputField model="editModal.avatarUrl" name="avatarUrl" lable="Avatar Url" />
      <InputField model="editModal.email" name="email" lable="Email" />
      <InputField model="editModal.phone" name="phone" lable="Phone" />
      <CheckBoxField model="editModal.hasPremium" lable="Premium" />
    </Form>
  </Modal>

export default compose(
  connect(
    state => ({
      merchant: _.get(state.form, 'editModal', {})
    }),

    ({
      put: rest.actions.merchant.put
    })
  ),

  withHandlers({
    save: props => () => {props.put({ id: props.merchant.id}, {body: JSON.stringify(props.merchant)}); props.closeModal()}
  }),
)(EditModal);
