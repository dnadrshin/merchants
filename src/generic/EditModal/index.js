// @flow
import _ from 'lodash';
import React, {Fragment} from 'react';
import {compose, withHandlers, defaultProps} from 'recompose';
import {connect} from 'react-redux';
import Modal from '../Modal';
import InputField from '../Form/InputField';
import CheckBoxField from '../Form/CheckBoxField';
import Form from '../Form';
import rest from '../../Merchants/rest';
import actions from '../Modal/actions';
import Loading from '../Loading';

const
  EditModal = (props: {
    addNew: boolean,
    isLoading: boolean,
    save: ()=>{},
    data: {},
    uniqueId: string
  }) => <Fragment>
    <Modal
      save={props.save}
      uniqueId={props.uniqueId}
      header={props.addNew ? 'Add new merchant' : `Edit Merchant #${_.get(props.data, 'id')}`}
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

    <Loading show={props.isLoading} />
  </Fragment>;

export default compose(
  connect(
    (state, props) => ({
      isLoading: state.rest.merchant.loading && _.get(state.modal[props.uniqueId], 'show', false),
      merchant : _.get(state.form, 'editModal', {}),
    }),

    ({
      put       : rest.actions.merchant.put,
      post      : rest.actions.merchant.post,
      closeModal: actions.closeModal,
    }),
  ),

  defaultProps({addNew: false}),

  withHandlers({
    save: props => () => {
      props.addNew
        ? props.post(
          null,
          {body: JSON.stringify(props.merchant)},

          () => {
            props.closeModal(props.uniqueId);
            props.resync();
          },
        )

        : props.put(
          {id: props.merchant.id},
          {body: JSON.stringify(props.merchant)},

          () => {
            props.closeModal(props.uniqueId);
            props.resync();
          },
        );
    },
  }),
)(EditModal);
