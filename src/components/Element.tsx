import React from 'react';
import { useSelector } from 'react-redux';

import ElementBook from './ElementBook';
import ElementCharacter from './ElementCharacter';
import ElementHouse from './ElementHouse';

import { DataSelector } from '../store';
import { getResouceType } from '../utils';

import { BOOK_TYPE, CHARACTER_TYPE, HOUSE_TYPE } from '../constants';

const Element = () => {
    const item = useSelector(DataSelector.selectedElement);

    if (item) {
        const resourceType = getResouceType(item.url);

        switch (resourceType) {
            case BOOK_TYPE: return <ElementBook />;
            case CHARACTER_TYPE: return <ElementCharacter />;
            case HOUSE_TYPE: return <ElementHouse />;
            default: return <></>
        }
    }
    return <></>
}

export default Element;
