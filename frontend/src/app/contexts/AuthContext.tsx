import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { isAxiosError } from 'axios';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { localStorageKeys } from '../config/local-storage-keys';
import { usersService } from '../services/usersService';
import type { User } from '../../entities/User';

interface AuthContextValue {
    isSignedIn: boolean;
    user: User | undefined;
    signIn(accessToken: string): void;
    signOut(): void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const meQueryOptions = queryOptions({
    queryKey: ['me'],
    queryFn: () => usersService.me(),
    staleTime: Infinity,
});

const isUnauthorized = (error: unknown) => isAxiosError(error) && error.response?.status === 401;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();

    const [hasToken, setHasToken] = useState(() => {
        const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

        return !!storedAccessToken;
    });

    const {
        data: user,
        isLoading,
        error,
    } = useQuery({
        ...meQueryOptions,
        enabled: hasToken,
        retry: (failureCount, err) => !isUnauthorized(err) && failureCount < 2,
    });

    const signIn = useCallback((accessToken: string) => {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
        setHasToken(true);
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        queryClient.clear();
        setHasToken(false);
    }, []);

    useEffect(() => {
        if (isUnauthorized(error)) {
            toast.error('Session expired!');
            signOut();
        }
    }, [error, signOut]);

    const value = useMemo<AuthContextValue>(
        () => ({ isSignedIn: !!user, user, signIn, signOut }),
        [user, signIn, signOut],
    );

    if (isLoading) return <div>Loading...</div>;

    return <AuthContext value={value}>{!isLoading && children}</AuthContext>;
}
