import React, { useCallback } from 'react';
import SmallAddedItem from '../../../components/commons/SmallAddedItem';

interface IUserProCategoryContainer {
    categoryName: string;
    categoryIndex: number;
    onDeleteCategory: (index: number) => void;
}

const UserProCategoryContainer: React.FC<IUserProCategoryContainer> = ({
    categoryName,
    categoryIndex,
    onDeleteCategory,
}) => {
    const onClickDelete = useCallback(() => {
        onDeleteCategory(categoryIndex);
    }, [categoryIndex, onDeleteCategory]);

    return <SmallAddedItem label={categoryName} onDelete={onClickDelete} />;
};

export default React.memo(UserProCategoryContainer);
