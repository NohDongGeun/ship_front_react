import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const WholesaleUserUUIDContainer: React.FC = () => {
    const name = useAddWholesaleStore((state) => state.wholesale.uuid);
    const update = useAddWholesaleStore((state) => state.update);

    const onChangeUUID = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            update({ uuid: e.target.value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'유저 UUID'}
            onChange={onChangeUUID}
            value={name}
        />
    );
};

export default React.memo(WholesaleUserUUIDContainer);
