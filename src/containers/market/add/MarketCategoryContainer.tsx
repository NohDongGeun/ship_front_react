import React, { useCallback } from 'react';
import SmallAddedItem from '../../../components/commons/SmallAddedItem';

interface IMarketCategoryContainer {
    categoryName: string;
    categoryIndex: number;
    onDeleteCategory: (index: number) => void;
}

const MarketCategoryContainer: React.FC<IMarketCategoryContainer> = ({
    categoryName,
    categoryIndex,
    onDeleteCategory,
}) => {
    const onClickDelete = useCallback(() => {
        onDeleteCategory(categoryIndex);
    }, [categoryIndex, onDeleteCategory]);

    return <SmallAddedItem label={categoryName} onDelete={onClickDelete} />;
};

export default React.memo(MarketCategoryContainer);
