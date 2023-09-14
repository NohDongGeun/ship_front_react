import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';

const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const WholesaleContentContainer: React.FC = () => {
    const editorRef = useRef<Editor | null>(null);
    const content = useEditWholesaleStore((state) => state.wholesale?.content);
    const update = useEditWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleContentContainer);
