import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';

const MatchingRequesterPhoneContainer: React.FC = () => {
    const [phone, setPhone] = useState<string>('');

    const onChangePhone = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(e.target.value);
        },
        []
    );

    return (
        <InputWithLabel
            label={'핸드폰 번호'}
            value={phone}
            onChange={onChangePhone}
        />
    );
};

export default React.memo(MatchingRequesterPhoneContainer);
