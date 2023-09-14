import React from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditMatchingStore } from '../../../store/matching/matchingEditStore';

const MatchingExpertCotainer: React.FC = () => {
    const expertUUID = useEditMatchingStore(
        (state) => state.matching?.expert.id
    );

    return (
        <InputWithLabel
            readonly={true}
            label={'전문가 UUID'}
            value={expertUUID ? expertUUID : ''}
        />
    );
};

export default React.memo(MatchingExpertCotainer);
