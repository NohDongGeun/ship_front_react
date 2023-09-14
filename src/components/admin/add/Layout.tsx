import React from 'react';
import AdminActivateContainer from '../../../containers/admin/add/AdminActivateContainer';
import AdminEmailContainer from '../../../containers/admin/add/AdminEmailContainer';
import AdminNameContainer from '../../../containers/admin/add/AdminNameContainer';
import AdminNicknameContainer from '../../../containers/admin/add/AdminNicknameContainer';
import AdminPasswordContainer from '../../../containers/admin/add/AdminPasswordContainer';
import AdminPasswordVerifyContainer from '../../../containers/admin/add/AdminPasswordVerifyContainer';
import AdminPhoneContainer from '../../../containers/admin/add/AdminPhoneContainer';
import SubmitContainer from '../../../containers/admin/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView title={'어드민 등록'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'기본 정보'}>
                <AdminNameContainer />
                <AdminNicknameContainer />
                <AdminEmailContainer />
                <AdminPhoneContainer />
                <AdminPasswordContainer />
                <AdminPasswordVerifyContainer />
                <AdminActivateContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
