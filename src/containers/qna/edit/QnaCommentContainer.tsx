import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';
import { ICreateComment } from '../../../types/comment';
import { useSession } from 'next-auth/react';
import { getMeUUID } from '../../../utils/jwt';

const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const QnaCommentContainer: React.FC = () => {
    const session = useSession();
    const editorRef = useRef<Editor | null>(null);
    const setter = useEditQnaStore((state) => state.update);
    const comments = useEditQnaStore((state) => state.qna.comments);
    const content = comments && comments.length > 0 ? comments[0].content : ' ';
    console.log('comments', comments);
    const onHandleContents = useCallback(() => {
        if (!editorRef.current) return;

        const instance = editorRef.current.getInstance();
        const content = instance.getHTML();

        const meUUID = getMeUUID(session.data?.user.accessToken);

        if (!meUUID) {
            return;
        }

        const newComment: ICreateComment = {
            content: content,
            userUUID: meUUID,
            activate: true,
        };

        if (comments && comments[0].id) {
            newComment.id = comments[0].id;
        }
        setter({ comments: [newComment] });
    }, [comments, session]);
    return (
        <EditorWithLabel onSaveContents={onHandleContents}>
            <NoSsrEditor editorRef={editorRef} contents={content} />
        </EditorWithLabel>
    );
};

export default React.memo(QnaCommentContainer);
