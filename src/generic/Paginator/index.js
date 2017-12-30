// @flow
import _ from 'lodash'
import React from 'react';
const
  getActivePage = pagination => (pagination.start - 1) / pagination.limit + 1;

export default (props: {
  pagination: {},
  limit: number,
  pagesCount: number,
  module: string,
  setPagination: (string, number, number)=>{},
}) => <nav aria-label="Page navigation">
	<ul className="pagination">
    {false && <li>
        <a href="/" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
    </li>}

    {_.range(1, props.pagesCount+1).map(num => <li
      className={num === getActivePage(props.pagination) ? 'active' : ''} 
      key={`pagination-page-${num}`}
      >
        <a
          href=""
          onClick={
            e => {
              e.preventDefault();
              props.setPagination(props.module, props.limit, (num - 1)*props.limit + 1);
          }}>{num}</a>
    </li>)}

    {false && <li>
        <a href="/" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
    </li>}
	</ul>
</nav>;
