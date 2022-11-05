export interface IAuth {
    authenticated: boolean;
    setAuthenticated: () => {};
    login: () => {};
}