import React from 'react';
import MatchingActivateContainer from '../../../containers/matching/add/MatchingActivateContainer';
import MatchingApplicantContainer from '../../../containers/matching/add/MatchingApplicantContainer';
import MatchingExpertContainer from '../../../containers/matching/add/MatchingExpertContainer';
import MatchingStatusContainer from '../../../containers/matching/add/MatchingStatusContainer';
import SubmitContainer from '../../../containers/matching/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView title={'매칭 추가'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'기본 정보'}>
                <MatchingExpertContainer />
                <MatchingApplicantContainer />
                <MatchingStatusContainer />
                <MatchingActivateContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
