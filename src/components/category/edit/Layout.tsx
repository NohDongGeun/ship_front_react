import React from 'react';
import CategoryIconContainer from '../../../containers/category/edit/CategoryIconContainer';
import CategoryNameContainer from '../../../containers/category/edit/CategoryNameContainer';
import SubCategoriesContainer from '../../../containers/category/edit/SubCategoriesContainer';
import CategoryStatusContainer from '../../../containers/category/edit/CategoryStatusContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import SubmitContainer from '../../../containers/category/edit/SubmitContainer';
import DeleteContainer from '../../../containers/category/edit/DeleteContainer';

interface ILayout {
    categoryId: string;
}

const Layout: React.FC<ILayout> = ({ categoryId }) => {
    return (
        <AddView
            title={'카테고리 수정'}
            deleteContainer={<DeleteContainer categoryId={categoryId} />}
            submitContainer={<SubmitContainer categoryId={categoryId} />}
        >
            <CollapseBox title={'카테고리 정보'}>
                <CategoryNameContainer />
                <CategoryIconContainer />
                <CategoryStatusContainer />
            </CollapseBox>

            <CollapseBox title={'소 카테고리 정보'}>
                <SubCategoriesContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
