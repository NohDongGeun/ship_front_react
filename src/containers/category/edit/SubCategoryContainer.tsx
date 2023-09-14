import Immutable from 'immutable';
import React, { useCallback, useState } from 'react';
import SubCategoryItem from '../../../components/category/add/SubCategoryItem';
import { SubCategory, SubCategoryType } from '../../../models/SubCategory';

interface ISubCategoryContainer {
    subCategoryName: string | '';
    subCategoryIndex: number;
    onSaveSubCategoryName: (index: number, name: string) => void;
    onDeleteSubCategory: (index: number) => void;
}

const SubCategoryContainer: React.FC<ISubCategoryContainer> = ({
    subCategoryName,
    subCategoryIndex,
    onSaveSubCategoryName,
    onDeleteSubCategory,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newbieName, setNewbieName] = useState<string>(subCategoryName);

    const onChangeNewbieName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewbieName(e.target.value);
        },
        []
    );

    const onClickEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const onClickCancel = useCallback(() => {
        setIsEditing(false);
        setNewbieName(subCategoryName);
    }, [subCategoryName]);

    const onClickDelete = useCallback(() => {
        onDeleteSubCategory(subCategoryIndex);
    }, [subCategoryIndex, onDeleteSubCategory]);

    const onClickSave = useCallback(() => {
        onSaveSubCategoryName(subCategoryIndex, newbieName);
        setIsEditing(false);
    }, [newbieName, subCategoryIndex, onSaveSubCategoryName]);

    return (
        <SubCategoryItem
            isEditing={isEditing}
            oldbieName={subCategoryName}
            newbieName={newbieName}
            onClickEdit={onClickEdit}
            onClickCancel={onClickCancel}
            onChangeNewbieName={onChangeNewbieName}
            onClickSave={onClickSave}
            onClickDelete={onClickDelete}
        />
    );
};

export default React.memo(SubCategoryContainer);
