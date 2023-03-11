import { Pagination } from 'react-bootstrap';

function PaginationData(props) {
    const { pagination, setItemUrl } = props;
    const { first, prev, next, last } = pagination;

    const lastPage = last ? parseInt(last.split('page=')[1].split('&')[0]) : 1;
    const onLastPage = first && prev && last ? lastPage : 1;
    const actualPage = next ? parseInt(next.split('page=')[1].split('&')[0]) - 1 : onLastPage;

    return (<Pagination>
        {first && <Pagination.First onClick={() => setItemUrl(first)} />}
        {prev && <Pagination.Prev onClick={() => setItemUrl(prev)} />}
        {[...Array(lastPage)].map((e, i) => i + 1).map((e, i) => {
            if (e === actualPage) {
                return <Pagination.Item active key={e}>{e}</Pagination.Item>
            } else {
                if (e === 1 || e === lastPage || (e >= actualPage - 1 && e <= actualPage + 1)) {
                    return <Pagination.Item key={e}
                        onClick={() => setItemUrl(`${pagination.first.split('page=')[0]}page=${e}`)}>{e}
                    </Pagination.Item>
                }
                else if (e === actualPage - 2 || e === actualPage + 2) {
                    return <Pagination.Ellipsis disabled key={e} />
                }
                else { return null }
            }
        })}
        {next && <Pagination.Next onClick={() => setItemUrl(next)} />}
        {last && <Pagination.Last onClick={() => setItemUrl(last)} />}
    </Pagination>
    );
}

export default PaginationData;