import { createContext, useState } from 'react';
import { IPropsUserContext, IUserContext } from '../@types/UserContext';
import { api } from '../Api';

export const USER_DEFAULT = {
    user: {
        userId: 0,
        userFullname: '',
        userEmail: '',
        userCompany: '',
        userRole: '',
    },
    setUser: () => { },
    login: (form: { [k: string]: FormDataEntryValue; }): Promise<number> => { return Promise.resolve(200) },
};

export const UserContext = createContext<IPropsUserContext>(USER_DEFAULT);

export const UserProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const [user, setUser] = useState<IUserContext>(USER_DEFAULT.user);

    const login = async (form: { [k: string]: FormDataEntryValue; }): Promise<number> => {
        let statusCode: number = 0;
        try {
            await api.post('/login', {
                email: form.email,
                password: form.password,
            }).then((res) => {
                statusCode = res.status;
            }).catch((error) => {
                statusCode = error.response.status;
            })
            return statusCode;
        } catch (error) {
            console.log(error);
            return 500;
        }
    }
    return (
        <UserContext.Provider value={{ user, setUser, login }}>
            {props.children}
        </UserContext.Provider>
    )
}