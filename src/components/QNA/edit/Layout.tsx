import React from 'react';
import DeleteContainer from '../../../containers/qna/edit/DeleteContainer';
import QnaAuthorUUIDContainer from '../../../containers/qna/edit/QnaAuthorUUIDContainer';
import QnaContentContainer from '../../../containers/qna/edit/QnaContentContainer';
import QnaQnaStatusContainer from '../../../containers/qna/edit/QnaQnaStatusContainer';
import QnaServiceCategoryContainer from '../../../containers/qna/edit/QnaServiceCategoryContainer';
import QnaStatusContainer from '../../../containers/qna/edit/QnaStatusContainer';
import QnaTitleContainer from '../../../containers/qna/edit/QnaTitleContainer';
import SubmitContainer from '../../../containers/qna/edit/SubmitContainert';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import QnaCommentContainer from '../../../containers/qna/edit/QnaCommentContainer';

interface ILayout {
    qnaId: string;
}

const Layout: React.FC<ILayout> = ({ qnaId }) => {
    return (
        <AddView
            title={'QNA 수정'}
            submitContainer={<SubmitContainer qnaId={qnaId} />}
            deleteContainer={<DeleteContainer qnaId={qnaId} />}
        >
            <CollapseBox title={'QNA 정보'}>
                <QnaAuthorUUIDContainer />
                <QnaTitleContainer />
                <QnaContentContainer />
                <QnaServiceCategoryContainer />
                <QnaQnaStatusContainer />
                <QnaStatusContainer />
            </CollapseBox>
            <CollapseBox title={'QNA 답변'}>
<<<<<<< HEAD
                <QnaContentContainer />
=======
                <QnaCommentContainer />
>>>>>>> dev
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
