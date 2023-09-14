import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';

const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const QnaContentContainer: React.FC = () => {
    const editorRef = useRef<Editor | null>(null);
    const setter = useEditQnaStore((state) => state.update);
    const content = useEditQnaStore((state) => state.qna.content);

    const onHandleContents = useCallback(() => {
        if (!editorRef.current) return;

        const instance = editorRef.current.getInstance();
        const content = instance.getHTML();
        setter({ content: content });
    }, []);
    return (
        <EditorWithLabel onSaveContents={onHandleContents}>
            <NoSsrEditor editorRef={editorRef} contents={content} />
        </EditorWithLabel>
    );
};

export default React.memo(QnaContentContainer);
