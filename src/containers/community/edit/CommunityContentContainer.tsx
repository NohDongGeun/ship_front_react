import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { useEditCommunityStore } from '../../../store/community/communityEditStore';

const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const CommunityContentContainer: React.FC = () => {
    const editorRef = useRef<Editor | null>(null);
    const content = useEditCommunityStore((state) => state.community?.content);
    const setter = useEditCommunityStore((state) => state.update);

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

export default React.memo(CommunityContentContainer);
