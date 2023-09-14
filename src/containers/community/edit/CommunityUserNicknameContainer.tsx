import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';

const CommunityUserNicknameContainer: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');

    const onChangeNickname = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNickname(e.target.value);
        },
        []
    );

    return (
        <InputWithLabel
            label={'닉네임'}
            value={nickname}
            onChange={onChangeNickname}
        />
    );
};

export default React.memo(CommunityUserNicknameContainer);
