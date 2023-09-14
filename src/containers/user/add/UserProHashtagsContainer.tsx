import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import HashtagView from '../../../components/commons/Hashtag';
import { IHashtag } from '../../../models/Hashtag';
import UserProHashtagContainer from './UserProHashtagContainer';

const UserProHashtagsContainer: React.FC = () => {
    const [hashtags, setHashtags] = useState<List<IHashtag>>(List());
    const [newbieName, setNewbieName] = useState<string>('');

    const onChangeNewbiewName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setNewbieName(e.target.value);
        },
        []
    );

    const onAddHashtag = useCallback(() => {
        if (!newbieName) {
            return;
        }

        const newbieSubCategory = {
            id: 0,
            name: newbieName,
            isEditing: false,
        };

        setHashtags((prev) => prev.push(newbieSubCategory));
        setNewbieName('');
    }, [newbieName]);

    const onSaveHashtag = useCallback((index: number, name: string) => {
        if (!name) {
            return;
        }

        setHashtags((prev) => prev.setIn([index, 'name'], name));
    }, []);

    const onDeleteHashtag = useCallback((index: number) => {
        setHashtags((prev) => prev.delete(index));
    }, []);

    return (
        <HashtagView
            newbieName={newbieName}
            onChangeNewbieName={onChangeNewbiewName}
            onAddHashtag={onAddHashtag}
        >
            {hashtags.map((item: IHashtag, index: number) => (
                <UserProHashtagContainer
                    key={item.id}
                    hashtagName={item.name}
                    hashtagIndex={index}
                    onSaveHashtag={onSaveHashtag}
                    onDeleteHashtag={onDeleteHashtag}
                />
            ))}
        </HashtagView>
    );
};

export default React.memo(UserProHashtagsContainer);
