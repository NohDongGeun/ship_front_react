import React from 'react';
import UserPasswordContainer from '../../../containers/user/edit/UserPasswordContainer';
import SubmitContainer from '../../../containers/user/edit/SubmitContainer';
import UserEmailContainer from '../../../containers/user/edit/UserEmailContainer';
import UserNameContainer from '../../../containers/user/edit/UserNameContainer';
import UserPhoneContainer from '../../../containers/user/edit/UserPhoneContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import UserPasswordVerifyContainer from '../../../containers/user/edit/UserPasswordVerifyContainer';
import UserStatusContainer from '../../../containers/user/edit/UserStatusContainer';
import DeleteContainer from '../../../containers/user/edit/DeleteContainer';

interface ILayout {
    userId: string;
}

const Layout: React.FC<ILayout> = ({ userId }) => {
    return (
        <AddView
            title={'유저 등록'}
            submitContainer={<SubmitContainer userId={userId} />}
            deleteContainer={<DeleteContainer userId={userId} />}
        >
            <CollapseBox title={'기본 정보'}>
                <UserNameContainer />
                <UserEmailContainer />
                <UserPhoneContainer />
                <UserPasswordContainer />
                <UserPasswordVerifyContainer />
                <UserStatusContainer />
            </CollapseBox>
            {/* <CollapseBox title={'전문가 정보'}>
                <UserCareerContainer />
                <UserProfileContainer />
                <UserProMarketContainer />
                <UserProCategoriesContainer />
                <UserProHashtagsContainer />
                <UserProStatusContainer />
            </CollapseBox>

            <CollapseBox title={'전문가 소개'}>
                <UserProContentContainer />
            </CollapseBox>

            <CollapseBox title={'도소매 정보'}>
                <UserWholesaleCareerContainer />
                <UserWholesaleProfileContainer />
                <UserWholesaleMarketContainer />
                <UserWholesaleCategoriesContainer />
                <UserWholesaleHashtagsContainer />
                <UserWholesalePaymentContainer />
                <UserWholesaleStatusContainer />
            </CollapseBox>

            <CollapseBox title={'도소매 소개'}>
                <UserWholesaleContentContainer />
            </CollapseBox> */}
        </AddView>
    );
};

export default Layout;
