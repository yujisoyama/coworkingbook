export interface IUserContext {
    id: number;
    fullname: string;
    email: string;
    company: string;
    role: string;
};

export interface IPropsUserContext {
    user: IUserContext;
    token: string;
    authenticated: boolean | undefined;
    sessionExpired: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUserContext>>;
    setToken: React.Dispatch<React.SetStateAction<UserType>>;
    setAuthenticated: React.Dispatch<React.SetStateAction<UserType>>;
    setSessionExpired: React.Dispatch<React.SetStateAction<UserType>>;
    login(form: { [k: string]: FormDataEntryValue; }): Promise<number>;
    getProfile(token: string);
};

