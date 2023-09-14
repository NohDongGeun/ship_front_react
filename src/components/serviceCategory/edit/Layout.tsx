import React from 'react';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import ServiceCategoryNameContainer from '../../../containers/serviceCategory/edit/ServiceCategoryNameContainer';
import ServiceCategoryActivateContainer from '../../../containers/serviceCategory/edit/ServiceCategoryActivateContainer';
import ServiceCategoryTypeContainer from '../../../containers/serviceCategory/edit/ServiceCategoryTypeContainer';
import DeleteContainer from '../../../containers/serviceCategory/edit/DeleteContainer';
import SubmitContainer from '../../../containers/serviceCategory/edit/SubmitContainer';

interface ILayout {
    categoryId: string;
}

const Layout: React.FC<ILayout> = ({ categoryId }) => {
    return (
        <AddView
            title={'서비스 카테고리 수정'}
            submitContainer={<SubmitContainer categoryId={categoryId} />}
            deleteContainer={<DeleteContainer categoryId={categoryId} />}
        >
            <CollapseBox title={'기본 정보'}>
                <ServiceCategoryNameContainer />
                <ServiceCategoryTypeContainer />
                <ServiceCategoryActivateContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
