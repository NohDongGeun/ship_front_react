import React, { useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';

interface ITuiEditor {
    editorRef: React.MutableRefObject<Editor | null>;
    contents?: string;
}

const TuiEditor: React.FC<ITuiEditor> = ({ editorRef, contents }) => {
    useEffect(() => {
        // if (contents && editorRef.current) {
        //     const editorInstance = editorRef.current.getInstance();
        //     // editorInstance.setHTML(contents);
        //     editorInstance.blur();
        // }
    }, []);

    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['image'],
        ['code'],
        ['table', 'link'],
        ['scrollSync'],
    ];

    return (
        <Editor
            ref={editorRef}
            initialValue={contents} // 글 수정 시 사용
            initialEditType="wysiwyg" // wysiwyg & markdown
            previewStyle={'tab'} // tab, vertical
            hideModeSwitch={false}
            height="460px"
            toolbarItems={toolbarItems}
            useCommandShortcut={false}
            usageStatistics={false}
            plugins={[colorSyntax]}
            // hooks={{
            //     addImageBlobHook: handleAddImageBlobHook,
            // }}
        />
    );
};

export default TuiEditor;
