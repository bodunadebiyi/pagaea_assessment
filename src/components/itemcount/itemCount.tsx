import React, { FunctionComponent } from 'react';
import './itemCount.scss';

interface ItemCountProps {
    value: number;
    onClickPlus: () => void;
    onClickMinus: () => void;
}

const ItemCount: FunctionComponent<ItemCountProps> = React.memo(({
    value,
    onClickMinus,
    onClickPlus,
}) => {
    return (
        <div className="item-count">
            <span onClick={onClickMinus}>-</span>
            <span>{value}</span>
            <span onClick={onClickPlus}>+</span>
        </div>
    )
})

export default ItemCount;