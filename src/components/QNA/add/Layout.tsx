import React from 'react';
import QnaContentContainer from '../../../containers/qna/add/QnaContentContainer';
import QnaStatusContainer from '../../../containers/qna/add/QnaStatusContainer';
import QnaTitleContainer from '../../../containers/qna/add/QnaTitleContainer';
import SubmitContainer from '../../../containers/qna/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import QnaQnaStatusContainer from '../../../containers/qna/add/QnaQnaStatusContainer';
import QnaAuthorUUIDContainer from '../../../containers/qna/add/QnaAuthorUUIDContainer';
import QnaServiceCategoryContainer from '../../../containers/qna/add/QnaServiceCategoryContainer';

const Layout: React.FC = () => {
    return (
        <AddView title={'QNA 추가'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'QNA 정보'}>
                <QnaAuthorUUIDContainer />
                <QnaTitleContainer />
                <QnaContentContainer />
                <QnaServiceCategoryContainer />
                <QnaQnaStatusContainer />
                <QnaStatusContainer />
            </CollapseBox>
<<<<<<< HEAD
            <CollapseBox title={'QNA 답변'}>
                <></>
            </CollapseBox>
=======
            {/* <CollapseBox title={'QNA 답변'}>
                <></>
            </CollapseBox> */}
>>>>>>> dev
        </AddView>
    );
};

export default Layout;
