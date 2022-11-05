export interface IUserContext {
    userId: number;
    userFullname: string;
    userEmail: string;
    userCompany: string;
    userRole: string;
    // login(form: { [k: string]: FormDataEntryValue; }): Promise<number>;
};

export interface IPropsUserContext {
    user: IUserContext;
    setUser: React.Dispatch<React.SetStateAction<IUserContext>>;
    login(form: { [k: string]: FormDataEntryValue; }): Promise<number>;
};

