type IUserContext = {
    userId: number;
    userFullname: string;
    userEmail: string;
    userCompany: string;
    userRole: string;
    // login(form: { [k: string]: FormDataEntryValue; }): Promise<number>;
};

type IPropsUserContext = {
    user: IUserContext;
    setUser: React.Dispatch<React.SetStateAction<IUserContext>>;
    login(form: { [k: string]: FormDataEntryValue; }): Promise<number>;
};

export const USER_DEFAULT = {
    user: {
        userId: 0,
        userFullname: '',
        userEmail: '',
        userCompany: '',
        userRole: '',
    },
    setUser: () => { },
    login(form: { [k: string]: FormDataEntryValue; }): Promise<number>;
};