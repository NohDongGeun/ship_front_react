import React from 'react';
import DeleteContainer from '../../../containers/matching/edit/DeleteContainer';
import MatchingActivateContainer from '../../../containers/matching/edit/MatchingActivateContainer';
import MatchingApplicantContainer from '../../../containers/matching/edit/MatchingApplicantContainer';
import MatchingExpertContainer from '../../../containers/matching/edit/MatchingExpertContainer';
import MatchingStatusContainer from '../../../containers/matching/edit/MatchingStatusContainer';
import SubmitContainer from '../../../containers/matching/edit/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

interface ILayout {
    matchingId: string;
}

const Layout: React.FC<ILayout> = ({ matchingId }) => {
    return (
        <AddView
            title={'매칭 수정'}
            submitContainer={<SubmitContainer matchingId={matchingId} />}
            deleteContainer={<DeleteContainer matchingId={matchingId} />}
        >
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
