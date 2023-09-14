import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { useAddCommunityStore } from '../../../store/community/communitiesAddStore';

const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const CommunityContentContainer: React.FC = () => {
    const editorRef = useRef<Editor | null>(null);
    const setter = useAddCommunityStore((state) => state.update);

    const onHandleContents = useCallback(() => {
        if (!editorRef.current) return;

        const instance = editorRef.current.getInstance();
        const content = instance.getHTML();
        setter({ content: content });
    }, []);
    return (
        <EditorWithLabel onSaveContents={onHandleContents}>
            <NoSsrEditor editorRef={editorRef} />
        </EditorWithLabel>
    );
};

export default React.memo(CommunityContentContainer);
