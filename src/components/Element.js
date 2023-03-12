import { useDispatch, useSelector } from 'react-redux';

import { ListGroup } from 'react-bootstrap';

import { selectElement } from '../redux/store';

function Element(props) {
    const { elements, setDataSelected } = props;

    const dispatch = useDispatch();
    const elementSelected = useSelector(state => state.selectedElement);

    const onElementClick = (elementUrl) => fetch(elementUrl)
        .then(response => response.json())
        .then(data => {
            dispatch(selectElement(data));
            if (setDataSelected) {
                setDataSelected(data);
            }
        });

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
    )
    )
}

export default Element