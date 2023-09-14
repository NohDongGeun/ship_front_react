import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertLatitudeContainer: React.FC = () => {
    const latitude = useEditExpertStore((state) => state.expert?.latitude);
    const update = useEditExpertStore((state) => state.update);

    const onChangeLatitude = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ latitude: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'주소'}
            onChange={onChangeLatitude}
            value={latitude ? `${latitude}` : '0'}
        />
    );
};

export default React.memo(ExpertLatitudeContainer);
