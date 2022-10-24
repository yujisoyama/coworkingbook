import React from 'react'

export const AuthContext = React.createContext({});

export const AuthProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    return (
        <AuthContext.Provider value={{ authenticated: false }}>
            {props.children}
        </AuthContext.Provider>
    )
}
