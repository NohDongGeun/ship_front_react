import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddMatchingStore } from '../../../store/matching/matchingAddStore';

const MatchingApplicantCotainer: React.FC = () => {
    const applicantUUID = useAddMatchingStore(
        (state) => state.matching.applicantUUID
    );
    const update = useAddMatchingStore((state) => state.update);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            update({ applicantUUID: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'신청자 UUID'}
            onChange={onChangeName}
            value={applicantUUID}
        />
    );
};

export default React.memo(MatchingApplicantCotainer);
