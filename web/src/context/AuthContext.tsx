import { createContext, useState } from 'react'
import { api } from "../Api";

export const AuthContext = createContext({});

export const AuthProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

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
            setAuthenticated(true);
            return statusCode;
        } catch (error) {
            console.log(error);
            return 500;
        }
    }

    return (
        <AuthContext.Provider value={{ authenticated, login }}>
            {props.children}
        </AuthContext.Provider>
    )
}
