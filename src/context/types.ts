import { User } from 'firebase/auth'

export interface IAuthData {
    email: string;
    password: string;
}

export interface AuthContextType {
    isLoading: boolean;
    user: User | null;
    signIn: (data: IAuthData) => Promise<void>;
    signOut: () => void;
    signUp: (data: IAuthData) => Promise<void>;
}
