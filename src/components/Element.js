import { useDispatch, useSelector } from 'react-redux';

import { ListGroup } from 'react-bootstrap';

import { actions } from '../slices';

function Element() {
    const dispatch = useDispatch();

    const elements = useSelector(state => state.elements.data);
    const elementSelected = useSelector(state => state.selectElement.element);

    const onElementClick = (elementUrl) => fetch(elementUrl)
        .then(response => response.json())
        .then(data => dispatch(actions.selectElement(data)));

    return (elements && (
        <ListGroup>
            {elements.map(item => (
                <ListGroup.Item
                    key={item.url}
                    action
                    {...(elementSelected && elementSelected.url === item.url && { active: true })}
                    onClick={() => onElementClick(item.url)}
                >{item.url.split('/')[5]} - {item.name ? item.name : `${item.aliases} (alias)`}
                </ListGroup.Item>
            ))}
        </ListGroup>
    ))
}

export default Element;