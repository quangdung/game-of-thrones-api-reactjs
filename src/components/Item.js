import { useSelector } from 'react-redux';

import ItemBook from './ItemBook';
import ItemCharacter from './ItemCharacter';
import ItemHouse from './ItemHouse';

import { getResouceType } from '../utils';

import { BOOK_TYPE, CHARACTER_TYPE, HOUSE_TYPE } from '../constants';

function Item() {
    const item = useSelector(state => state.selectElement.element);
    console.log('item:', item)

    if (item) {
        const resourceType = getResouceType(item.url);

        switch (resourceType) {
            case BOOK_TYPE: return <ItemBook item={item} />;
            case CHARACTER_TYPE: return <ItemCharacter item={item} />;
            case HOUSE_TYPE: return <ItemHouse item={item} />;
            default: return <></>
        }
    }
}

export default Item;
