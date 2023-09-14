import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertLongitudeContainer: React.FC = () => {
    const longitude = useEditExpertStore((state) => state.expert?.longitude);
    const update = useEditExpertStore((state) => state.update);

    const onChangeLongitude = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ longitude: value });
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
