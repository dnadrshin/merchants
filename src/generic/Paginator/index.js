// @flow
import _ from 'lodash'
import React from 'react';

export default (props: {
  limit: number,
  pagesCount: number,
  sync: ({
    limit: number,
    start: number,
  })=>{},
}) => <nav aria-label="Page navigation">
	<ul class="pagination">
    {false && <li>
        <a href="/" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
    </li>}

    {_.range(1, props.pagesCount+1).map(num => <li key={`pagination-page-${num}`}>
      <a href="/" onClick={() => props.sync({limit: props.limit, start: (num - 1)*props.limit + 1})}>{num}</a>
    </li>)}

    {false && <li>
        <a href="/" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
    </li>}
	</ul>
</nav>;
