import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IUseAuth {
    init: () => void;
}

export const useAuth = ({ init }: IUseAuth) => {
    const session = useSession();
    const [isAuthentication, setIsAuthentication] = useState(false);

    useEffect(() => {
        init();
    }, []);

    return {
        isAuthentication,
    };
};
