// @flow
import _ from 'lodash'
import React from 'react';

export default (props: {
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

    {_.range(1, props.pagesCount+1).map(num => <li key={`pagination-page-${num}`}>
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
