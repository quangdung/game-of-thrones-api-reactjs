import { useDispatch, useSelector } from 'react-redux';

import { Pagination } from 'react-bootstrap';

import { actions } from '../slices';

function PaginationData() {
    const { first, prev, next, last, lastPage, actualPage }
        = useSelector(state => state.elements.pagination);
    const dispatch = useDispatch();

    const selectPage = (url) => {
        dispatch(actions.fetchElements(url.split('/')[4])); // Get endpoint from url
    }

    return (first && <Pagination>
        {<Pagination.First onClick={() => selectPage(first)} />}
        {prev && <Pagination.Prev onClick={() => selectPage(prev)} />}
        {[...Array(lastPage)].map((e, i) => i + 1).map((e, i) => {
            if (e === actualPage) {
                return <Pagination.Item active key={e}>{e}</Pagination.Item>
            } else {
                if (e === 1 || e === lastPage || (e >= actualPage - 1 && e <= actualPage + 1)) {
                    return <Pagination.Item key={e}
                        onClick={() => selectPage(`${first.split('page=')[0]}page=${e}`)}>{e}
                    </Pagination.Item>
                }
                else if (e === actualPage - 2 || e === actualPage + 2) {
                    return <Pagination.Ellipsis disabled key={e} />
                }
                else { return null }
            }
        })}
        {next && <Pagination.Next onClick={() => selectPage(next)} />}
        {<Pagination.Last onClick={() => selectPage(last)} />}
    </Pagination>
    );
}

export default PaginationData;