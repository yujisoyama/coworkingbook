import { createContext, useContext, useState } from 'react';
import { IPropsUserContext, IUserContext } from '../@types/UserContext';
import { api } from '../Api';

export const USER_DEFAULT = {
    user: {
        id: 0,
        fullname: '',
        email: '',
        company: '',
        role: '',
    },
    token: '',
    authenticated: false,
    setUser: () => { },
    setToken: () => { },
    setAuthenticated: () => { },
    login: () => { return Promise.resolve(200) },
    getProfile: () => { }
};

export const UserContext = createContext<IPropsUserContext>(USER_DEFAULT);

export const UserProvider = (props: any) => {
    const [user, setUser] = useState<IUserContext>(USER_DEFAULT.user);
    const [token, setToken] = useState<string>(localStorage.getItem("token") || '');
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const login = async (form: { [k: string]: FormDataEntryValue; }): Promise<number> => {
        let statusCode: number = 0;
        try {
            await api.post('/login', {
                email: form.email,
                password: form.password,
            }).then((res) => {
                statusCode = res.status;
                localStorage.setItem("token", res.data)
                setToken(res.data);
            }).catch((error) => {
                statusCode = error.response.status;
            })
            return statusCode;
        } catch (error) {
            console.log(error);
            return 500;
        }
    }

    const getProfile = async (token: string) => {
        try {
            await api.get('/profile', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                const { id, fullname, email, company, role } = res.data;
                setUser({
                    id,
                    fullname,
                    email,
                    company,
                    role
                })
                

            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider value={{ user, token, authenticated, setUser, setToken, setAuthenticated, login, getProfile }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);