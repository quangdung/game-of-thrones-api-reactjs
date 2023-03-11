import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

function Element(props) {
    const { elements, setDataSelected } = props;

    const [elementSelected, setElementSelected] = useState(null);

    const onElementClick = (elementUrl) => {
        setElementSelected(elementUrl);

        fetch(elementUrl)
            .then(response => response.json())
            .then(data => setDataSelected(data));
    }      

    return (elements && (
        <ListGroup>
            {elements.map(item => (
                <ListGroup.Item
                    key={item.url}
                    action
                    {...(elementSelected === item.url && { active: true })}
                    onClick={() => onElementClick(item.url)}
                >{item.url.split('/')[5]} - {item.name ? item.name : `${item.aliases} (alias)`}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
    )
}

export default Element;