import React from 'react';
import BannerImageContainer from '../../../containers/banner/edit/BannerImageContainer';
import BannerLinkContainer from '../../../containers/banner/edit/BannerLinkContainer';
import BannerStatusContainer from '../../../containers/banner/edit/BannerStatusContainer';
import DeleteContainer from '../../../containers/banner/edit/DeleteContainer';
import SubmitContainer from '../../../containers/banner/edit/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

interface ILayout {
    bannerId: string;
}

const Layout: React.FC<ILayout> = ({ bannerId }) => {
    return (
        <AddView
            title={'배너 수정'}
            submitContainer={<SubmitContainer bannerId={bannerId} />}
            deleteContainer={<DeleteContainer bannerId={bannerId} />}
        >
            <CollapseBox title={'배너 정보'}>
                <BannerLinkContainer />
                <BannerImageContainer />
                <BannerStatusContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
