import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { Editor } from '@toast-ui/react-editor';
import { useAddMarketStore } from '../../../store/market/marketAddStore';
const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const MarketContentContainer: React.FC = () => {
    const editorRef = useRef<Editor | null>(null);
    const setter = useAddMarketStore((state) => state.set);

    const onHandleContents = useCallback(() => {
        if (!editorRef.current) return;

        const instance = editorRef.current.getInstance();
        const content = instance.getHTML();
        setter({ contents: content });
    }, []);
    return (
        <EditorWithLabel onSaveContents={onHandleContents}>
            <NoSsrEditor editorRef={editorRef} />
        </EditorWithLabel>
    );
};

export default React.memo(MarketContentContainer);
