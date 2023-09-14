import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const ExpertContentContainer: React.FC = () => {
    const editorRef = useRef<Editor | null>(null);
    const content = useEditExpertStore((state) => state.expert?.content);
    const update = useEditExpertStore((state) => state.update);

    const onHandleContents = useCallback(() => {
        if (!editorRef.current) return;

        const instance = editorRef.current.getInstance();
        const content = instance.getHTML();

        update({ content: content });
    }, []);

    return (
        <EditorWithLabel onSaveContents={onHandleContents}>
            <NoSsrEditor editorRef={editorRef} contents={content} />
        </EditorWithLabel>
    );
};

export default React.memo(ExpertContentContainer);
