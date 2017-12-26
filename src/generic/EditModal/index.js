import _ from 'lodash';
import React from 'react';
import Modal from '../Modal';
import InputField from '../Form/InputField';
import CheckBoxField from '../Form/CheckBoxField';
import Form from '../Form';

const
  EditModal = props => <Modal
    closeModal={props.closeModal}
    header={`Edit Merchant #${_.get(props.data, 'id')}`}
    show={props.show}
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

export default EditModal;
