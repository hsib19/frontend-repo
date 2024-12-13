'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

interface User {
    uid: string;
    email: string;
}

interface AuthContextState {
    user: User | null;
    loading: boolean;
    loginLoading: boolean; // New loading state for login button
    errorLoginMessage: string;
    token: string;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const useAuth = (): AuthContextState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [errorLoginMessage, setErrorLoginMessage] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState<boolean>(true); // Global loading state
    const [loginLoading, setLoginLoading] = useState<boolean>(false); // Loading state for login button
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // Ensure Firebase only runs on client

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {

                firebaseUser.getIdToken()
                    .then((idToken) => {
                        setToken(idToken);
                        localStorage.setItem("token", idToken);
                    })
                    .catch(() => {
                        setToken("")
                    });

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email!,
                });
            } else {
                setUser(null);
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const login = async (email: string, password: string) => {
        setLoginLoading(true); // Set loading to true when login starts
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            setToken(token);
            localStorage.setItem("token", token);
            setErrorLoginMessage("")
            router.push('/dashboard'); // Redirect to home page after successful login
        } catch (error) {
            console.error('Error signing in', error);
            setErrorLoginMessage("Email or password incorect!")
        } finally {
            setLoginLoading(false); // Set loading to false when login process is finished
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, loading, loginLoading, errorLoginMessage, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
