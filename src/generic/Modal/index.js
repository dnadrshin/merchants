// @flow
import _ from 'lodash';
import React from 'react';
import {Portal} from 'react-portal';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import actions from './actions';
// TODO: Add actions and reducer
const
  Modal = (props: {
    children?: React$Element<*>,
    closeModal: ()=>{},
    header: string,
    save: ()=>{},
    show: boolean,
    uniqueId: string
  }) => props.show && <Portal>
    <div className="modal fade in" tabIndex="-1" role="dialog" style={{display: 'block'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{props.header}</h4>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={props.closeModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={props.save}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </Portal>;

export default compose(connect(
  (state, props) => ({
    show: _.get(state.modal[props.uniqueId], 'show', false),
  }),

  (dispatch, props) => ({
    closeModal: () => dispatch(actions.closeModal(props.uniqueId)),
  }),
))(Modal);
