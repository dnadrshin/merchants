// @flow
import React from 'react';
import {Portal} from 'react-portal';

export default (props: {
  closeModal: ()=>{},
  show: boolean,
}) => props.show && <Portal>
    <div className="modal fade in" tabindex="-1" role="dialog" style={{display: 'block'}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                  <p>One fine body&hellip;</p>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={props.closeModal}>Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
        </div>
    </div>
  </Portal>
