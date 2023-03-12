import { useDispatch, useSelector } from 'react-redux';

import { ListGroup } from 'react-bootstrap';

import { actions } from '../slices';

const resourceType = (item) => {
    return `(${item.url.split('/')[4].slice(0, -1).toUpperCase()})`;
}

function SearchResult(props) {
    const { setCloseResult } = props;

    const dispatch = useDispatch();

    const results = useSelector(state => state.search.results);
    console.log('results:', results);

    const onElementClick = (elementUrl) => {
        fetch(elementUrl)
            .then(response => response.json())
            .then(data => {
                dispatch(actions.selectElement(data));
            });
        setCloseResult(true);
    };

    return (results && results.length > 0 && (
        <ListGroup>
            {results.map(item => (
                <ListGroup.Item
                    key={item.url}
                    action
                    onClick={() => onElementClick(item.url)}
                >{resourceType(item)} {item.name ? item.name : `${item.aliases} (alias)`}
                </ListGroup.Item>
            ))}
        </ListGroup>
    ))
}

export default SearchResult;