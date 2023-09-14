import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';

const ExpertLongitudeContainer: React.FC = () => {
    const longitude = useAddExpertStore((state) => state.expert.longitude);
    const update = useAddExpertStore((state) => state.update);

    const onChangeLongitude = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ longitude: +value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'주소'}
            onChange={onChangeLongitude}
            value={longitude ? `${longitude}` : '0'}
        />
    );
};

export default React.memo(ExpertLongitudeContainer);
