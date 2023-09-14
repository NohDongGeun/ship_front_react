import React from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertUserEamilContainer: React.FC = () => {
    const identyKey = useEditExpertStore(
        (state) => state.expert?.user.identyKey
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

export default React.memo(ExpertUserEamilContainer);
