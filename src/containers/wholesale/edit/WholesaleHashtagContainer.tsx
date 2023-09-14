import React, { useCallback, useState } from 'react';
import HashtagItem from '../../../components/commons/Hashtag/HashtagItem';

interface IWholesaleHashtagContainer {
    hashtagName: string | '';
    hashtagIndex: number;
    onSaveHashtag: (index: number, name: string) => void;
    onDeleteHashtag: (index: number) => void;
}

const WholesaleHashtagContainer: React.FC<IWholesaleHashtagContainer> = ({
    hashtagName,
    hashtagIndex,
    onSaveHashtag,
    onDeleteHashtag,
}) => {
    const [newbieName, setNewbieName] = useState<string>(hashtagName);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onChangeNewbieName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewbieName(e.target.value);
        },
        []
    );

    const onClickEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const onClickCancel = useCallback(() => {
        setIsEditing(false);
        setNewbieName(hashtagName);
    }, [hashtagName]);

    const onClickDelete = useCallback(() => {
        onDeleteHashtag(hashtagIndex);
    }, [hashtagIndex, onDeleteHashtag]);

    const onClickSave = useCallback(() => {
        if (!newbieName) {
            return;
        }

        onSaveHashtag(hashtagIndex, newbieName);
        setIsEditing(false);
    }, [newbieName, hashtagIndex, onSaveHashtag]);

    return (
        <HashtagItem
            isEditing={isEditing}
            newbieName={newbieName}
            oldbieName={hashtagName}
            onChangeNewbieName={onChangeNewbieName}
            onClickEdit={onClickEdit}
            onClickCancel={onClickCancel}
            onClickSave={onClickSave}
            onClickDelete={onClickDelete}
        />
    );
};

export default React.memo(WholesaleHashtagContainer);
