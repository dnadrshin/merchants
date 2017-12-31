// @flow
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {compose, withHandlers, lifecycle} from 'recompose';
import actions from './actions';
import styles from './assets/component.css';

const
  extendColumns = (columns, actionsColumns) => actionsColumns
    ? columns.concat(actionsColumns)
    : columns,

  Table = (props: {
    actionsColumns: [],
    children: React$Element<*>,
    columns: [],
    columnSettings: {},
    data: [],
    module: string,
    sorting: ()=>{},
    toggleSorting: ()=>{},
    rowGenerator: ()=>{}
  }) => <x-table class={classNames(styles.mainTable, styles.className)}>
    <table className="table table-striped">
      <tbody>
        <tr>
          {extendColumns(props.columns, props.actionsColumns).map((column, i) =>
            <th
              key={`${props.module}-header-${column.name}`}
              onClick={column.isSorted ? () => props.sorting(props.module, column.name) : () => {}}
            >
              {column.title}

              {column.isSorted && !_.get(props.columnSettings, 'sorting.order')
                ? <i className="material-icons">swap_vert</i>
                : ''
              }

              {column.isSorted && _.get(props.columnSettings, 'sorting.column') === column.name
                ? _.get(props.columnSettings, 'sorting.order') === 'asc' 
                  ? <i className="material-icons">arrow_downward</i>
                  : <i className="material-icons">arrow_upward</i>
                : ''}
            </th>)}
        </tr>

        {props.data
          ? props.data.map(row => React.cloneElement(props.children, {
            data   : row,
            columns: extendColumns(props.columns, props.actionsColumns),
            key    : row.id,
          }))

          : <tr><td>no data</td></tr>
        }
      </tbody>
    </table>
  </x-table>;

export default compose(
  connect(
    (state, props) => ({
      columnSettings: state.table[props.module],
    }),

    ({
      toggleSorting: actions.toggleSorting,
    }),
  ),

  withHandlers({
    sorting: props => (module, column, sortBy) => props.toggleSorting(module, column, sortBy),
  }),

  lifecycle({
    componentWillReceiveProps(nextProps) {
      if(!_.isEqual(this.props.columnSettings, nextProps.columnSettings)) {
        this.props.sync({
          ...nextProps.columnSettings.pagination,
          ...nextProps.columnSettings.sorting,
        });
      }
    },
  }),
)(Table);
