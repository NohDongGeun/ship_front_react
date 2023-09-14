import React from 'react';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import CommunityCategoryNameContainer from '../../../containers/communityCategory/edit/CommunityCategoryNameContainer';
import CommunityCategoryActivateContainer from '../../../containers/communityCategory/edit/CommunityCategoryActivateContainer';
import DeleteContainer from '../../../containers/communityCategory/edit/DeleteContainer';
import SubmitContainer from '../../../containers/communityCategory/edit/SubmitContainer';

interface ILayout {
    categoryId: string;
}

const Layout: React.FC<ILayout> = ({ categoryId }) => {
    return (
        <AddView
            title={'유저 등록'}
            submitContainer={<SubmitContainer categoryId={categoryId} />}
            deleteContainer={<DeleteContainer categoryId={categoryId} />}
        >
            <CollapseBox title={'기본 정보'}>
                <CommunityCategoryNameContainer />
                <CommunityCategoryActivateContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
