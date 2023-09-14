import dynamic from 'next/dynamic';
import React, { useCallback, useRef } from 'react';
import EditorWithLabel from '../../../components/commons/EditorWithLabel';
import { Editor } from '@toast-ui/react-editor';
import { useEditMarketStore } from '../../../store/market/marketEditStore';
const NoSsrEditor = dynamic(
    () => import('../../../components/commons/TuiEditor'),
    {
        ssr: false,
    }
);

const MarketContentContainer: React.FC = () => {
    const editorRef = useRef<Editor | null>(null);
    const contents = useEditMarketStore((state) => state.market.contents);
    const setter = useEditMarketStore((state) => state.updateMarket);

    const onHandleContents = useCallback(() => {
        if (!editorRef.current) return;
        const instance = editorRef.current.getInstance();
        const content = instance.getHTML();
        setter({ contents: content });
    }, []);

    return (
        <EditorWithLabel onSaveContents={onHandleContents}>
            <NoSsrEditor editorRef={editorRef} contents={contents} />
        </EditorWithLabel>
    );
};

export default React.memo(MarketContentContainer);
