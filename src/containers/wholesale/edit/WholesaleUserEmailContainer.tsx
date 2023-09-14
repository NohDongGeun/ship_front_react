import React from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';

const WholesaleUserEmailContainer: React.FC = () => {
    const identyKey = useEditWholesaleStore(
        (state) => state.wholesale?.user.identyKey
    );

    return (
        <InputWithLabel
            label={'유저 이메일'}
            onChange={() => {}}
            value={identyKey ? identyKey : ''}
            readonly={true}
        />
    );
};

export default React.memo(WholesaleUserEmailContainer);
