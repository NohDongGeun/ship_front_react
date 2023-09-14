import React from 'react';
import AdminActivateContainer from '../../../containers/admin/edit/AdminActivateContainer';
import AdminEmailContainer from '../../../containers/admin/edit/AdminEmailContainer';
import AdminNameContainer from '../../../containers/admin/edit/AdminNameContainer';
import AdminNicknameContainer from '../../../containers/admin/edit/AdminNicknameContainer';
import AdminPasswordContainer from '../../../containers/admin/edit/AdminPasswordContainer';
import AdminPasswordVerifyContainer from '../../../containers/admin/edit/AdminPasswordVerifyContainer';
import AdminPhoneContainer from '../../../containers/admin/edit/AdminPhoneContainer';
import DeleteContainer from '../../../containers/admin/edit/DeleteContainer';
import SubmitContainer from '../../../containers/admin/edit/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

interface ILayout {
    adminId: string;
}

const Layout: React.FC<ILayout> = ({ adminId }) => {
    return (
        <AddView
            title={'어드민 수정'}
            submitContainer={<SubmitContainer adminId={adminId} />}
            deleteContainer={<DeleteContainer adminId={adminId} />}
        >
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
