import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { ElementSimple } from '../global/interfaces';
import { actions } from '../slices';
import { DataSelector } from '../store';
import { getResouceType } from '../utils';

interface SearchResultProps {
    setCloseResult: (close: boolean) => void;
};

const SearchResult = (props: SearchResultProps) => {
    const { setCloseResult } = props;

    const dispatch = useDispatch();

    const results = useSelector(DataSelector.search);

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
        setCloseResult(true);
    }

    return (<> {results && results.length > 0 && (
        <ListGroup>
            {results.map(item => (
                <ListGroup.Item
                    key={item.url}
                    action
                    onClick={() => onElementClick(item.url)}
                >({getResouceType(item.url).toUpperCase()}) {item.name ? item.name : `${item.alias} (alias)`}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )}
    </>)
}

export default SearchResult;