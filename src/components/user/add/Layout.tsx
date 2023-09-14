import React from 'react';
import SubmitContainer from '../../../containers/user/add/SubmitContainer';
import UserEmailContainer from '../../../containers/user/add/UserEmailContainer';
import UserNameContainer from '../../../containers/user/add/UserNameContainer';
import UserNicknameContainer from '../../../containers/user/add/UserNicknameContainer';
import UserPasswordContainer from '../../../containers/user/add/UserPasswordContainer';
import UserPasswordVerifyContainer from '../../../containers/user/add/UserPasswordVerifyContainer';
import UserPhoneContainer from '../../../containers/user/add/UserPhoneContainer';
import UserStatusContainer from '../../../containers/user/add/UserStatusContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView title={'유저 등록'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'기본 정보'}>
                <UserNameContainer />
                <UserNicknameContainer />
                <UserEmailContainer />
                <UserPasswordContainer />
                <UserPasswordVerifyContainer />
                <UserPhoneContainer />
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
