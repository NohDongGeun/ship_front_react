import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddMatchingStore } from '../../../store/matching/matchingAddStore';

const MatchingExpertCotainer: React.FC = () => {
    const expertUUID = useAddMatchingStore(
        (state) => state.matching.expertUUID
    );
    const update = useAddMatchingStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ expertUUID: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'전문가 UUID'}
            onChange={onChangeName}
            value={expertUUID}
        />
    );
};

export default React.memo(MatchingExpertCotainer);
