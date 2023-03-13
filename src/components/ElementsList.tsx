import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { getResouceType } from '../utils';
import { actions } from '../slices';
import { DataSelector } from '../store';
import { ElementSimple } from '../global/interfaces';

const ElementsList = () => {
    const dispatch = useDispatch();

    const elements = useSelector(DataSelector.elements);
    const elementSelected = useSelector(DataSelector.selectedElement);

    const onElementClick = (elementUrl: string) => {
        const elementSimple: ElementSimple = { url: elementUrl, name: '', alias: '' };
        dispatch(actions.selectElement(elementSimple));
        switch (getResouceType(elementUrl)) {
            case 'book':
                dispatch(actions.fetchBook({ url: elementUrl }) as any);
                break;
            case 'character':
                dispatch(actions.fetchCharacter({ url: elementUrl }) as any);
                break;
            case 'house':
                dispatch(actions.fetchHouse({ url: elementUrl }) as any);
                break;
            default:
                break;
        };
    }

    return (elements && (
        <ListGroup>
            {elements.map(item => (
                <ListGroup.Item
                    key={item.url}
                    action
                    {...(elementSelected && elementSelected.url === item.url && { active: true })}
                    onClick={() => onElementClick(item.url)}
                >{item.url.split('/')[5]} - {item.name ? item.name : `${item.alias} (alias)`}
                </ListGroup.Item>
            ))}
        </ListGroup>
    ))
}

export default ElementsList;