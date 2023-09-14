import React from 'react';
import ServiceCategoryActivateContainer from '../../../containers/serviceCategory/add/ServiceCategoryActivateContainer';
import ServiceCategoryNameContainer from '../../../containers/serviceCategory/add/ServiceCategoryNameContainer';
import ServiceCategoryTypeContainer from '../../../containers/serviceCategory/add/ServiceCategoryTypeContainer';
import SubmitContainer from '../../../containers/serviceCategory/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView
            title={'서비스 카테고리 등록'}
            submitContainer={<SubmitContainer />}
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
