import React from 'react';
import CategoryIconContainer from '../../../containers/category/add/CategoryIconContainer';
import CategoryNameContainer from '../../../containers/category/add/CategoryNameContainer';
import CategoryStatusContainer from '../../../containers/category/add/CategoryStatusContainer';
import SubCategoriesContainer from '../../../containers/category/add/SubCategoriesContainer';
import SubmitContainer from '../../../containers/category/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView title={'카테고리 추가'} submitContainer={<SubmitContainer />}>
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
