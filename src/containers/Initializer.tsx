import React from 'react';
import { useGlobalState } from '../store/global/globalState';

const Initializer: React.FC = () => {
    const isInitializing = useGlobalState((state) => state.isInitializing);

    if (isInitializing) {
        return <></>;
    }

    return <></>;
};

export default Initializer;
