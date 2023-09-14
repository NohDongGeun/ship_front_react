import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import AddedWrapper from '../../../components/commons/AddedWrapper';
import ButtonSelectLabel from '../../../components/commons/ButtonSelectWithLabel';
import UserProCategoryContainer from './UserProCategoryContainer';

export const CATEGORY_TEST_ITEMS = [
    '돼지',
    '닭',
    '소',
    '과일',
    '야채',
    '해산물',
    '분식',
    '기타',
];

const UserProCategoriesContainer: React.FC = () => {
    const [categories, setCategories] = useState<List<string>>(List());

    const onClickSave = useCallback(
        (value: string) => {
            if (categories.includes(value)) {
                return;
            }

            setCategories((prev) => prev.push(value));
        },
        [categories]
    );

    const onClickDelete = useCallback((index: number) => {
        setCategories((prev) => prev.delete(index));
    }, []);

    return (
        <>
            <ButtonSelectLabel
                label={'카테고리 선택'}
                onClickSave={onClickSave}
                selectItem={List(CATEGORY_TEST_ITEMS)}
            />
            {categories.size > 0 && (
                <AddedWrapper>
                    {categories.map((item, index) => (
                        <UserProCategoryContainer
                            key={index}
                            categoryName={item}
                            categoryIndex={index}
                            onDeleteCategory={onClickDelete}
                        />
                    ))}
                </AddedWrapper>
            )}
        </>
    );
};

export default React.memo(UserProCategoriesContainer);
