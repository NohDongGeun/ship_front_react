import React, { useCallback } from 'react';
import SmallAddedItem from '../../../components/commons/SmallAddedItem';

interface IUserWholesaleCategoryContainer {
    categoryName: string;
    categoryIndex: number;
    onDeleteCategory: (index: number) => void;
}

const UserWholesaleCategoryContainer: React.FC<IUserWholesaleCategoryContainer> = ({
    categoryName,
    categoryIndex,
    onDeleteCategory,
}) => {
    const onClickDelete = useCallback(() => {
        onDeleteCategory(categoryIndex);
    }, [categoryIndex, onDeleteCategory]);

    return <SmallAddedItem label={categoryName} onDelete={onClickDelete} />;
};

export default React.memo(UserWholesaleCategoryContainer);
