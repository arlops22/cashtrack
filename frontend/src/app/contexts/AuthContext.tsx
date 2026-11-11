import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { isAxiosError } from 'axios';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { setUnauthorizedHandler } from '../services/http-client';
import { localStorageKeys } from '../config/local-storage-keys';
import { usersService } from '../services/usersService';
import type { User } from '../entities/User';

import LaunchScreen from '../../view/components/LaunchScreen';

interface AuthContextProps {
    isSignedIn: boolean;
    user: User | undefined;
    isUserLoading: boolean;
    signIn(accessToken: string): void;
    signOut(): void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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

    const { data: user, isLoading } = useQuery({
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

    useEffect(
        () =>
            setUnauthorizedHandler(() => {
                toast.error('Session expired!', { id: 'session-expired' });
                signOut();
            }),
        [signOut],
    );

    const value = useMemo<AuthContextProps>(
        () => ({ isSignedIn: !!user, user, isUserLoading: isLoading, signIn, signOut }),
        [user, isLoading, signIn, signOut],
    );

    return (
        <AuthContext value={value}>
            <LaunchScreen isLoading={isLoading} />
            {!isLoading && children}
        </AuthContext>
    );
}
