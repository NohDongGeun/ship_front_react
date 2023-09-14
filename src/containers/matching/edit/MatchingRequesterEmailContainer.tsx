import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';

const MatchingRequesterEmailContainer: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
        },
        []
    );

    return (
        <InputWithLabel
            label={'이메일'}
            value={email}
            onChange={onChangeEmail}
        />
    );
};

export default React.memo(MatchingRequesterEmailContainer);
