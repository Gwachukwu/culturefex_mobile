export interface IAuthData {
    email: string;
    password: string;
}

export interface AuthContextType {
    isLoading: boolean;
    isSignedOut: boolean;
    user: string | null;
    signIn: (data: IAuthData) => Promise<void>;
    signOut: () => void;
    signUp: (data: IAuthData) => Promise<void>;
}
