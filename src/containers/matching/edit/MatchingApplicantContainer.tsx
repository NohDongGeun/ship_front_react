import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddMatchingStore } from '../../../store/matching/matchingAddStore';
import { useEditMatchingStore } from '../../../store/matching/matchingEditStore';

const MatchingApplicantCotainer: React.FC = () => {
    const applicantUUID = useEditMatchingStore(
        (state) => state.matching?.application.id
    );

    return (
        <InputWithLabel
            readonly={true}
            label={'신청자 UUID'}
            value={applicantUUID ? applicantUUID : ''}
        />
    );
};

export default React.memo(MatchingApplicantCotainer);
